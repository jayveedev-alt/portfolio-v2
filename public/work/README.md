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

Shot from the live sites with headless Chromium at 1600 x 1000, JPG q86.
Each project's banner (wired as `"image"`) is listed first, then the shots
that appear in the detail page gallery (`"gallery"` in projects.json).

  securepeek.jpg                            live scan of its own host - score 97, grade A+
  securepeek-checks.jpg                     header and transport checks table
  securepeek-landing.jpg                    the one-input landing page

  aurawash.jpg                              hero over the admin dashboard
  aurawash-workflow.jpg                     dispatch, fleet and status-sync modules
  aurawash-pricing.jpg                      per-branch plan tiers

  kwentatayo.jpg                            hero over the dashboard mockup
  kwentatayo-mobile.jpg                     the offline-first mobile app
  kwentatayo-how.jpg                        three-step onboarding

  aqualitpools.jpg                          hero - pool at dusk
  aqualitpools-services.jpg                 four service lines under one team
  aqualitpools-layers.jpg                   the three layers of a smart pool

  supremacy-international.jpg               storefront hero
  supremacy-international-bestsellers.jpg   best sellers, straight to cart
  supremacy-international-categories.jpg    curated category families

  quicklist.jpg                             hero - "Organize Your Life"
  quicklist-features.jpg                    tracking, calendar sync, email alerts
  quicklist-how.jpg                         note to reminder in three steps

  portfolio-website.jpg                     this site's own hero
  portfolio-website-work.jpg                the project grid
  portfolio-website-services.jpg            services and the stack behind them

### Still without images

  robodyx          no liveUrl; it is a mobile app, so it needs exported
                   device screenshots rather than a page capture

It falls back to the abstract placeholder until that is resolved.

### Re-shooting

The captures were scripted with playwright-core driving the Chromium in
~/Library/Caches/ms-playwright. Sites needing care:

  aqualitpools     never reaches networkidle - use domcontentloaded, and
                   dismiss the promo modal before shooting
  supremacy        shot at a 1280 viewport with the lower sections set to
                   visibility:hidden, so the hero is not crowded by the next
                   one; a fixed chat bubble also needs hiding
  kwentatayo       same treatment - the hero alone is shorter than 16:10

Note: quicklist's old host, quicklist.bensketch.pro, is dead (expired
domain). The live entry now points at the Vercel deployment.
