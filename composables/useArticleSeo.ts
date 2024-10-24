import { computed } from 'vue'
import { usePrismic } from '@prismicio/vue'
import type { PrismicDocument } from '@prismicio/types'

export function useArticleSeo(page: Ref<PrismicDocument | null>) {
  const prismic = usePrismic()
  const settings = useSettings()
  const route = useRoute()

  const title = computed(() => page.value?.data.meta_title ?? settings.value?.data.site_title ?? 'History of Salad')
  const description = computed(() => page.value?.data.meta_description ?? settings.value?.data.meta_description ?? '')
  const ogImage = computed(() => {
    const pageImage = prismic.asImageSrc(page.value?.data.meta_image)
    const settingsImage = prismic.asImageSrc(settings.value?.data.og_image)

    return pageImage
      ? { url: pageImage, alt: page.value?.data.meta_image.alt ?? '' }
      : settingsImage
      ? { url: settingsImage, alt: settings.value?.data.og_image.alt ?? '' }
      : { url: '/hos--og.png', alt: 'History of Salad' }
  })

  const ogUrl = computed(() => `https://historyofsalad.com${route.path}`)

  const articleAuthor = computed(() => page.value?.data.author ?? 'History of Salad')
  const articlePublishedTime = computed(() => page.value?.data.publication_date)

  useSeoMeta({
    title,
    description,
    ogImage: ogImage.value,
    ogUrl: ogUrl.value,
    ogSiteName: 'History of Salad',
    articleAuthor: articleAuthor.value,
    articlePublishedTime: articlePublishedTime.value,
  })
}
