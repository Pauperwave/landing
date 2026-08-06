# Pauperwave - Landing

Landing page e galleria foto degli eventi dell'associazione [Pauperwave](https://pauperwave.org), basata su [NuxtHub Blob](https://hub.nuxt.com/docs/storage/blob) (starting point: [nuxt-image-gallery](https://github.com/Flosciante/nuxt-image-gallery)).

## Features

- 📷 Upload e visualizzazione foto tramite [`hubBlob()`](http://hub.nuxt.com/docs/storage/blob)
- 🌐 Storage su Cloudflare R2 tramite NuxtHub
- 🔑 Accesso admin protetto da password ([nuxt-auth-utils](https://github.com/Atinux/nuxt-auth-utils)) per caricare le foto dei nuovi eventi

## Stack

- [NuxtHub](https://hub.nuxt.com) - toolkit Nuxt per applicazioni fullstack su edge (Cloudflare)
- [NuxtUI v3](https://ui.nuxt.com/getting-started) - libreria UI (Radix Vue + Tailwind CSS v4)
- [Nuxt Fonts](https://github.com/nuxt/fonts)
- [VueUse](https://github.com/antfu/vueuse)
- [ESLint](https://eslint.org/) con [@nuxt/eslint-config](https://github.com/nuxt/eslint)
- [TypeScript](https://www.typescriptlang.org/)

## Setup

1. Installa le dipendenze: `pnpm install`
2. Copia `.env.example` in `.env` e imposta le variabili (vedi sotto)
3. Avvia in locale: `pnpm dev`

> Se non hai pnpm installato: `corepack enable pnpm`

## Variabili d'ambiente

- `NUXT_ADMIN_PASSWORD` - password per accedere al pannello admin e caricare le foto (default `admin` se non impostata, da cambiare in produzione)
- `NUXT_SESSION_PASSWORD` - chiave per la cifratura della sessione, generata automaticamente in dev se non presente

## Sviluppo

```bash
pnpm dev
```

### Storage remoto

Dopo il deploy, per collegarsi in locale allo storage remoto:

```bash
pnpm dev --remote
```

### Deploy

Deploy su Cloudflare tramite NuxtHub:

```bash
npx nuxthub deploy
```

Maggiori dettagli su https://hub.nuxt.com/docs/getting-started/deploy

## Aggiornare le foto degli eventi

1. Accedi al sito con la password admin (pulsante "Accedi" in basso)
2. Trascina/seleziona le nuove foto per caricarle
3. Le foto caricate compaiono subito nella galleria pubblica
