# Project banner images

Drop banner images here, then point at them from `src/data/projects.json`:

    "image": "/work/kwentatayo.jpg"

The path is served from the site root, so `public/work/foo.jpg` → `/work/foo.jpg`.

## Canva template

  Size      1600 × 1000 px  (16:10)
  Export    JPG, quality ~85  (or PNG if the design has flat colour + text)
  Weight    aim under 300 KB per image

### Safe area

The card thumbnail crops to roughly 16:9, taking a slice off the top and
bottom. The detail page shows the full 16:10.

  ┌──────────────────────────────────────┐
  │  ← 50 px trimmed on the card ──────  │
  ├──────────────────────────────────────┤
  │                                      │
  │        keep anything important       │  ← 900 px tall safe area
  │            inside this band          │
  │                                      │
  ├──────────────────────────────────────┤
  │  ← 50 px trimmed on the card ──────  │
  └──────────────────────────────────────┘

Also leave ~80 px clear on the left and right: the card is narrower than the
detail page, so the sides are the first thing to go on small screens.

### Notes

- No text smaller than ~28 px in the 1600 px design — the card renders it at
  roughly a quarter size.
- The page background is #F9F9F9, the accent is #3376FF. A dark banner reads as
  a product screenshot; a light one blends into the page.
- Until an `"image"` is set, the card falls back to a built mockup (SecurePeek,
  AuraWash) or an abstract placeholder.
