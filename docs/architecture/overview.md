# Overview architettura

## Stack

- **Nuxt 4** (Vue 3) — framework fullstack
- **NuxtHub** — deploy edge su Cloudflare, storage blob (`hubBlob()`) su Cloudflare R2
- **Nuxt UI v3** — componenti UI (Radix Vue + Tailwind CSS v4)
- **nuxt-auth-utils** — sessione cifrata, autenticazione admin a singola password

## Flusso principale

1. `app/app.vue` carica le immagini all'avvio (`useFile().getImages()`) e monta `NuxtPage` + `ImageThumbnailList`.
2. `app/pages/index.vue` mostra `ImageGallery.vue`: griglia masonry delle immagini, drag&drop/upload (solo se loggati), login modale.
3. `app/pages/detail/[...slug].vue` mostra `ImageDetail.vue`: immagine singola con navigazione prev/next (tastiera, swipe touch), download, apertura originale in nuova tab.
4. Upload e cancellazione immagini passano da `app/composables/useFile.ts` → `app/plugins/files.ts` (plugin che espone `$file`) → `server/api/images/` (endpoint NuxtHub Blob).
5. Login admin: `app/components/LoginForm.vue` → `POST /server/api/auth.post.ts`, verifica contro `NUXT_ADMIN_PASSWORD`, crea sessione via `nuxt-auth-utils`.

## Cosa NON c'è (rimosso rispetto al template originale)

Il template di partenza ([nuxt-image-gallery](https://github.com/Flosciante/nuxt-image-gallery)) includeva filtri immagine (contrast/blur/saturate/sepia/hue-rotate), un magnifier e il salvataggio dell'immagine filtrata come nuovo file. Queste funzionalità sono state rimosse: la galleria Pauperwave mostra solo le foto già pronte degli eventi, senza editing in-app. Vedi [../PROGRESS.md](../PROGRESS.md) per il razionale.

## Autenticazione

Sistema a singola password condivisa (`NUXT_ADMIN_PASSWORD`), non multi-utente. Adeguato per un piccolo gruppo di organizzatori che caricano foto; non adatto se in futuro servissero permessi differenziati per persona.
