# Storia del progetto

Documento vivo: decisioni prese e perché, in ordine cronologico. Per il changelog grezzo vedi [CHANGELOG.md](CHANGELOG.md).

## 2026-10-11 — Hosting su Vercel, foto su R2

**Contesto:** il dominio `pauperwave.org` ha i nameserver di Vercel (`ns1/ns2.vercel-dns.com`) e l'apex risponde `DEPLOYMENT_NOT_FOUND`. La landing era pensata per NuxtHub su Cloudflare, ma non è mai stata pubblicata. Cloudflare Pages vuole i nameserver di Cloudflare per un dominio apex, e spostarli avrebbe toccato anche blog e app, che stanno su Vercel.

**Decisione:** la landing va su Vercel, sull'apex; le foto restano su Cloudflare R2, raggiunto con il driver S3 di NuxtHub (`hub.blob: true`: il modulo sceglie S3 quando le variabili `S3_*` sono presenti alla build, prima di Vercel Blob). In sviluppo lo storage è il filesystem (`.data`).

**Cambiamenti:**
- `@nuxthub/core` 0.9 → 0.10.8 (aggiunto `aws4fetch`); `hubBlob()` è diventato `blob` (auto-importato lato server) e il tipo `BlobObject` si importa da `@nuxthub/core/blob`.
- Rimossi `wrangler` e gli script `deploy`, `logs`, `logs:preview` (CLI `nuxthub`, dismessa nella 0.10).
- Nuove variabili `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_BUCKET`, `S3_REGION`, `S3_ENDPOINT` (vedi `.env.example`).

**Conseguenza:** il passaggio su `blob` e il driver S3 non sono stati provati contro un bucket R2 reale; la prima cosa da fare al primo deploy è caricare e rileggere una foto.

## 2026-08-05 — Bootstrap dal template nuxt-image-gallery

Il repo `pauperwave-landing` partiva vuoto (solo un README.md vuoto). È stato bootstrappato clonando [Flosciante/nuxt-image-gallery](https://github.com/Flosciante/nuxt-image-gallery), uno starter NuxtHub per gallerie immagini con upload, storage su Cloudflare R2 e autenticazione admin.

**Decisioni:**
- Approccio minimale: mantenuti solo galleria, upload drag&drop, login admin via password, navigazione dettaglio immagine (prev/next/download).
- Rimossi filtri immagine (contrast/blur/saturate/ecc.), magnifier e relativo canvas-based save-as-new-image: complessità non necessaria per una galleria eventi che si limita a mostrare foto già pronte.
- Rimosse le dipendenze `vue-advanced-cropper` e `@iconify-json/simple-icons`, non più utilizzate dopo la rimozione dei filtri.
- Mantenuto Cloudflare/NuxtHub come hosting e storage (R2 via `hubBlob()`), riusando l'infrastruttura zero-config del template.
- Mantenuto l'accesso upload protetto da singola password admin (`NUXT_ADMIN_PASSWORD`), non un vero sistema multi-utente: adeguato per un'associazione con pochi organizzatori che caricano foto.
- Testi/branding tradotti in italiano, meta SEO aggiornati per pauperwave.org.

**Da fare (vedi [BACKLOG.md](BACKLOG.md)):**
- Sostituire logo/favicon/social-card placeholder con asset reali di Pauperwave.
- Impostare `NUXT_ADMIN_PASSWORD` di produzione come secret Cloudflare al primo deploy.
- Primo deploy su NuxtHub.
