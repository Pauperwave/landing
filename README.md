# Pauperwave - Landing

Landing page e galleria foto degli eventi dell'associazione [Pauperwave](https://pauperwave.org), basata su [NuxtHub Blob](https://hub.nuxt.com/docs/blob) (starting point: [nuxt-image-gallery](https://github.com/Flosciante/nuxt-image-gallery)).

## Features

- 📷 Upload e visualizzazione foto tramite [`blob`](https://hub.nuxt.com/docs/blob/usage)
- 🌐 Storage su Cloudflare R2 tramite NuxtHub (driver S3)
- 🔑 Accesso admin protetto da password ([nuxt-auth-utils](https://github.com/Atinux/nuxt-auth-utils)) per caricare le foto dei nuovi eventi

## Stack

- [NuxtHub](https://hub.nuxt.com) - astrazione dello storage blob (filesystem in sviluppo, S3/R2 in produzione)
- [Vercel](https://vercel.com) - hosting; il dominio `pauperwave.org` è già lì
- [Cloudflare R2](https://developers.cloudflare.com/r2/) - storage delle foto, raggiunto dall'API S3
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
- `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_BUCKET`, `S3_REGION` (`auto` per R2), `S3_ENDPOINT` (`https://<account id>.r2.cloudflarestorage.com`, con `.eu.` dopo l'id se il bucket è nella giurisdizione EU, come quello in produzione) - bucket R2 delle foto. Vanno impostate **già alla build** (su Vercel valgono per Build e Runtime): è la loro presenza a far scegliere il driver S3; senza, in produzione il modulo userebbe Vercel Blob. In sviluppo i file stanno in `.data`

## Sviluppo

```bash
pnpm dev
```

In sviluppo le foto si salvano su filesystem (`.data`), senza nessuna variabile S3.

### Deploy

Il sito va su Vercel (collegato al repository, build `pnpm build`), con le variabili d'ambiente sopra. Le foto stanno su un bucket Cloudflare R2, raggiunto con il driver S3 di NuxtHub, scelto in automatico dalle variabili `S3_*`.

Una volta sola, nella dashboard di Cloudflare: creare il bucket, una chiave API R2 con permessi di lettura e scrittura sul bucket, e copiare l'endpoint S3 dell'account.

## Aggiornare le foto degli eventi

1. Accedi al sito con la password admin (pulsante "Accedi" in basso)
2. Trascina/seleziona le nuove foto per caricarle
3. Le foto caricate compaiono subito nella galleria pubblica

## Eliminare più foto insieme

1. Da admin, tocca il pulsante "Seleziona le foto" nel menu in basso
2. Spunta le foto da togliere (o usa "Seleziona tutte")
3. Premi il cestino e conferma nella finestra, che indica quante foto verranno eliminate
