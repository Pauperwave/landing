import type { MaybeRefOrGetter } from 'vue'

// The title and description of a page, repeated for Open Graph and Twitter, and an optional sharing image
export function useSeoHead(options: {
  title: MaybeRefOrGetter<string | undefined>
  description: MaybeRefOrGetter<string | undefined>
  image?: MaybeRefOrGetter<string | undefined>
  imageAlt?: MaybeRefOrGetter<string | undefined>
}) {
  const { title, description, image, imageAlt } = options

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: image,
    ogImageAlt: imageAlt,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    twitterImageAlt: imageAlt
  })
}
