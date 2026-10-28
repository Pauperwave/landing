<script setup lang="ts">
const { t } = useI18n()

useSeoHead({
  title: () => t('sites.title'),
  description: () => t('sites.description')
})

// `key` names the texts of the site in sites.items; hosts that redirect into the management app
// are in HOST_ROUTE_MAP of the app project
const sites = [
  { host: 'blog.pauperwave.org', key: 'blog' },
  { host: 'choose.pauperwave.org', key: 'choose' },
  { host: 'mtgo.pauperwave.org', key: 'mtgo' },
  { host: 'calendario.pauperwave.org', key: 'calendar' },
  { host: 'tesseramento.pauperwave.org', key: 'membership' },
  { host: 'cittadino.pauperwave.org', key: 'cityChampionship' },
  { host: 'pauper.pauperwave.org', key: 'pauperRanking' },
  { host: 'edh.pauperwave.org', key: 'edhRanking' },
  { host: 'premodern.pauperwave.org', key: 'premodernRanking' },
  { host: 'app.pauperwave.org', key: 'management' }
]
</script>

<template>
  <main class="mx-auto w-full max-w-2xl px-4 py-12 text-white">
    <h1 class="text-2xl font-bold">
      {{ t('sites.heading') }}
    </h1>
    <p class="mt-2 text-sm text-muted">
      {{ t('sites.intro') }}
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
          <span class="font-medium sm:w-56 sm:shrink-0">{{ t(`sites.items.${site.key}.name`) }}</span>
          <span class="text-sm text-muted">{{ t(`sites.items.${site.key}.description`) }}</span>
          <span class="font-mono text-xs text-dimmed sm:ml-auto">{{ site.host }}</span>
        </ULink>
      </li>
    </ul>
  </main>
</template>
