# SEO and accessibility update — 6 October 2026

## Implemented

- Added a native modal accessibility dialog in Hebrew, English, French and Dutch. Controls cover text enlargement (100–200%), high contrast, stopping animations, underlined links, a readable font, WCAG-style text spacing and grayscale. Tab/Shift+Tab remain in the dialog; Escape and close restore the trigger's focus. Following the statement link preserves destination focus.
- Sanitized and persisted preferences with storage-blocked browser support and cross-tab synchronization. Reduced-motion CSS exposes reveal content immediately, stops transitions/animations and disables smooth scrolling. Mobile motion observers stop; map flyTo animations honor the setting and an active programmatic map animation is stopped.
- Fixed flex/grid reflow for enlarged and spaced text, including footer contacts and long Dutch words. Kept the floating accessibility control available beside cookie consent.
- Updated the accessibility statement with the controls and review date. No certification or invented physical-office arrangements are asserted.
- Added per-route titles, descriptions, canonical URLs, Open Graph/Twitter sharing metadata and structured WebSite, LegalService, Person and WebPage data. Business details come from the existing website: Moria Rodrig, Hasivim 49 Petah Tikva, phone +972-54-622-5654, moria@rodriglaw.com.
- Added Hebrew build-time HTML rendering for all six public routes, sitemap.xml and robots.txt for https://rodriglaw.com. Vercel and local production preview rewrites serve each route's own HTML. Explicit language selections persist; Hebrew is the default.
- Generated ICO/PNG favicon and Apple touch icon from the original MR logo, plus a social sharing image.
- Deferred the interactive map until it approaches the viewport. Initial JS decreased from approximately 2,108 kB (598 kB gzip) to 401 kB (126 kB gzip). The large Mapbox chunk is fetched separately; its bundle-size warning remains.

## Verification

- Production build, ESLint and git diff whitespace checks passed.
- Chromium/axe-core scans: 48 route/language/viewport combinations (six routes × four languages × 1440×900 / 375×667), plus eight dialog scans. No WCAG 2.0/2.1 A/AA violations were detected. These scans used OS reduced motion so animation fades were not sampled midway; they are not proof of full conformity.
- After reflow fixes, 12 combinations (four languages × widths 1440, 375 and 320) with all settings enabled and 200% text had no page horizontal overflow or axe violations in the page/dialog. Evidence: accessibility-update-audit.json.
- Keyboard opening, Tab wrapping, Escape/focus restoration, size/contrast application, persistence across reload, reset and canonical metadata were checked. Static HTML, route-specific canonical URLs, valid JSON-LD and one h1 per public page were inspected. Robots, sitemap and icons return the expected content types in production preview.
- A further 24 route/language checks at 320px with all settings and 200% text had no horizontal overflow; four enlarged-dialog checks had no internal horizontal overflow. Statement-link destination focus, HTML without JavaScript, and controls with blocked localStorage passed. Final mobile dialog and desktop home screenshots were visually inspected.
- External network requests were blocked for these browser checks. Third-party maps/publications were not audited. Automated reflow is not equivalent to a full assistive-technology or physical-browser-zoom assessment.

## Remaining owner/manual actions

Publish the changes before submitting https://rodriglaw.com/sitemap.xml through a verified Google Search Console property and requesting indexing. The work here is local; no production deployment or Search Console submission was performed. Neither indexing speed nor ranking is guaranteed. Maintain accurate business name, address and phone in the Google Business Profile.

Complete a manual VoiceOver/NVDA assessment and verify physical-office accessibility arrangements and any required accessibility-contact designation. Update the statement with the actual office arrangements once confirmed. Legal applicability/exemptions depend on business facts outside this repository; the menu does not establish legal compliance by itself.

## Primary guidance consulted

- Israeli Commission for Equal Rights of Persons with Disabilities: https://www.gov.il/he/pages/website_accessibility?chapterIndex=1
- Israeli Standard 5568 part 1 (2023): https://www.gov.il/BlobFolder/legalinfo/israeli_accessibility_standards_pdf/he/sitedocs_si-5568-1-september-2023.pdf
- Google JavaScript SEO: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google canonical URLs: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google indexing FAQ: https://developers.google.com/search/help/crawling-index-faq
