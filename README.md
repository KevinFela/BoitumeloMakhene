# Boitumelo Makhekhe — personal runner

A responsive static website for personal shopping, parcel collection and delivery, and everyday errands. The orange, purple and white design follows the supplied visual references with original vector artwork and an existing portrait.

## Run locally

Run `python -m http.server 8000` from this directory and open `http://localhost:8000`.

## Pages

- `index.html`: service overview, process, introduction and FAQs.
- `services.html`: the three service categories and enquiry links.
- `about.html`: personal introduction and service approach.
- `how-it-works.html`: enquiry process and practical FAQs.
- `contact.html`: validated enquiry preparation and WhatsApp/email handoff.
- `assets/site.css` and `assets/site.js`: shared styles and interactions.

Legacy `gigs.html`, `gallery.html` and `boitumelo/index.html` redirect to the relevant new pages. Original media and the existing `CNAME` are retained.

## Enquiries

The form prepares a message locally. The visitor reviews it and chooses WhatsApp or email, then sends it in that application. There is no database, payment collection, automatic sending, live tracking or automatic booking confirmation. Form data is not persisted in browser storage.

Contact details were retained from the repository's previous contact page: WhatsApp/phone `+27 67 636 2605` and `boitumeloangela814@gmail.com`. To change these, update the links in the HTML pages and the handoff links in `assets/site.js`.

Before launch, confirm these contact details, the user's requested spelling **Makhekhe**, and the public-facing copy. Pricing, service areas and dates are deliberately confirmed by enquiry because fixed details have not been supplied. The repository name remains `BoitumeloMakhene`.

Fonts are loaded from Google Fonts with local sans-serif fallbacks. Other visual assets are local. No build step is required for GitHub Pages.
