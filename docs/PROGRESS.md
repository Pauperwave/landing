# Storia del progetto

Documento vivo: decisioni prese e perché, in ordine cronologico. Per il changelog grezzo vedi [CHANGELOG.md](CHANGELOG.md).

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
