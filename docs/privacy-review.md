# Website privacy review — 2 October 2026

Scope: public visitor pages, optional Microsoft Clarity and consent UI (English, Hebrew, French, Dutch). Booking/contact API routes and UI are disabled. This is a technical review, not a certification of the office's overall legal compliance.

## Sources and interpretation

- Israeli Privacy Protection Authority, section 11 notice guidance after Amendment 13: https://www.gov.il/BlobFolder/legalinfo/duty_to_notify/he/notify13.pdf . Notice should identify purposes, voluntary/required provision and refusal consequences, recipients, controller/contact and access/correction rights.
- PPA advanced-payment privacy guidance: https://www.gov.il/BlobFolder/policy/payment_app_privacy/he/mobilepayment_after13.pdf . Recommends separate, active opt-in for nonessential cookies in that sector. The website uses this conservative consent design; this sector-specific guidance does not establish a universal Israeli cookie-banner rule.
- Microsoft ConsentV2: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2 . Denial alone can still allow cookieless collection. This implementation therefore does not load the script at all before acceptance, and reloads after withdrawal.
- Microsoft cookies: https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-cookies . Analytics storage is granted only after acceptance; advertising storage stays denied.

## Implementation

Equal accept/reject controls, optional analytics checkbox, no implied consent from browsing, footer settings, versioned 180-day local preference (an implementation choice, not a statutory Israeli deadline). Corrupt, expired or unavailable saved preferences default to off. Cross-tab changes and expiry are checked. Accessible first-party _clck/_clsk cookies are cleared on denial; Microsoft-domain cookies require browser controls. Maps/fonts remain operational external requests and are disclosed separately. Existing historical tracking cannot be undone by this change.

## Office/account checks outside repository scope

The office should verify controller details and its actual enquiry/client retention schedule; vendor contracts, international transfers and security arrangements; and any database notification/registration or DPO duties that apply to its actual processing. The repository does not establish those facts. In the Clarity project, configure Consent Mode/default advertising permission as denied and verify masking/retention settings. Account access is unavailable here. Re-review privacy notices before enabling booking/forms or adding other tracking. No guarantee is made that every operational obligation is satisfied.

## Verification

Production build and full ESLint pass; git diff whitespace check passes. The build retains the existing large-bundle advisory. WebKit browser emulation (not physical iPhone testing) covered 390×844, 393×852, 430×932 and 375×667. Complete screenshots of all five public routes were inspected at each size; no horizontal overflow or runtime errors were recorded. Hebrew/French/Dutch route layouts were additionally checked at 375×667. Scroll anchors clear the header, route navigation resets to the top with a fade, tabs work by touch, and reduced motion disables animations.

Consent acceptance, rejection, saved preferences, reopening and withdrawal passed in all four languages at all four mobile sizes and at desktop 1440×900. Vendor requests were intercepted with a deterministic mock for these consent tests: zero Clarity requests before consent or after rejection; acceptance queues analytics granted/ads denied before loading; withdrawal removes first-party mock cookies and stops loading on the new page. Corrupt, expired, future-dated, older-version and blocked-storage cases defaulted to off. Withdrawal in a second tab stopped the first tab too. Notice/settings screenshots were inspected, including the smallest French/Dutch views after fixing their cramped layout. Actual Clarity project settings and physical-device Safari remain unverified.
