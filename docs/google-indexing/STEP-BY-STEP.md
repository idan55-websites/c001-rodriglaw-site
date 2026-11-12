# Google indexing and favicon manual — Rodrig Law

Checked on **30 October 2026** for **https://www.rodriglaw.com**.

The sitemap has already been submitted through your signed-in Google Search Console account. Google returned **Success**, with **24 discovered pages**. Individual URL Inspection checks confirmed **19 indexed pages** and **5 pages not yet indexed**. All 24 live pages passed the technical checks. Discovery, indexing and ranking are separate stages; a successful sitemap does not mean every listed page is indexed.

## 1. Open the correct property

1. Open [Search Console for rodriglaw.com](https://search.google.com/search-console?resource_id=sc-domain%3Arodriglaw.com).
2. Use the Google account that already has access to this property.
3. Confirm the property selector says **rodriglaw.com**. This Domain property covers the www and non-www hosts and the site's language folders.
4. Inspect the final **https://www.rodriglaw.com** URLs. The non-www homepage redirects there.

You already have property access and were able to submit the sitemap. You do not need a different ownership verification file for every page or language. If setting up access in a new account: choose **Add property → Domain**, enter `rodriglaw.com`, copy Google's unique TXT record into the domain's DNS, and click **Verify** after propagation. Keep the TXT record in place. Ownership verification is separate from checking whether a page is indexed. [Google's verification instructions](https://support.google.com/webmasters/answer/9008080?hl=en).

## 2. Check the XML sitemap — already submitted

1. Open [the live sitemap](https://www.rodriglaw.com/sitemap.xml). It contains 24 URLs.
2. In Search Console, choose **Sitemaps** in the sidebar.
3. Confirm the submitted row is `https://www.rodriglaw.com/sitemap.xml`, with **Success / הצלחה** and **24** discovered pages. Submission and last-read dates were 30 October 2026.
4. For future setup, paste that full URL into **Add a new sitemap / הוספת sitemap חדש**, then click **Submit / שלח**. It is already submitted in this property, so there is no need to submit it again now.

Google reads the XML at its website URL; you do not email or upload the XML file to Google. [Google's sitemap submission instructions](https://support.google.com/webmasters/answer/7451001?hl=en).

The adjacent [sitemap.xml](sitemap.xml) is a downloadable copy of the live file. The existing website build regenerates the production sitemap automatically. It does not need to be replaced for this submission. Do not add invented modification dates or assume `priority` values can raise rankings.

## 3. Request indexing for the five outstanding pages

Repeat these steps for each URL below:

1. Paste the full URL into the inspection box at the top and press **Enter**.
2. Read the indexed result: **URL is on Google / כתובת האתר נמצאת ב-Google** means indexed; **URL is not on Google / כתובת האתר לא נמצאת ב-Google** means not indexed.
3. Choose **Test live URL / בדיקה של כתובת אתר פעילה**. Check that Google can fetch the page and that indexing is allowed. A passing live test checks current eligibility; it does not establish that the page is already indexed.
4. Choose **Request indexing / הגש בקשה ליצירת אינדקס** and wait for the success confirmation. Complete a Google CAPTCHA yourself if one appears. If there is a connection error or quota message, try again later.

Requests enter Google's queue and do not guarantee indexing or placement. Google applies a daily request limit; the submitted sitemap covers all 24 pages. [Google's URL Inspection instructions](https://support.google.com/webmasters/answer/9012289?hl=en).

Work through this list:

1. https://www.rodriglaw.com/fr
2. https://www.rodriglaw.com/nl
3. https://www.rodriglaw.com/contact
4. https://www.rodriglaw.com/privacy-policy
5. https://www.rodriglaw.com/accessibility

The settled inspection cards reported these pages as not indexed, with the Hebrew reason `נסרק אך לא נכלל באינדקס`. No robots block, noindex instruction, missing canonical or missing static content was found in the live technical audit. A request has not been confirmed for these five URLs. Focus first on the language homepages and Contact; policy pages are a lower business priority.

## 4. Request the homepage recrawl for the favicon

The live homepage already references this stable icon:

https://www.rodriglaw.com/favicon-192.png

It returns **200 / image/png**, measures **192 × 192**, and is allowed by robots.txt. The root `favicon.ico` also works and contains a 48px version. The icon matches the local MR brand asset. The homepage is indexed; Google reported its last crawl as **24 October 2026** during the detailed inspection.

1. Inspect **https://www.rodriglaw.com/**.
2. Click **Request indexing** and wait for confirmation.
3. Keep the favicon URL stable while Google processes the homepage.

Google discovers the favicon from the homepage. Its documentation allows days to weeks for processing and does not guarantee display. A processing or selection delay is a possible explanation here, not a confirmed diagnosis. A generic icon in Search Console does not override the positive homepage indexing result. [Google's favicon requirements](https://developers.google.com/search/docs/appearance/favicon-in-search).

The automated homepage request failed twice because Google could not connect to reCAPTCHA, including after reloading Search Console. **No homepage recrawl queue confirmation was received.** Finish this request manually when the service is working. The homepage inspection tab was left open for you. Sitemap submission succeeded independently of this error.

## 5. Index status for every public page

These are individual Search Console results checked on 30 October 2026, rather than estimates from a public `site:` search. Each table cell links to the exact URL. Every URL also passed the live technical checks.

| Page | Hebrew | English | French | Dutch |
| --- | --- | --- | --- | --- |
| Home | [Indexed](https://www.rodriglaw.com/) | [Indexed](https://www.rodriglaw.com/en) | [Not indexed](https://www.rodriglaw.com/fr) | [Not indexed](https://www.rodriglaw.com/nl) |
| About | [Indexed](https://www.rodriglaw.com/about) | [Indexed](https://www.rodriglaw.com/en/about) | [Indexed](https://www.rodriglaw.com/fr/about) | [Indexed](https://www.rodriglaw.com/nl/about) |
| Services | [Indexed](https://www.rodriglaw.com/services) | [Indexed](https://www.rodriglaw.com/en/services) | [Indexed](https://www.rodriglaw.com/fr/services) | [Indexed](https://www.rodriglaw.com/nl/services) |
| Contact | [Not indexed](https://www.rodriglaw.com/contact) | [Indexed](https://www.rodriglaw.com/en/contact) | [Indexed](https://www.rodriglaw.com/fr/contact) | [Indexed](https://www.rodriglaw.com/nl/contact) |
| Privacy | [Not indexed](https://www.rodriglaw.com/privacy-policy) | [Indexed](https://www.rodriglaw.com/en/privacy-policy) | [Indexed](https://www.rodriglaw.com/fr/privacy-policy) | [Indexed](https://www.rodriglaw.com/nl/privacy-policy) |
| Accessibility | [Not indexed](https://www.rodriglaw.com/accessibility) | [Indexed](https://www.rodriglaw.com/en/accessibility) | [Indexed](https://www.rodriglaw.com/fr/accessibility) | [Indexed](https://www.rodriglaw.com/nl/accessibility) |

The Home, About, Services, Contact, Privacy and Accessibility routes in four languages are the site's 24 active public pages. Booking and calendar connection routes are disabled and excluded. Sections within a page, such as a contact anchor, do not need separate sitemap entries or ownership verification.

## 6. Follow up

1. Reinspect the five outstanding URLs in about a week; allow more time if they remain queued.
2. Open **Indexing → Pages / הוספה לאינדקס → דפים** and review the reported reasons. Use the submitted sitemap filter when available. The overview reports were still processing data during this check; individual URL Inspection results supplied the status table above.
3. If a URL remains excluded, expand its indexing details and compare its live test, declared canonical and Google-selected canonical. A different canonical, robots block or fetch failure needs a different response from a page merely awaiting indexing.
4. If a genuine site error is fixed, use **Validate fix** when offered for that issue. Do not treat every exclusion as a technical fault.
5. Check **Performance / ביצועים** for impressions, clicks, search terms and average position once data becomes available. Review trends weekly.

Google does not promise that every eligible page will be indexed. [Google's Page indexing report guide](https://support.google.com/webmasters/answer/7440203?hl=en).

## 7. Work toward stronger rankings

An XML sitemap helps discovery; it cannot put the site first. No first-place position is guaranteed. The next content work should address searches such as `מוריה רודריג`, `נוטריון בפתח תקווה` and `notary in Petah Tikva`, with useful, accurate service information. Consider substantial pages for services the office actually provides, with preparation requirements, process, common questions and clear contact options, reviewed by Moria before publication. Link them from Services and include them in future sitemaps. [Google's SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).

Claim or verify the office's Google Business Profile; keep its real business name, address, phone, category, services and hours accurate. Add office photos and invite honest client reviews. Relevant professional listings and genuine links can help establish the business. Local results depend on relevance, distance and prominence, so position varies by searcher and query. [Google's local ranking guidance](https://support.google.com/business/answer/7091?hl=en).

## Evidence and files

- [XML sitemap copy](sitemap.xml)
- [All 24 URL results](page-indexing-status.csv)
- [Google inspection evidence](search-console-inspections.json)
- [Live technical audit](live-technical-audit.json)
- [Action log](actions.json)
- [Sitemap success screenshot](sitemap-success.png)

The live audit checked HTTP responses, index directives, robots permission, unique titles, descriptions, self-canonical URLs, four language alternates plus x-default, static content, headings, JSON-LD and the favicon reference. Googlebot user-agent simulations test only those responses; they do not impersonate or prove access by Google's real crawler. No website code deployment was required for these findings.
