import type { CaseStudy } from './types'

export const getnif: CaseStudy = {
  slug: 'getnif',
  title: 'GetNIF Portugal',
  pitch: 'SaaS platform for obtaining a Portuguese tax ID remotely — no Portugal visit required.',
  status: 'WIP',
  liveUrl: 'https://nif-saas-nextjs16.vercel.app/en',
  tags: ['Next.js 16', 'Supabase', 'Stripe', 'Resend', 'i18n'],
  screenshot: '/images/getNifPortugal.png',
  screenshotAlt: 'Screenshot of GetNIF Portugal platform',
  problem: {
    summary:
      'Non-residents need a Portuguese NIF to buy property, open a bank account, or sign a rental contract — but the standard process requires physically visiting Finanças in Portugal. The platform removes that requirement: users pay, upload documents, and a fiscal representative handles the submission.',
    constraints: [
      'No API for Finanças — the submission to the tax authority is entirely manual by design',
      'Payment must be confirmed before any document processing begins',
      'Documents contain PII — storage, access, and transmission must be controlled at every step',
      'Users across three countries and three languages (EN / PT / FR)',
    ],
  },
  architectureDiagram: '/images/nif_architecture_svg.svg',
  architectureCaption:
    'Four-layer architecture: UI → Server Actions → Repositories → PostgreSQL. A separate Services layer handles email and payments with no framework imports, making both callable from Server Actions and the Stripe webhook handler alike.',
  architecturePoints: [
    'Components never touch the database directly — prevents scattered queries and missed security checks',
    'Repositories are the single source of truth for all queries — change a query once, every caller benefits',
    'Services are pure functions with no Next.js imports — the same email or payment logic works in a Server Action and in the Stripe webhook handler without modification',
    'Drizzle ORM keeps TypeScript types and the schema in sync — rename a column and every callsite shows a compile error, not a runtime bug in production',
  ],
  challenges: [
    {
      title: 'Stripe webhooks can arrive more than once',
      description:
        "Stripe's delivery guarantee is at-least-once, not exactly-once. Under concurrent Vercel invocations, two workers could receive the same `checkout.session.completed` event simultaneously and both attempt to confirm the same order — doubling emails and corrupting order state.",
      points: [
        'The Stripe redirect URL cannot be trusted — anyone can visit a success URL manually. The webhook is signed by Stripe\'s servers and is the only reliable confirmation of payment',
        'The handler verifies the Stripe signature first — unsigned or tampered requests are rejected before any database work happens',
        'Idempotency guard: an atomic insert with ON CONFLICT DO NOTHING returns 0 rows if another worker already claimed the event — exit immediately',
        'Status guard: the order must still be pending_payment before any transition fires — catches any duplicate that slips past the first guard',
        'Amount validation: the amount paid is compared against the expected price map — any mismatch halts the handler rather than confirming a discounted order',
      ],
      resolution:
        'Two independent guards in sequence. First: an atomic `INSERT INTO processed_webhook_events ON CONFLICT DO NOTHING` — if it returns 0 rows, the event was already handled, exit immediately. Second: a status guard — the order must still be `pending_payment` before any transition fires. This catches anything that slips past the first guard.',
      diagram: '/images/nif_payment_svg.svg',
    },
    {
      title: 'Gemini cannot access private Supabase URLs',
      description:
        'Documents are stored in a private Supabase Storage bucket. Passing the storage URL directly to the Gemini API fails — Gemini is an external Google service with no Supabase credentials, so every request returns a 403.',
      points: [
        'A 120-second signed download URL is generated via the admin Supabase client, which bypasses RLS — safe for internal server operations, never exposed to the browser',
        'The server downloads the file bytes and sends them as base64 — Gemini receives the content directly, with no dependency on Supabase credentials',
        'Gemini returns structured JSON: is the document type correct? does the name match? is it expired? are there visible issues?',
        'The result — approved, flagged, or error — is saved per document; flagged and errored documents are queued for manual admin review',
        'Soft-failure design: any error — network, bad JSON, missing API key — saves an error status instead of throwing, so a Gemini outage never blocks customers from submitting',
      ],
      resolution:
        'The server generates a 120-second signed download URL via the admin Supabase client (which bypasses RLS), downloads the file bytes server-side, and forwards them as base64. Every failure path in the AI service returns `status: "error"` instead of throwing — a Gemini outage never blocks document submission.',
      diagram: '/images/nif_gemini_svg.svg',
    },
  ],
  decisions: [
    {
      chosen: 'Route Handler for the Stripe webhook, not a Server Action',
      alternatives: ['Server Action'],
      rationale:
        'Server Actions are invoked by your own frontend over a secure internal channel. A webhook is a raw HTTP POST from an external service — Stripe, not your browser. Only a Route Handler can receive a raw request body and verify the `Stripe-Signature` header. Using a Server Action here would make it impossible to authenticate the request origin.',
    },
    {
      chosen: 'Supabase for auth, database, storage, and realtime',
      alternatives: ['Auth0 + PlanetScale + S3 + Pusher'],
      rationale:
        'Early-stage product with one developer. Supabase bundles four services under one SDK and one billing account, which eliminates integration overhead. The trade-off is vendor concentration — a Supabase outage affects everything simultaneously. Acceptable at this stage; each concern is isolated in its own module, so the database layer could be swapped later.',
    },
    {
      chosen: 'Subscribe to `status_updates` INSERTs for Realtime, not `orders` UPDATEs',
      alternatives: ['Subscribe to `orders` table updates'],
      rationale:
        'The `orders` table is updated for many reasons — Stripe session IDs, timestamps, amounts — most of which are irrelevant to the customer dashboard. Subscribing to it fires constant noise. `status_updates` is an append-only audit log built regardless of Realtime. The live update is a free side effect: one INSERT triggers both the audit trail and the WebSocket push to connected browsers.',
    },
    {
      chosen: 'Direct upload via signed URL, not server-proxied',
      alternatives: ['Proxy files through the Next.js server'],
      rationale:
        'Proxying large files through the server consumes memory and egress bandwidth on every upload request. With a signed URL, Supabase issues a time-limited token directly to the browser, which uploads without the file bytes ever touching the app server. The server validates file type and size before issuing the URL and records only the storage path after.',
    },
  ],
  reflection:
    "I'd write automated tests for the Stripe webhook handler before shipping — it's the most critical path and currently has no safety net. I'd also define the order state machine explicitly before writing any code. Several edge cases only became visible mid-build: what happens if documents were already uploaded before payment? What if the NIF number write succeeds but the status update fails? A proper state diagram upfront would have surfaced these transitions before they became bugs.",
}
