# Name and notary search update — 6 October 2026

The owner supplied four surname forms referring to the same professional:
Moria Rodrig / מוריה רודריג, Moria Hadad / מוריה חדד,
Moria Rodrig Hadad / מוריה רודריג חדד and Moria Hadad Rodrig / מוריה חדד רודריג.
The preferred brand remains Moria Rodrig.

## Changes

- Added all eight English/Hebrew names to the person, office and website identity metadata. The office also includes the natural “Law and Notary” and “עו״ד ונוטריון” forms. Shared names are maintained in src/utils/businessIdentity.js.
- Added a readable explanation on Home and About that the surname variations refer to the same lawyer/notary. About also presents the names in the other alphabet with correct language and direction attributes. Copy is translated into the site's four supported languages.
- Added distinct Home, About, Services and Contact titles/descriptions in all four languages. About's description includes the alternate names; Home and Services describe lawyer/notary services in Petah Tikva and supported translation languages.
- Added a visible notary-in-Petah-Tikva heading and a service introduction, plus a structured service catalog built directly from the Services page's existing eight legal/notarial service entries.
- Associated the About profile's mainEntity with the existing Person ID. Every surname form shares that same identity and office; no separate surname landing pages are created.

No invented ratings, addresses, services or credentials are included. Search misspellings were normalized to proper public names and professional terms. No meta-keywords tags or hidden keyword paragraphs were added. Structured data and relevant content help communicate identities, but do not guarantee rankings for generic terms such as “נוטריון”.

## Validation

Production build, ESLint and whitespace checks passed. All six generated HTML pages contain valid JSON-LD, the supplied name variants, and unique page descriptions. The static About body includes both alphabets; its mainEntity references the same Person. Services has two catalog groups with four visible services each.

Chromium checks covered Home/About/Services in four languages at desktop 1440px and mobile 375px: 24 combinations with no axe WCAG 2.0/2.1 A/AA violations, missing translation keys, page errors or horizontal overflow. A further 12 combinations at 320px with 200% text and increased spacing had no overflow. External requests were blocked and OS reduced motion used for stable audit measurements. The mobile bilingual name reference was visually inspected. Evidence is in name-search-audit.json.

Google must recrawl the updated pages before its results reflect the changes. After publishing, request indexing of Home, About and Services through the verified Search Console property. Accurate Google Business Profile information, real reviews and relevant authoritative links can complement the website; none were edited or invented here.

Primary guidance:
- https://developers.google.com/search/docs/appearance/structured-data/organization
- https://developers.google.com/search/docs/appearance/site-names
- https://developers.google.com/search/docs/essentials/spam-policies
