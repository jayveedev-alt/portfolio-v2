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

## Captured screenshots

One banner per project, shot from the live site with headless Chromium at
1600 x 1000 (16:10), JPG q86. Wired in via `"image"` in projects.json.

  securepeek.jpg               a live scan of its own host - score 97, grade A+
  aurawash.jpg                 hero over the admin dashboard
  kwentatayo.jpg               hero over the dashboard mockup
  aqualitpools.jpg             hero - pool at dusk
  supremacy-international.jpg  storefront hero
  quicklist.jpg                hero - "Organize Your Life"
  portfolio-website.jpg        this site's own hero

### Still without an image

  robodyx     no liveUrl; it is a mobile app, so it needs exported device
              screenshots rather than a page capture. Falls back to the
              abstract placeholder until then.

### Re-shooting

Scripted with playwright-core driving the Chromium in
~/Library/Caches/ms-playwright. Shoot the page as it actually is - hiding the
sections under a short hero leaves a dead band that reads as a broken image.
A viewport of 1280 x 800 suits heroes shorter than 16:10, because the next
section then fills the remainder naturally instead of a blank gap.

Sites needing care:

  aqualitpools  never reaches networkidle - use domcontentloaded, and dismiss
                the promo modal before shooting
  supremacy     a fixed chat bubble sits over the page; hide fixed elements
                under ~120px before capturing

Note: quicklist's old host, quicklist.bensketch.pro, is dead (expired
domain). The live entry now points at the Vercel deployment.
