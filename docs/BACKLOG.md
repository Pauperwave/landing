# Backlog

Lavori committati, con priorità (P1 = bloccante per il lancio, P2 = importante, P3 = nice-to-have).

## P1

- [ ] Sostituire `public/logo.svg`, `public/favicon.ico`, `public/social-card.png` con gli asset reali di Pauperwave.
- [ ] Impostare `NUXT_ADMIN_PASSWORD` di produzione come variabile d'ambiente su Vercel (non usare il valore di sviluppo).
- [ ] Primo deploy su Vercel: progetto collegato al repo, variabili `NUXT_*` e `S3_*`, bucket R2 con chiave API, dominio `pauperwave.org` sul progetto (oggi risponde 404 `DEPLOYMENT_NOT_FOUND`).

## P2

- [ ] Verificare/aggiornare `caniuse-lite` (warning Browserslist in dev) prima del deploy.

## P3

- [ ] Valutare se aggiungere una sezione "chi siamo"/eventi in programma alla home, oltre alla sola galleria.
