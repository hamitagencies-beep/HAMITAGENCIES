# HAMIT AGENCIES

A responsive, single-page agency website built with Vite, React, TypeScript and Tailwind CSS v4. Includes a downloadable local SEO pricing brochure, a mobile-friendly embedded PDF preview, dynamically generated sitemap and robots directives, and Vercel serverless endpoints for contact delivery with Resend.

## Run locally

```sh
npm install
npm run dev
```

## Test and build

```sh
npm test
npm run lint
npm run build
```

## Contact form delivery setup

The website reports success only after the email provider confirms delivery. Configure these environment variables in Vercel (Project → Settings → Environment Variables) to enable form delivery:

- `RESEND_API_KEY` — API key from your Resend account.
- `CONTACT_EMAIL` — inbox that should receive enquiries (for example, `hamitagencies@gmail.com`).
- `RESEND_FROM` — optional verified sender, e.g. `HAMIT AGENCIES <website@your-verified-domain>`.

Without these server-side variables, the endpoint returns a visible configuration error and the website offers direct email, phone, and WhatsApp links. The default Resend sender is intended for Resend onboarding/test mode; verify a sender domain with Resend for production delivery to arbitrary recipients. Never expose the API key in browser code.

To test locally with Vercel's function runtime, install the Vercel CLI and run `vercel dev` after setting environment variables. Vite's regular development server does not run the `/api/*` serverless functions.

## Brochure

`public/local-seo-brochure.pdf` is the self-contained, same-origin brochure asset used for inline preview, opening, and download. It was prepared from the exact plan prices and inclusions in the project brief because no source `local-seo-brochure.pdf` file was present in the workspace. The page and brochure show matching prices.

## Deployment

Import this project into Vercel; the Vite build output is `dist`, and files in `api/` deploy as serverless functions. Rewrites serve `/sitemap.xml` and `/robots.txt` with the live request host, so generated metadata follows the deployed hostname. Add the email-provider environment variables above before enabling form delivery.

## Test report

See [TEST-REPORT.md](./TEST-REPORT.md) for automated results and environment-dependent checks. `npm test` exercises contact endpoint validation, error handling and provider-success behavior without making live email calls.
