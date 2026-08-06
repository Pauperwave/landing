# Convenzioni per agenti AI

Linee guida per chi (umano o agente) lavora su questo repo.

## Stack

Nuxt 4 + NuxtHub (Cloudflare/R2) + Nuxt UI v3 (Tailwind v4) + TypeScript. Vedi [architecture/overview.md](architecture/overview.md).

## Convenzioni

- Props Vue: interfaccia + destructure diretto con default inline (no `withDefaults`), vedi esempi nel codice esistente (`app/components/`).
- ESLint: single quotes, no semicolons (`eslint.config.mjs`), zero warning tollerato.
- Lingua UI: italiano (il sito è rivolto ai soci/visitatori di Pauperwave).
- Non introdurre dipendenze/astrazioni non necessarie: il progetto è volutamente minimale (galleria + upload admin, nient'altro).

## Prima di aprire una PR

- `pnpm lint` e `pnpm typecheck` puliti.
- Verificare manualmente in `pnpm dev` che galleria, upload e login admin funzionino ancora.
