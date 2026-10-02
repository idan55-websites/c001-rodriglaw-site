# Accessibility review — 2 October 2026

Public routes: Home, About, Services, Contact, Privacy Policy and Accessibility. All four supported languages (English, Hebrew, French, Dutch) were included. This is a technical review, not an accessibility certification or an exemption determination.

## Changes

- Added a translated accessibility statement and footer link.
- Added a keyboard-visible skip link, a named navigation landmark, translated page titles and focusable main content. Route changes move focus to main content; the cookie-details link moves focus to the cookies section.
- Cookie notice now contains only reject, accept and a details link. Its region receives focus when opened; Escape dismisses it without changing consent. Closing it restores the opener's focus; following details preserves the new destination's focus.
- Service category buttons expose selected state with native button semantics and aria-pressed (not ARIA tabs requiring a separate arrow-key model).
- Added clear focus outlines and forced-colors support, localized portrait/cover/desk alternatives, and marked the English press excerpt with lang="en".
- Gave the photo caption a dark backing on desktop as well as mobile, and map attribution an opaque background, to keep text legible independent of the image/tile.

## Checks and evidence

Automated axe-core 4.13.0 checks for WCAG A/AA (2.0 and 2.1) and best practices found zero violations across 48 combinations: six routes × four languages × mobile 375×667 / desktop 1440×900. Results are in accessibility-audit.json. Automated checks alone cannot establish conformance.

Keyboard interaction checks in Chromium covered every language: cookie rejection by keyboard, skip-link destination, service category activation/state, reopening consent controls, Escape/focus restoration and route-change focus. All six routes were checked in every language at effective CSS viewports 720×450 and 320×225 (200% and 400% desktop zoom equivalents), without horizontal overflow, missing h1 headings or images without alt attributes. These are reflow checks, not a claim of physical browser zoom or assistive-technology testing.

WebKit mobile screenshots of the new statement, home/footer and privacy/cookies page were checked at 390×844, 393×852, 430×932 and 375×667. Cookie consent and the details destination were tested at all four sizes in all languages; the optional script remains absent before consent and after rejection. Deterministic vendor mocks verify consent signalling and withdrawal without sending test recordings to Microsoft.

The automated scanner could not resolve some gradient/image contrast. Manual bounds checks against the darkest gradient endpoint give 7.08:1 for hero body text and 6.08:1 for press body text; their headings exceed 16:1. The caption's darkest permissible backing over an entirely white photo gives at least 7.32:1. Focus blue contrasts at 4.86:1 against white and 3.65:1 against the footer background. Map attribution uses an opaque white background.

A final 12-page contrast follow-up after the fixes also found zero violations. Build and full ESLint pass. The existing bundle-size advisory remains.

## Remaining manual/owner review

A complete VoiceOver/NVDA assessment has not been performed; external maps/publications are not certified accessible. Check actual assistive-technology behavior and office assistance workflows. The statement explicitly discloses these limits. Physical-office access, parking, lifts, toilets and any designated accessibility coordinator have not been supplied or verified. Add accurate arrangements/contact details when confirmed; no invented arrangements, exemption or full-conformity claim is published.

Official Israeli guidance reviewed:

- Website accessibility: https://www.gov.il/he/pages/website_accessibility?chapterIndex=1
- Accessibility statement and arrangements: https://www.gov.il/he/pages/declaration_website_accessibility?chapterIndex=1

The office's applicable legal obligations and any exemptions depend on facts outside this repository and need owner/legal review.
