# Storia del progetto

Documento vivo: decisioni prese e perché, in ordine cronologico. Per il changelog grezzo vedi [CHANGELOG.md](CHANGELOG.md).

## 2026-10-28 — Primo deploy su Vercel, su photos.pauperwave.org

**Decisione:** un problema alla volta. Il sito parte su un sottodominio, `photos.pauperwave.org`, che si aggiunge al progetto Vercel senza toccare il DNS (già su Vercel). L'apex `pauperwave.org` resta da decidere. Il sito resta su Vercel; Cloudflare serve solo per R2.

**Cosa è stato configurato** (progetto Vercel `landing`, ambiente Production; i valori non stanno nel repository):
- Bucket R2 `pauperwave-photos` nella **giurisdizione EU**: per questo `S3_ENDPOINT` ha la forma `https://<account id>.eu.r2.cloudflarestorage.com`, con `.eu.`.
- `S3_ACCESS_KEY_ID` e `S3_SECRET_ACCESS_KEY`: Access Key ID e Secret Access Key di un token API *Account* di R2 con permesso **Object Read & Write**, limitato al solo bucket. Si creano dalla pagina R2 (*API Tokens → Manage*), non da *My Profile*, e il segreto compare una sola volta.
- `S3_ENDPOINT`, `S3_BUCKET` (`pauperwave-photos`), `S3_REGION` (`auto`).
- `NUXT_SESSION_PASSWORD`: stringa casuale generata per l'occasione, salvata come variabile sensibile; nessuno la conosce, non serve digitarla.
- `NUXT_ADMIN_PASSWORD`: scelta dal proprietario del sito. Se manca, il sito usa `admin`.
- `site.url` in `nuxt.config.ts` passa da `https://pauperwave.org/` a `https://photos.pauperwave.org/`: con `redirectToCanonicalSiteUrl` attivo, altrimenti ogni visita al sottodominio veniva rimandata all'apex (che risponde 404).

**Cosa è andato storto:** il primo deploy è stato costruito senza le variabili `S3_*`, quindi NuxtHub ha scelto il driver Vercel Blob, il cui pacchetto (`@vercel/blob`) non è installato: `/api/images` rispondeva 500. Le variabili devono esserci **alla build**; dopo averle aggiunte serve un nuovo deploy.

**Esito:** dopo il secondo deploy il sito risponde 200 senza reindirizzamenti e `/api/images` restituisce una lista vuota, quindi la connessione S3 al bucket funziona. Il caricamento di una foto come admin e la sua rilettura non sono ancora stati provati.

## 2026-10-28 — Caricamento di più foto con una modale di anteprima

**Richiesta:** poter scegliere o rilasciare più foto insieme, vederne l'anteprima ridotta e caricarle in serie, invece di una alla volta.

**Come funziona:**
- Il selettore file accetta più file (`multiple`) e la zona di rilascio li prende tutti. Solo l'admin autenticato mette in coda le foto.
- Si apre `UploadModal` (Nuxt UI `UModal`). Le foto vengono ridotte una alla volta (`prepareImageForUpload`), e ogni riga mostra miniatura, peso originale → peso ridotto con la percentuale risparmiata, e lo stato.
- Il caricamento parte solo con il pulsante "Carica N foto": prima di allora si può togliere una foto dall'elenco. Una foto ancora sopra i 4 MiB dopo la riduzione è segnata come errore e non viene inviata.
- Il caricamento è **una richiesta per foto**, in serie. Il flag `multiple` di NuxtHub resta `false` (client e server): con `true`, `useUpload` metterebbe tutti i file nello stesso corpo, e Vercel lo rifiuta oltre 4,5 MB.
- Se una foto fallisce, le altre continuano e la sua riga mostra l'errore.

**Componenti** (`app/components/upload/`, nome = cartella + file): `Modal`, `List`, `Item`, `Thumbnail`, `Savings`, `Status`, `Actions`. La logica sta in `app/composables/useUploadQueue.ts`; il formato dei pesi e la percentuale in `app/utils/fileSize.ts`, con test.

**Icone:** da Heroicons a Lucide (`@iconify-json/lucide`). Tutti i nomi sono in `app/utils/icons.ts` (`ICONS`), scritti per intero; `nuxt.config.ts` fa leggere anche i file `.ts` alla scansione di Nuxt Icon, altrimenti non finirebbero nel pacchetto client.

**Non verificato:** il comportamento nel browser (anteprime, riduzione, caricamento in serie) non ha test automatici; va provato con il sito online.

## 2026-10-28 — Foto ridotte nel browser (limite di 4,5 MB di Vercel)

**Problema:** molte foto caricate dal pannello admin davano `413`. Il browser invia il file con un'unica richiesta `POST /api/images/upload` a una Vercel Function, e Vercel respinge i corpi oltre **4,5 MB** (`FUNCTION_PAYLOAD_TOO_LARGE`, documentazione *Vercel Functions Limits*) prima di avviare la funzione. Il limite di 8 MB in `upload.post.ts` non conta, perché il rifiuto avviene prima.

**Decisione:** ridurre la foto nel browser prima dell'invio (`app/utils/imageUpload.ts`, usata da `app/plugins/files.ts`): lato lungo massimo 2560 px, ricodifica in WebP con qualità 0,85. In Safari, che non codifica WebP, si ripiega su JPEG. GIF e formati che il browser non decodifica (per esempio HEIC fuori da Safari) partono invariati. Se la copia ridotta non è più piccola dell'originale, si invia l'originale.

**Alternative scartate:**
- Caricamento a pezzi di NuxtHub: i pezzi predefiniti sono da 10 MiB, sopra il limite di Vercel.
- Caricamento diretto su R2 con indirizzo firmato (la guida Vercel sul limite consiglia di non far passare i file dalla funzione): tiene i 8 MB, ma richiede un endpoint che firma e la regola CORS sul bucket. Da riprendere solo se servono file grandi anche dopo la riduzione.

**Test:** `fitWithin`, il calcolo delle dimensioni, ha test unitari (`pnpm test`; la configurazione `vitest.config.ts` è nuova). La parte che usa canvas e `createImageBitmap` non è coperta dai test e va verificata nel browser.

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
