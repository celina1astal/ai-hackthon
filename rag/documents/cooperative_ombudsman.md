---
doc_id: about_ombudsman
title: Cooperative Ombudsman — jurisdiction, procedure and forms
source_url: https://crcs.gov.in/about-ombuds
captured: 2026-09-19
page_last_updated: 2026-08-29
routing: procedural
authority: official_guidance
jurisdiction: central
language: en
flow: ombudsman_complaint
---

# Cooperative Ombudsman

## Establishment

The Cooperative Ombudsman was appointed under **section 85A** of the
Multi-State Co-operative Societies Act, 2002, following the 2023 amendment,
by gazette notification dated **05.03.2024**.

## What the Ombudsman will consider

**Complaints by members**

Complaints by members regarding their deposits, equitable benefits of the
multi-state co-operative society's functioning, or any other issue affecting
the individual rights of the member concerned.

**Appeals against an order of the Cooperative Information Officer**

Appeals preferred under **sub-section (4) of section 106** by members against
an order passed by the Cooperative Information Officer.

## How to file a complaint

File in **Form VI**, prescribed under **rule 30H(2)** of the MSCS Rules, 2002,
after fulfilling all the conditions stated in the form. Complete information
and all relevant documents requested in Form VI must be provided.

Form VI: https://crcs.gov.in/public/landing/images/form/Form6.pdf

## How to file an appeal

Against rejection of an application by the Cooperative Information Officer:
file in **Form VII** within **one month** from the date of rejection.

Form VII: https://crcs.gov.in/public/landing/images/form/Form7.pdf

## Where to file

Cooperative Ombudsman
World Trade Centre, Tower-E, 9th Floor
Nauroji Nagar, New Delhi – 110029

Complaints and appeals may also be filed by email: **mscs-ombudsman@gov.in**

---

## Ingestion notes

- The one-month appeal window is a **hard limitation period**. Any bot answer
  that mentions the appeal route must state the deadline in the same breath;
  a member who learns about the route but not the clock is worse off than one
  who learns neither.
- The named officer and the postal address are volatile — re-crawl weekly and
  never let the model generate an official's name from memory.
- Ombudsman jurisdiction is **member-vs-society**. Disputes between societies,
  or society-vs-Registrar, go elsewhere (s.84 arbitration, s.99 appeal to the
  Central Registrar). Encode this as a router branch, not as prose the model
  has to reason about at generation time.
