# Mobile layout and Nisim-style effects — 2 October 2026

The mobile motion now follows the Nisim reference at `/Users/idanhadad/Desktop/websites/nisim-website`: transitions for reading blocks, a slow ambient hero glow, animated heading accents and touch feedback. Desktop layout remains unchanged.

## Changes

- Replace temporary animation classes with pending/visible reveal states. Establish initial styles before observing the first screen, then fade and lift content 14px over 550ms, staggering simultaneous entries by 70ms (maximum 140ms).
- Trigger 32px inside the viewport, following Nisim’s phone spacing. Include previously scrolled content in the observer area so fast swipes cannot leave skipped cards hidden. Tall content does not have to fit entirely in the viewport.
- Use opacity and transform; avoid blur, scroll handlers and continuous JavaScript rendering. Pause the seven-second hero glow when the hero leaves the screen.
- Animate short gold heading accents and retain tap feedback. Remove the whole-page phone fade so it does not compete with individual entrances.
- Keep compact mobile navigation, a single-column reading order, touch targets, safe-area spacing, svh/dvh sizing and reduced-motion support. Tighten large spacers and size/crop the home portrait specifically for phones.
- Observe added/updated service cards; disconnect observers and pending animation frames on cleanup. Content stays visible when reduced motion is enabled or IntersectionObserver is unavailable.
- Simplify the cookie notice in all four languages to a question with Accept all, Reject optional and Learn more. Detailed explanations remain in the linked privacy-policy section. Consent behavior is unchanged.

## Verification

- Production build and ESLint passed; the existing bundle-size advisory remains.
- WebKit full-page captures of home, about, services, contact, privacy policy and accessibility were visually inspected at 390×844, 393×852, 430×932 and 375×667 (24 complete-page captures). No horizontal overflow, overlapping content, unintended clipping, hidden reveal targets or excessive empty gaps were found.
- WebKit and installed Chrome verified reveal start/completion at the four sizes, service-category changes and live reduced-motion toggles. Intermediate transition frames were sampled in both engines at every size.
- Reduced-motion loading has no active animations. Desktop geometry, typography and colors match the preceding build at 1024px and 1440px across all six routes.
- Dutch home-page fast-scroll captures at all four sizes also have no hidden reveal targets.
- Cookie acceptance, rejection, withdrawal and the details anchor checked in WebKit at the four sizes in English, Hebrew, French and Dutch. Optional analytics remains off before consent and after rejection.

Full-page captures/review strips: `/private/tmp/moria-nisim-mobile/`. Motion captures: `/private/tmp/moria-nisim-effects/`. Cookie captures: `/private/tmp/moria-nisim-cookies/`.

These checks use browser emulation, not a physical iPhone. Production deployment is not covered by the local checks.
