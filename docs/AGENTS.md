# Convenzioni per agenti AI

Linee guida per chi (umano o agente) lavora su questo repo.

## Stack

Nuxt 4 + NuxtHub 0.10 (blob su Cloudflare R2 via S3) su Vercel + Nuxt UI v3 (Tailwind v4) + TypeScript. Vedi [architecture/overview.md](architecture/overview.md).

## Convenzioni

- Props Vue: interfaccia + destructure diretto con default inline (no `withDefaults`), vedi esempi nel codice esistente (`app/components/`).
- ESLint: single quotes, no semicolons (`eslint.config.mjs`), zero warning tollerato.
- Icone: Lucide. Ogni nome sta in `app/utils/icons.ts` (`ICONS.trash`, mai un `i-lucide-trash-2` scritto nei componenti); un'icona da sola su un bottone ha un `aria-label`, accanto a un testo ha `aria-hidden`.
- Validazione degli schemi: Valibot (`import * as v from 'valibot'`), mai Zod. Con h3 si passa `v.parser(schema)` a `getValidatedRouterParams` (vedi `server/api/images/[pathname].get.ts`).
- Lingua UI: italiano (il sito è rivolto ai soci/visitatori di Pauperwave).
- Messaggi di commit: il soggetto è `<tipo>(<ambito>)?: <emoji> <descrizione>`, per esempio `feat(upload): ✨ shrink photos in the browser before uploading`. L'hook `.githooks/commit-msg` (copiato da `app`, attivato da `postinstall` con `git config core.hooksPath .githooks`) rifiuta tutto ciò che non rispetta il formato. Tipi: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `chore`, `ci`, `revert`. L'emoji è una qualsiasi [gitmoji](https://gitmoji.dev/), scelta per la sfumatura e non legata al tipo; una modifica che rompe la compatibilità aggiunge `!` e usa 💥. L'ambito è facoltativo e indica l'area (`upload`, `deploy`, `docs`, `tooling`, ...). I messaggi sono in inglese: il soggetto dice cosa cambia dal punto di vista di chi usa il sito, il corpo (facoltativo) dice il perché. I commit fino al 2026-10-28 sono in italiano e non seguono il formato.
- Non introdurre dipendenze/astrazioni non necessarie: il progetto è volutamente minimale (galleria + upload admin, nient'altro).

## Prima di aprire una PR

- `pnpm lint` e `pnpm typecheck` puliti.
- Verificare manualmente in `pnpm dev` che galleria, upload e login admin funzionino ancora.
