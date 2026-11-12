# Aviators Market testimonial integration

## Current delivery: front-end demonstration only

The submission and management interfaces are portable HTML5, isolated CSS3 and vanilla JavaScript. Vite is used only for the Replit preview, as approved by the project owner. The portable folder does not require React, a Node application, a database or a build step when incorporated into Shopify.

**Do not launch the public submission page yet.** There is no collection service, image storage, authentication, notification service or publication connection. Demo form validation does not send or save a submission. Management records are fictional; changes exist only in page memory and disappear on reload. The demo management page is publicly previewable and is NOT a private production administration system.

No existing Shopify theme, testimonials, customer accounts, checkout, seller portal, navigation, footer, domain or DNS configuration has been changed.

## Files and previews

- `testimonial-submission/index.html`, `testimonial-submission.css`, `testimonial-submission.js` and `images/`: customer interface.
- `testimonial-management/index.html`, `testimonial-management.css`, `testimonial-management.js` and `images/`: fictional management demonstration.
- Submission: `/aviators-market-testimonials/testimonial-submission/index.html`.
- Management: `/aviators-market-testimonials/testimonial-management/index.html`.
- The preview and published static site also support the trailing-slash folder URLs through explicit directory-to-index mappings. These are independent static documents, not a single-page React app; do not add a catch-all rewrite to the root redirect document. Keep navigation links pointed at the explicit `index.html` files for portability.
- Any demonstration-only navigation or mode switcher must be omitted from the Shopify customer page.
- The scaffold outside this portable folder is preview infrastructure, not part of the Shopify deliverable.

## Verified brand reference

The existing `https://aviatorsmarket.com/pages/testimonials` was inspected visually and its HTML/CSS examined. Its hero uses a dark `#0b0d10` background, red accents, white rounded containers, subtle borders and shadows, Cabin headings and Outfit body text. The original hero image and site-served fonts are included locally for the preview. No replacement logo was created.

Original asset sources:

- Hero: `https://aviatorsmarket.com/cdn/shop/files/Testimonial_Background_desktop_65c4a058-f7d7-4884-921c-1326ed64055d.png`
- Outfit and Cabin: the font declarations served by the existing Shopify theme.

When integrated, prefer the theme's existing licensed fonts and authorized asset references. Confirm that the merchant's licenses cover any asset reuse outside its Shopify theme. No customer photographs or real testimonial records have been copied into the management demo.

Existing linked policies were verified to return HTTP 200:

- Privacy: `https://aviatorsmarket.com/pages/privacy-policy`
- Terms: `https://aviatorsmarket.com/pages/terms-of-service`

## Recommended collection approach

Select a merchant-approved Shopify-compatible testimonial moderation application, with a secure hosted administrator area and a documented submission, attachment, moderation and publication contract. The service must support the complete workflow below; a basic contact form alone is insufficient.

Prefer an established app that can preserve original submissions, granular display consent, private attachments, explicit publication and audit history. A merchant-approved private Shopify application is an alternative if no existing application meets these requirements. That would be a separate implementation hosted and secured outside these portable front ends; no such backend is included here.

Do not insert invented API endpoints. The exact service, endpoint URLs, authentication method, payloads, rate limits, retention policy and webhook signature scheme must be supplied from the selected provider's official documentation before connection. Do not embed administrator credentials in browser JavaScript.

### Submission integration contract

The explicit connection point is `AMTS_CONFIG.submissionAdapter(payload, files)` in `testimonial-submission/testimonial-submission.js`. It is currently `null`, with demo mode enabled. The future adapter must resolve with `{ receiptId }` only after a real durable receipt; the `buildPayload()` function defines the client field mapping. The local config is intentionally not a browser authentication or authorization mechanism.

The management demonstration maintains review, publication, edited text, customer-confirmation evidence, contact clearance, notes and history in memory. Photo reference tiles are illustrative, not private stored uploads. Production must replace the fictional data and local actions with the selected provider's authenticated operations, not simply set a client-side flag.

Replace the demo-only validated submission branch with an approved adapter. It must:

1. Validate all fields again on the service, not merely in the browser.
2. Collect explicit text consent and conditional photo permission, including the consent wording/version and the provider-generated receipt timestamp.
3. Store the original text, preferences and attachment references privately.
4. Assign a server-generated unique ID and `Pending Review` status, with publication initially false.
5. Return an authenticated/validated acknowledgement containing the persisted submission ID.
6. Activate the reusable thank-you state only after that acknowledgement is verified.
7. Preserve input and allow safe retry on failure; never turn a timeout into a false success.

Disable the submit control while a request is in flight and restore it on failure. The provider must support server-enforced idempotency keys, retry deduplication, throttling and abuse prevention; disabling a button is not sufficient duplicate protection. Do not log personal data, form contents or file bytes.

### Required private record

The provider must retain:

| Group | Required fields |
| --- | --- |
| Identity and receipt | Unique submission ID; submission date/time; full name; email; company; role; city; state/province; country |
| Experience | Category; integer rating 1–5; original testimonial text of 30–2,000 characters; aircraft/product/service details; transaction outcome; relationship length |
| Attachments | Private photo references and metadata; photograph authorization |
| Customer choices | Display-name preference; contact-before-publication preference; follow-up permission; publication consent and consent evidence |
| Moderation | Review status; publication status; internal notes; review date; publication date; reviewer identifier |
| Editing and history | Separate publication-edited text; edit classification; customer confirmation evidence for substantive edits; contact confirmation evidence when requested; append-only audit history |

All required strings must be trimmed and meaningfully nonempty. Company is required for company-name publication. Validate email, allowlisted dropdown values, rating, text length, checkbox consent and attachment limits on the service. Browser validation is for usability only.

## Image handling

The current file selection, previews and removal controls are local to the browser. They must not send file bytes to any unapproved service.

The approved provider must:

- Accept only JPEG, PNG and WebP, no more than three files, at most 5 MB each.
- Inspect file signatures and decode images rather than trusting extensions or browser MIME types.
- Scan files and defend against malformed images, decompression bombs and executable content.
- Re-encode images where appropriate, strip sensitive metadata and generate safe derivatives.
- Keep originals private with authenticated access for authorized reviewers; never expose predictable public object URLs for pending records.
- Bind uploaded attachments to the correct submission and prevent unauthorized cross-record access.
- Apply retention/deletion rules, orphan cleanup and removal requests.
- Release only specifically approved photo derivatives when the record is explicitly published; revoke public access or invalidate caches when unpublished.

Client-side object URLs are previews, not stored attachment references.

## Administrator access and hosting

Do not incorporate the management demo as a public Shopify page containing real customer records. A path or hidden link is not access control.

Use the provider's private hosted administration system or an approved securely hosted admin app. Require genuine identity authentication, least-privilege roles and server-side authorization on every record read, attachment read and mutation. Prefer MFA for administrators. Use secure sessions, CSRF protection where applicable, safe content rendering, restrictive CORS and an appropriate Content Security Policy. Client-side checkboxes and disabled buttons do not enforce permissions.

Every moderation action must write an audit event with actor ID, timestamp, prior state, new state, reason and relevant version identifiers. Never include private notes or customer email in public responses or analytics.

## Approval and publication workflow

Review status and publication status are distinct:

1. Collection creates `Pending Review`, unpublished.
2. A reviewer inspects identity, text, photographs, display choices and consent.
3. The reviewer chooses approve, reject or needs clarification.
4. Approval alone does not publish.
5. Prepare a separate publication version without overwriting the original. Minor formatting/spelling changes must preserve meaning. Substantive edits require recorded customer confirmation.
6. If the customer requested contact before publishing, complete that contact and record clearance before publishing.
7. An authorized administrator explicitly publishes an approved record. The service must atomically validate status, consent, contact requirements, edit confirmation and attachment approvals.
8. Rejecting or requesting clarification must leave the record unpublished. If applied to a published record, remove it from the public feed atomically.
9. Unpublishing removes public eligibility without deleting the underlying private record or history.

Use optimistic concurrency or version checks so two reviewers cannot overwrite each other's decisions. Confirm consequential actions in the interface. Persist internal notes privately. Sending clarification messages requires the approved messaging integration and must not be represented as sent merely because a status was changed.

## Shopify public display

Preserve the existing testimonials page and its layout. Add the provider's reviewed section/snippet or a server-produced public projection after merchant review. Never download the private collection into storefront JavaScript and filter it there.

The public feed must contain only explicitly published, approved records and allowlisted fields:

- Resolved display name according to the customer's chosen preference.
- Company only when authorized; location only with appropriate authorization.
- Rating; publication-ready text; relevant customer category.
- Specifically approved public photograph derivatives.

Never include email, private full identity when abbreviated display was selected, internal notes, private attachment URLs, rejected/pending records or raw consent evidence. Render text safely, not as executable HTML. Define cache invalidation so unpublishing promptly removes records from Shopify pages and public image delivery.

Do not replace or import existing testimonials during this integration without a separate approved migration.

## Notifications

Connect only the merchant-approved notification service. Recipient configuration and credentials belong in the approved secure service, not these files.

After durable collection, enqueue a new-submission alert with customer name, company, rating, submission date, Pending Review status and an authenticated administration link. The link must not grant access by itself or leak customer information in query strings. Retry notification failures without creating duplicate submissions. Keep message delivery status separate from collection status.

Optional customer receipt emails must accurately say that the story is pending review, not published. Clarification messages and customer confirmation for substantive edits require explicit delivery tracking and recorded replies. Do not imply that demo controls send email.

## Shopify incorporation steps

1. Review these files and approve the collection provider before changing Shopify.
2. Use an unpublished duplicate theme for implementation.
3. Copy the customer content into a page section/template, omitting standalone document wrappers and demo navigation. Retain the theme's real header and footer.
4. Upload the isolated stylesheet, vanilla script and authorized assets into Shopify theme assets. Replace relative asset paths with Shopify asset references and load the script with `defer`.
5. Keep all `.amts-` selectors scoped and all `.amtm-` styles confined to the separate secured administrative interface.
6. Connect the approved submission adapter; retain truthful error and in-flight states.
7. Connect the secure administrator interface and published-only projection.
8. Test in staging with non-customer test records before making a public page available.

## Acceptance testing still required before production

The preview is not evidence that a secure production workflow exists. This first delivery does not certify an end-to-end integration.

### Customer interface

- Empty fields, invalid email, whitespace-only name/story, all required dropdowns.
- Ratings 1–5 with mouse, touch and keyboard; visible selected description.
- Character counter, 29/30/2,000 character boundaries, multiline input.
- Valid and invalid image types; above-limit sizes; fourth image; removal; repeated selection.
- Company-name publication conditional requirement and contact choices.
- Unchecked general consent and conditional photograph consent.
- Errors retain entered values, announce clearly and move focus appropriately.
- Valid demo submit shows the exact not-submitted message, never thank-you.
- Keyboard-only access, screen reader labels, reduced motion and phone/tablet layouts.

### Management demonstration

- Fictional data labels; newest-first default order; alternate sorting.
- Every status filter and name/company/ID/text search, including no results.
- All detail fields, original-versus-edited text, consent, preferences and history.
- Approve without publish; separate confirmation to publish; reject/clarification cannot publish.
- Contact-before-publication and substantive-edit confirmation restrictions.
- Notes, publication preparation, unpublish, confirmation cancellation and reset on reload.
- Mobile queue, details, action controls and keyboard focus behavior.

### Production integration

- Server-side field validation, idempotency and safe retries.
- Durable receipt and attachment storage, including failed/partial uploads.
- Unauthenticated and unauthorized access denied for every private operation.
- Status and audit persistence across sessions; concurrent-review behavior.
- No email/private notes/unpublished text in storefront responses or URLs.
- Explicit publishing and immediate removal on unpublish, including cached content.
- Notification delivery, failure handling, consent evidence and removal requests.
- Existing Shopify pages, checkout, accounts, navigation and footer unchanged.

## Production launch checklist — all items currently unverified

- [ ] Secure, persistent testimonial collection service connected.
- [ ] Submissions reliably received and stored.
- [ ] Image attachments securely stored.
- [ ] Every submission has a unique identifier.
- [ ] New submissions enter Pending Review.
- [ ] Administrator authentication operational.
- [ ] Administrator permissions enforced server-side.
- [ ] Private review queue displays actual submissions.
- [ ] Approval and rejection persist correctly.
- [ ] Approval does not automatically publish.
- [ ] Publication requires an authorized, explicit administrator action.
- [ ] Published testimonials appear correctly on the existing website.
- [ ] Rejected and unpublished testimonials remain private.
- [ ] Unpublishing removes testimonials from public display.
- [ ] Administrator notifications work.
- [ ] Customer consent is recorded.
- [ ] Original submissions and review history preserved.
- [ ] Entire workflow tested end-to-end.

**Until every item is verified, this project remains a demonstration and is not production-ready.**
