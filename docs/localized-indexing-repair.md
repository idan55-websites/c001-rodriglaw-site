# Multilingual indexing repair — 6 October 2026

## Findings

The earlier update associated the owner's supplied names with one person and office and was verified as deployed. That check was not a Google indexing or rank check. English/French/Dutch content was available only through a client-side language selector: the build produced Hebrew HTML at six shared URLs. Visitors and crawlers could receive different languages at the same canonical URL depending on saved state, and there were no separately linked translated URLs.

Public searches surfaced other people/businesses for some names, so a shared surname alone does not establish which professional a query means. The selected names in this repository come from the owner's instructions; no unrelated directory profile was attached to Moria's identity.

An isolated, non-personalized Google rank check was attempted using the owner's literal terms. Google presented an automated-traffic challenge on the first query. It was not bypassed. Remaining queries were not tested on Google; no improved rank or successful indexing is claimed. Details are in search-rank-check.json. URL Inspection in a verified Search Console property is needed to confirm Google's actual crawl/indexing state.

## Changes

- Added permanent `/en`, `/fr` and `/nl` language URLs for all six public routes. Hebrew keeps its current URLs. The build now renders 24 complete HTML pages, each in its URL's language.
- Made language selection navigate to the corresponding translated URL and added crawlable footer language links. Navigation, contact anchors, cookie policy and accessibility links preserve the selected language. Direct links, reloads and browser back navigation respect the URL rather than stored language preferences.
- Added self-canonical URLs and five reciprocal HTML language annotations (he/en/fr/nl/x-default). All 24 URLs appear in the sitemap and have matching Vercel/preview route mappings.
- Showed the bilingual name reference on Home as well as About. The full Rodrig Hadad name is prominent in the translated About headings/titles; all four user-supplied surname forms remain associated with one identity. Added natural hyphenated surname variations to alternate-name metadata.
- Added a repeatable `npm run check:seo` artifact check to prevent missing translated HTML, mixed language metadata, incorrect canonicals, broken production rewrites or lost name references.

The literal misspellings “la notary” and “ונוריון” were normalized to proper professional wording; they were not used as false public business names. No surname doorway pages, hidden keyword lists, fake reviews, external profile edits or guaranteed-ranking claims were introduced.

## Validation

Production build, ESLint, whitespace checks and `npm run check:seo` passed. The artifact check verifies all 24 HTML pages, reciprocal hreflang, one canonical/favicon/h1 per page, sitemap membership, production mappings, visible bilingual names on Home/About and structured name/service coverage.

Browser checks covered all 24 URLs at 1440px and 375px (48 WCAG 2.0/2.1 A/AA axe scans), plus 24 route/language reflow checks at 320px with 200% text and increased spacing. No page errors, axe violations or horizontal overflow were detected. Language dropdown navigation retained query strings; browser back, localized menu/contact/cookie/accessibility links and destination focus worked. English About content was verified without JavaScript and its mobile screenshot inspected. External services were blocked during tests; reduced motion avoided sampling fade transitions. Evidence: localized-indexing-audit.json.

## Indexing and ranking limits

After publishing, submit the sitemap and inspect/request indexing of `/`, `/about`, `/services`, `/en`, `/en/about` and `/en/services` in the verified Google Search Console property. Recrawling/indexing may take time and does not guarantee a position for any name, misspelling or generic term such as “נוטריון”. Technical deployment checks must not be described as proof of Google rankings. Business Profile completeness and accurate external identity references require owner account access and were not edited here.

Official guidance:
- https://developers.google.com/search/docs/specialty/international/localized-versions
- https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl
- https://developers.google.com/search/docs/appearance/structured-data/organization
