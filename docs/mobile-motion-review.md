# Mobile motion follow-up — 2 October 2026

The previous phone reveals started only 24px above the bottom of the viewport and finished in 440ms. They could finish before the visitor looked at the content. Reused service-card nodes were not observed again after changing category.

## Changes

- Trigger reveals 18% of the viewport height inside the screen, bounded to 90–150px; do not require tall blocks to fit completely.
- Fade and move individual reading blocks over 720ms with a 24px movement. Use only opacity and transform, without blur, scroll event handlers or continuous rendering loops.
- Register added content and updated service cards through a MutationObserver. Disconnect both observers when the route changes.
- Restore effects when the visitor turns reduced motion off; remove effects immediately when it is enabled. A connection data-saving flag no longer suppresses these lightweight local CSS effects.
- Extend touch/small-screen route fades to 520ms. Desktop layout and motion settings are unchanged.
- Keep content visible by default, including when IntersectionObserver is unavailable. The existing dedicated mobile layout, safe-area spacing, svh/dvh sizing, touch targets and tap feedback remain in place.

## Verification

Production build and ESLint passed. Playwright used WebKit and installed Chrome; these are browser emulation checks, not a physical iPhone assessment.

| Viewport | Full-page visual review (six routes) | WebKit touch interactions | Visible fade frames (WebKit + Chrome) |
| --- | --- | --- | --- |
| 390×844 | Passed | Passed | Passed |
| 393×852 | Passed | Passed | Passed |
| 430×932 | Passed | Passed | Passed |
| 375×667 | Passed | Passed | Passed |

- Visually inspected all 24 complete-page captures: home, about, services, contact, privacy policy and accessibility. No overflow, overlap, unintended clipping or excessive empty gaps were found. Document width matched viewport width, with no out-of-bounds main/header/footer elements or hidden reveal content.
- Sampled visible service-card opacity and transform during the reveal, then after completion: opacity changed from 0.08–0.14 to 1 and movement returned to none. Screenshots of those frames were also inspected.
- Verified service-category updates animate, live reduced-motion toggles work both ways, and initial reduced-motion browsing has no active animations.
- Verified touch navigation, smooth scrolling to the contact anchor with header clearance, route scroll reset, page fade, seven notary cards and 44px navigation/category controls at all four sizes.
- Checked Hebrew RTL, French and Dutch across the five primary/privacy routes at 375×667 with no horizontal overflow.
- Compared desktop element geometry, typography and colors against the preceding commit at 1024px and 1440px across all six routes; unchanged.

Local captures and review strips: `/private/tmp/moria-mobile-motion-v2/`. Animation frame captures: `/private/tmp/moria-motion-visible/`.

The live production URL and the visitor's phone/browser have not been supplied, so production deployment and the reported physical-phone behavior remain unverified.
