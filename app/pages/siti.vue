<script setup lang="ts">
useSeoHead({
  title: 'Siti Pauperwave',
  description: 'Tutti i siti e gli strumenti dell\'associazione Pauperwave.'
})

interface Site {
  host: string
  name: string
  description: string
}

// Hosts that redirect into the management app are in HOST_ROUTE_MAP of the app project
const sites: Site[] = [
  { host: 'blog.pauperwave.org', name: 'Blog', description: 'Articoli, decklist e report sul formato Pauper.' },
  { host: 'choose.pauperwave.org', name: 'Choose a Commander', description: 'Tutti i comandanti legali in Commander, con filtri e statistiche.' },
  { host: 'mtgo.pauperwave.org', name: 'Pauper Deck Normalizer', description: 'Converte le liste da MTGO al formato del blog.' },
  { host: 'calendario.pauperwave.org', name: 'Calendario', description: 'Gli eventi dell\'associazione, con file ICS da aggiungere al calendario.' },
  { host: 'tesseramento.pauperwave.org', name: 'Tesseramento', description: 'Il modulo per associarsi a Pauperwave.' },
  { host: 'cittadino.pauperwave.org', name: 'Campionato Cittadino', description: 'La classifica del Campionato Cittadino.' },
  { host: 'pauper.pauperwave.org', name: 'Classifica Pauper', description: 'La classifica del formato Pauper.' },
  { host: 'edh.pauperwave.org', name: 'Classifica EDH', description: 'La classifica del formato Commander (EDH).' },
  { host: 'premodern.pauperwave.org', name: 'Classifica Premodern', description: 'La classifica del formato Premodern.' },
  { host: 'app.pauperwave.org', name: 'Gestionale', description: 'L\'area riservata dei soci (richiede l\'accesso).' }
]
</script>

<template>
  <main class="mx-auto w-full max-w-2xl px-4 py-12 text-white">
    <h1 class="text-2xl font-bold">
      I siti di Pauperwave
    </h1>
    <p class="mt-2 text-sm text-muted">
      Tutti gli indirizzi dell'associazione, in un posto solo.
    </p>

    <ul class="mt-8 divide-y divide-white/10 rounded-lg border border-white/10">
      <li
        v-for="site in sites"
        :key="site.host"
      >
        <ULink
          :to="`https://${site.host}`"
          class="flex flex-col gap-0.5 px-4 py-3 transition-colors hover:bg-white/5 sm:flex-row sm:items-baseline sm:gap-4"
        >
          <span class="font-medium sm:w-56 sm:shrink-0">{{ site.name }}</span>
          <span class="text-sm text-muted">{{ site.description }}</span>
          <span class="font-mono text-xs text-dimmed sm:ml-auto">{{ site.host }}</span>
        </ULink>
      </li>
    </ul>

    <footer class="mt-8 text-xs text-dimmed">
      <VersionBadge />
    </footer>
  </main>
</template>
