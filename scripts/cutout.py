"""Cut the studio background out of a portrait and emit a web-ready transparent asset.

    python scripts/cutout.py <source.jpg> <out-dir> [--name portrait]

Primary path is rembg's u2net_human_seg matte; if rembg is missing we fall back to a
border flood-fill matte, which works because the studio backdrop is a flat sweep that
touches every edge (the white shirt survives — it is enclosed by the dark blazer, so it
is never reachable from the border).

Either way the matte gets the same finishing pass: despill the white fringe that a soft
backdrop bleeds into hair, firm up the edge, drop specks, then trim to the subject.
"""

import argparse
import sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage


# ----------------------------------------------------------------- matte generation

def matte_rembg(rgb: np.ndarray) -> tuple[np.ndarray, str] | None:
    """Alpha from rembg's human-segmentation model, or None if rembg isn't installed.

    Alpha matting sharpens hair detail but routes through pymatting, whose preconditioner
    wants ~2 GB on a 1.2 MP image and raises MemoryError when the machine is busy. That
    failure is not worth losing the whole run over — the raw model matte is still good,
    just firmer at the edges — so it degrades to the plain path and says which one ran.
    Returned alpha decides the trim box, so the two paths do differ in output size.
    """
    try:
        from rembg import new_session, remove
    except ImportError:
        return None

    img = Image.fromarray((rgb * 255).astype(np.uint8))
    session = new_session("u2net_human_seg")

    def alpha_of(out: Image.Image) -> np.ndarray:
        return np.asarray(out.convert("RGBA"), dtype=np.float64)[..., 3] / 255.0

    try:
        return alpha_of(
            remove(
                img,
                session=session,
                alpha_matting=True,
                alpha_matting_foreground_threshold=250,
                alpha_matting_background_threshold=15,
                alpha_matting_erode_size=8,
            )
        ), "rembg u2net_human_seg + alpha matting"
    except (MemoryError, np.core._exceptions._ArrayMemoryError):  # type: ignore[attr-defined]
        return alpha_of(remove(img, session=session)), (
            "rembg u2net_human_seg, NO alpha matting (matting ran out of memory)"
        )


def matte_floodfill(rgb: np.ndarray, bg: np.ndarray) -> np.ndarray:
    """Alpha from a border-connected flat-backdrop fill, with a soft band at the edge."""
    dist = np.abs(rgb - bg).max(axis=2)

    # Everything that looks like backdrop AND is reachable from the frame edge.
    flat = dist < 0.07
    labels, _ = ndimage.label(flat)
    border = np.unique(
        np.concatenate([labels[0], labels[-1], labels[:, 0], labels[:, -1]])
    )
    hard_bg = np.isin(labels, border[border != 0])

    # Ramp alpha across a band straddling the silhouette so hair stays wispy instead of
    # being sliced off at the threshold.
    band = ndimage.binary_dilation(hard_bg, iterations=7) & ~ndimage.binary_erosion(
        hard_bg, iterations=7
    )
    soft = np.clip((dist - 0.07) / (0.26 - 0.07), 0.0, 1.0)

    alpha = np.where(hard_bg, 0.0, 1.0)
    alpha[band] = soft[band]
    return alpha


# ----------------------------------------------------------------- backdrop estimation

def seed_backdrop(rgb: np.ndarray) -> np.ndarray:
    """A single backdrop colour, for the flood-fill matte that runs before any alpha exists.

    Sampled from the top edge and the upper sides only. The bottom edge is where the
    shoulders run off frame, so including it would blend the blazer into the estimate and
    land on a mid-grey that matches neither.
    """
    h, w = rgb.shape[:2]
    k = max(6, min(h, w) // 40)
    samples = np.concatenate(
        [rgb[:k].reshape(-1, 3),
         rgb[: h // 2, :k].reshape(-1, 3),
         rgb[: h // 2, -k:].reshape(-1, 3)]
    )
    return np.median(samples, axis=0)


def backdrop_field(rgb: np.ndarray, alpha: np.ndarray, seed: np.ndarray) -> np.ndarray:
    """Per-pixel backdrop colour, read from the pixels the matte calls fully transparent.

    A studio sweep is never one flat colour — it falls off towards the corners. Giving each
    edge pixel its own local backdrop makes the despill correct across that gradient.
    """
    known = alpha < 0.02
    if not known.any():
        return np.broadcast_to(seed, rgb.shape).copy()

    idx = ndimage.distance_transform_edt(
        ~known, return_distances=False, return_indices=True
    )
    field = rgb[tuple(idx)]
    for c in range(3):  # smooth so backdrop grain doesn't skew individual edge pixels
        field[..., c] = ndimage.uniform_filter(field[..., c], size=9)
    return field


# ----------------------------------------------------------------- matte finishing

def finish(rgb: np.ndarray, alpha: np.ndarray, bg: np.ndarray) -> np.ndarray:
    """Clean the matte and unpremultiply the backdrop out of the edge pixels."""
    # Firm up the edge: a smoothstep pushes the mushy middle of the ramp towards 0 or 1
    # so the silhouette reads crisp, while true semi-transparent hair keeps its gradient.
    a = np.clip((alpha - 0.06) / 0.88, 0.0, 1.0)
    a = a * a * (3.0 - 2.0 * a)

    # Drop specks of stray backdrop and plug pinholes inside the subject.
    solid = a > 0.5
    labels, n = ndimage.label(solid)
    if n > 1:
        sizes = ndimage.sum(solid, labels, range(1, n + 1))
        keep = int(np.argmax(sizes)) + 1
        a[(labels != 0) & (labels != keep)] = 0.0
        solid = labels == keep
    a[ndimage.binary_fill_holes(solid) & ~solid] = 1.0

    # Drop faint wisps floating clear of the subject. These survive the pass above (they
    # never reach alpha 0.5) and would otherwise set the trim box, padding the asset with
    # empty space and printing stray dots above the hair.
    loose, m = ndimage.label(a > 0.05)
    if m > 1:
        attached = np.unique(loose[solid])
        a[(loose != 0) & ~np.isin(loose, attached[attached != 0])] = 0.0

    # Despill: a soft backdrop bleeds into every partially covered pixel, which is what
    # makes a naive cutout look haloed. Solve the compositing equation the other way
    # (obs = a*fg + (1-a)*bg) to recover the true foreground colour.
    #
    # Only where the pixel is at least half covered. The solve divides by alpha, so it
    # amplifies per-channel backdrop noise by 1/a; against a near-white sweep that clips
    # into vivid orange and green casts. Capping at a >= 0.5 keeps the gain under 2x.
    # Fainter pixels keep their observed colour, which already reads correctly once
    # composited onto a light page.
    a3 = a[..., None]
    fg = rgb.copy()
    solve = (a >= 0.5) & (a < 0.996)
    fg[solve] = np.clip((rgb - (1.0 - a3) * bg) / np.maximum(a3, 0.5), 0.0, 1.0)[solve]

    # Extend subject colour a few pixels past the silhouette so the browser's bilinear
    # scaling samples skin and hair at the edge rather than whatever sits outside it.
    # Sourced from fully opaque pixels only — their colour is measured, not reconstructed,
    # so no despill artefact can smear outward from here.
    #
    # Bounded to a narrow band because scaling never reaches further, and because a
    # whole-canvas nearest-neighbour fill leaves a high-frequency Voronoi pattern in the
    # invisible region that costs real bytes. Past the band the void goes flat.
    opaque = a >= 0.9
    if opaque.any():
        dist, idx = ndimage.distance_transform_edt(~opaque, return_indices=True)
        void = a <= 0.02
        fg = np.where((void & (dist <= 6.0))[..., None], fg[tuple(idx)], fg)
        fg = np.where((void & (dist > 6.0))[..., None], np.median(fg[opaque], axis=0), fg)

    return np.dstack([fg, a])


def trim(rgba: np.ndarray, pad: int = 2) -> np.ndarray:
    """Crop away transparent margins so CSS sizing maps to the subject, not empty space."""
    rows = np.where(rgba[..., 3].max(axis=1) > 0.02)[0]
    cols = np.where(rgba[..., 3].max(axis=0) > 0.02)[0]
    if not len(rows) or not len(cols):
        return rgba
    y0, y1 = max(rows[0] - pad, 0), min(rows[-1] + pad + 1, rgba.shape[0])
    x0, x1 = max(cols[0] - pad, 0), min(cols[-1] + pad + 1, rgba.shape[1])
    return rgba[y0:y1, x0:x1]


# ----------------------------------------------------------------- entry point

def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("source", type=Path)
    ap.add_argument("outdir", type=Path)
    ap.add_argument("--name", default="portrait")
    ap.add_argument("--preview", type=Path, help="write a light/dark composite contact sheet")
    ap.add_argument("--png", action="store_true", help="also write a lossless PNG master")
    args = ap.parse_args()

    src = Image.open(args.source).convert("RGB")
    rgb = np.asarray(src, dtype=np.float64) / 255.0

    seed = seed_backdrop(rgb)

    matte = matte_rembg(rgb)
    if matte is None:
        alpha, engine = matte_floodfill(rgb, seed), "border flood-fill (rembg unavailable)"
    else:
        alpha, engine = matte

    rgba = trim(finish(rgb, alpha, backdrop_field(rgb, alpha, seed)))
    out = Image.fromarray((np.clip(rgba, 0.0, 1.0) * 255).round().astype(np.uint8), "RGBA")

    print(f"engine     : {engine}")
    print(f"backdrop   : rgb({', '.join(f'{c * 255:.0f}' for c in seed)})")
    print(f"source     : {src.width}x{src.height}")
    print(f"cutout     : {out.width}x{out.height}")

    args.outdir.mkdir(parents=True, exist_ok=True)
    webp = args.outdir / f"{args.name}.webp"
    out.save(webp, quality=92, method=6)
    print(f"webp       : {webp}  ({webp.stat().st_size / 1024:.0f} KB)")

    # Opt-in, because the site only ships the WebP and public/ is copied verbatim into
    # dist — a lossless master left in there is ~950 KB of dead weight in the build.
    if args.png:
        png = args.outdir / f"{args.name}.png"
        out.save(png, optimize=True)
        print(f"png        : {png}  ({png.stat().st_size / 1024:.0f} KB)")

    if args.preview:
        # The matte is only judgeable composited: light shows the silhouette and any
        # leftover backdrop fringe, dark exposes halo that a light page would hide.
        strips = []
        for shade in ((250, 250, 248), (17, 17, 17)):
            plate = Image.new("RGB", out.size, shade)
            plate.paste(out, (0, 0), out)
            strips.append(plate)
        sheet = Image.new("RGB", (out.width * 2, out.height))
        for i, strip in enumerate(strips):
            sheet.paste(strip, (i * out.width, 0))
        sheet.save(args.preview, quality=94)
        print(f"preview    : {args.preview}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
