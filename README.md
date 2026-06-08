# Biggy Smallz Spitmasters

Marketing website for **Biggy Smallz Spitmasters** — chef-led fire catering and
private dining by Martin "Biggy" Mhlongo (Mbombela / Lowveld, South Africa).

The site's only job is to make someone want to start a conversation, then hand
them over warm. The single interactive feature is a **Book a Date** form that
emails the owner, who phones or emails the customer back himself. No quotes, no
prices, no menu, no checkout.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS**
- Static rendering where possible; the one server route is the booking API
- Mobile-first, responsive, accessible (semantic HTML, keyboard-navigable form,
  reduced-motion support)
- Deploys to **Vercel** (push to GitHub → auto-rebuild)

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in your email key (see below)
npm run dev                         # http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

## The Book a Date form

The form posts to `app/api/book/route.ts`, which emails the booking to the
owner. The email provider is **swappable** via the `EMAIL_PROVIDER` env var:

| Provider     | Set `EMAIL_PROVIDER` to | Keys needed in `.env.local`                |
| ------------ | ----------------------- | ------------------------------------------ |
| Web3Forms ★  | `web3forms` (default)   | `WEB3FORMS_ACCESS_KEY`                      |
| Resend       | `resend`                | `RESEND_API_KEY`, `RESEND_FROM`, `OWNER_EMAIL` |

★ Web3Forms is the simplest — no domain verification. Create a free access key
at <https://web3forms.com> (using Biggy's email) and drop it into `.env.local`.

Keys are read **server-side only** and never reach the browser. See
`.env.local.example` for the full, commented list.

## Editing business content

All business details — name, contact, service area, the six service categories,
the "as seen on" list, event types — live in **`lib/site-config.ts`**. Edit
there and the whole site updates. Items marked `[CONFIRM]` are placeholders
awaiting the owner's confirmation (phone number, email, service area, the
optional dedication to uGogo Lillian on the About page).

## Images

Gallery images live in **`public/images/`** and are referenced by filename in
`lib/gallery.ts`. Several are placeholders cropped from social posts — to swap in
a high-res original, replace the file with the **same filename**; nothing else
changes. Every image has descriptive alt text. No client names appear in the UI
(several photos involve recognisable people whose permission is pending).

The favicon (`app/icon.svg`) is derived from the longhorn / bull mark.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the env vars from `.env.local.example` under
   **Project → Settings → Environment Variables**.
4. Set the production domain and update `siteConfig.url` in `lib/site-config.ts`.
