# Backlog

Lavori committati, con priorità (P1 = bloccante per il lancio, P2 = importante, P3 = nice-to-have).

## P1

- [ ] Sostituire `public/logo.svg`, `public/favicon.ico`, `public/social-card.png` con gli asset reali di Pauperwave.
- [x] Impostare `NUXT_ADMIN_PASSWORD` di produzione come variabile d'ambiente su Vercel (non usare il valore di sviluppo). Fatto il 2026-10-28.
- [x] Primo deploy su Vercel: progetto collegato al repo, variabili `NUXT_*` e `S3_*`, bucket R2 con chiave API, dominio sul progetto. Fatto il 2026-10-28 su `photos.pauperwave.org`; vedi [PROGRESS.md](PROGRESS.md).
- [ ] Provare il caricamento di una foto come admin e rileggerla dalla galleria (il driver S3 è collegato al bucket, ma la scrittura non è ancora verificata).
- [ ] Decidere se il sito deve stare anche sull'apex `pauperwave.org` (oggi risponde 404 `DEPLOYMENT_NOT_FOUND`) o restare su `photos.pauperwave.org`.

## P2

- [ ] Verificare/aggiornare `caniuse-lite` (warning Browserslist in dev) prima del deploy.

## P3

- [ ] Valutare se aggiungere una sezione "chi siamo"/eventi in programma alla home, oltre alla sola galleria.
