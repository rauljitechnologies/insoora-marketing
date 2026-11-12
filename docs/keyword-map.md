# Keyword map

One primary search intent per public page, and the secondary terms each page
is allowed to carry. This is the reference to check before rewriting any page
title, H1 or meta description.

## What this document is not

It carries **no search volumes, no keyword difficulty, no CPC, no rankings and
no traffic estimates.** None of those has been measured for this site, and a
plausible-looking number nobody sourced is worse than an absent one — it gets
quoted back as fact six months later.

Google Search Console was not available when this was written, so every
mapping below is an **editorial judgement about intent**, derived from what
each page actually says. Once GSC has data, the right next step is to check
each page's top queries against its row here and correct the map, not the
other way round.

## The map

Status column: **live** means the page's `<title>` and `<h1>` already lead with
the primary keyword, verified in the built HTML.

### Core pages

| Page | Primary intent | Secondary terms | Status |
|---|---|---|---|
| `/` | Insurance policy management software | insurance software for agents, policy records from PDFs | live |
| `/features` | Insurance software features | PDF extraction, bulk upload, renewal tracking, role-based access | live |
| `/how-it-works` | How insurance policy management software works | insurance PDF workflow, policy data extraction steps | live |
| `/product-in-action` | Insurance software screenshots | agent dashboard, policy list, renewals view | live |
| `/about-us` | About Insoora | insurance software company Godhra Gujarat | live |
| `/contact-us` | Contact Insoora | insurance software demo enquiry, agency onboarding help | live |
| `/faq` | Insoora FAQ | how extraction works, who can see policy documents | live |
| `/blog` | Insurance software guides | policy management guides for agents | live |

### Capability pages

| Page | Primary intent | Secondary terms | Status |
|---|---|---|---|
| `/insurance-policy-management-software` | Insurance policy management software (India) | manage insurance policies digitally, policy records | live |
| `/insurance-policy-entry-software` | Insurance policy entry software | insurance PDF data extraction, stop retyping schedules | live |
| `/insurance-document-management-software` | Insurance document management software | insurance PDF storage, policy document management | live |
| `/insurance-renewal-management-software` | Insurance renewal management software | policy expiry tracking, renewal dates | live |
| `/insurance-crm-software` | Insurance CRM software for agents (India) | customer-wise policy management, client records | live |
| `/insurance-agency-management-software` | Insurance agency management software | agency policy records, shared book of business | live |
| `/insurance-agent-management-software` | Insurance agent management software | solo agent policy management | live |
| `/general-insurance-management-software` | General insurance management software | motor and health policy management | live |

### Portal pages

| Page | Primary intent | Secondary terms | Status |
|---|---|---|---|
| `/agent-portal` | Insurance agent portal | agent policy management portal | live |
| `/customer-portal` | Insurance customer portal | customer policy document access | live |
| `/agency-management-portal` | Insurance agency portal | sub-agent access, shared agency book | live |

### Articles

Articles target **informational long-tail** intent. Each one's product-page
counterpart is the commercial answer to the same subject, and the article
links to it.

| Article | Informational intent | Links to |
|---|---|---|
| `what-is-insurance-policy-management-software` | what is insurance policy management software | policy entry, document management |
| `ocr-in-insurance-how-digital-policy-extraction-works` | OCR in insurance / policy extraction | policy entry, document management |
| `insurance-policy-details-explained` | insurance policy fields explained | policy entry, document management |
| `organize-insurance-policy-documents-digitally` | organize insurance policy documents | policy management, renewals, agent portal |
| `track-insurance-policy-renewals-and-important-dates` | track insurance policy renewals | policy management, renewals, agent portal |
| `manage-multiple-insurance-policies-one-dashboard` | manage multiple policies in one dashboard | policy management, renewals, agent portal |
| `reduce-manual-insurance-policy-data-entry` | reduce manual policy data entry | **policy entry**, policy management, renewals |
| `insurance-agency-management-practical-guide` | insurance agency management guide | policy management, renewals, agent portal |
| `best-insurance-management-software-india` | best insurance management software India | policy management, CRM, agency management |
| `best-crm-software-for-insurance-agents-india` | best CRM for insurance agents India | policy management, CRM, agency management |
| `excel-vs-insurance-crm-software` | Excel vs insurance CRM | policy management, CRM, agency management |
| `general-insurance-management-software-features` | general insurance software features | **general insurance**, policy management, CRM |
| `how-customers-can-keep-insurance-policies-organized` | keep insurance policies organized (policyholder) | customer portal, CRM |

## Cannibalisation

Four pairs of pages sit close enough to be worth naming. Three are resolved by
intent; two needed a link added.

**1. `/` and `/insurance-policy-management-software` — both lead with the same
phrase.** This is deliberate and is not being separated. The home page is the
brand answer and the capability page is the product answer, they differ in H1
("Insurance policies, organized automatically." against "Insurance policy
management software that starts from the policy document itself."), and the
home page links down to the capability page. If GSC later shows the two
trading positions for one query, the capability page is the one to keep and
the home page's `<title>` should drop the exact phrase.

**2. `reduce-manual-insurance-policy-data-entry` and
`/insurance-policy-entry-software`.** The article's H1 carries the landing
page's own primary keyword. **Fixed:** the article now links to that page as
its first product link, via the `productLinks` field on the post (see
`src/lib/blog/types.ts`). Before this it linked to three other pages and not
to the one it competed with.

**3. `general-insurance-management-software-features` and
`/general-insurance-management-software`.** Same shape, same fix.

**4. The three "choosing software" articles** all target buyer intent around
insurance software in India. They are not consolidated: one is a general
buyer's guide, one is CRM-specific, one is an Excel comparison, and the
queries behind them genuinely differ. They cross-link to each other.

A build-time guard in `src/lib/solutions/index.ts` fails the build if an
article's `productLinks` names a page that does not exist, because the
renderer silently drops an unresolvable slug and an article would quietly lose
its most important internal link.

## Rules for editing

- One `<h1>` per page, carrying the primary intent. Enforced structurally by
  `PageHead` in `components/marketing/section.tsx`.
- `<title>` must be 60 characters or fewer before the layout appends
  `" · Insoora"`, and must not contain "Insoora" itself. Both fail the build
  (`TITLE_MAX`, `BRAND_IN_TITLE` in `lib/seo.ts`).
- Meta descriptions must be 70–165 characters. Also a build failure
  (`DESCRIPTION_MIN` / `DESCRIPTION_MAX`).
- Internal anchor text is the destination's `nav.label`, never its primary
  keyword. Eleven links reading "Insurance Policy Management Software" on one
  page is exact-match anchor stuffing; see the note in
  `components/marketing/explore-links.tsx`.
- No page may claim a capability the product does not have. In particular:
  Insoora is not an insurer, broker or policy issuer; it does not sell
  policies or settle claims; and there are **no** automated SMS, WhatsApp or
  email renewal notifications to claim.
