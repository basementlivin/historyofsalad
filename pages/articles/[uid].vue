<script setup lang="ts">
import { components } from '~/slices'
import { useArticleSeo } from '~/composables/useArticleSeo';
import type { BlogArticleDocument } from '~/prismicio-types.d.ts'
import { prismicImageSettings } from '@/utils/prismicImageSettings';
import { useRoute } from 'vue-router'

const prismic = usePrismic()
const route = useRoute()

// Fetch the current article
const { data: article } = useAsyncData(`
  articles/${route.params.uid}`,
  () =>
    prismic.client.getByUID<BlogArticleDocument>(
      'blog_article', route.params.uid as string
    ), 
)

useArticleSeo(article)

// Fetch all articles sorted by publication date
const { data: allArticles } = useAsyncData('allArticles', () =>
  prismic.client.getAllByType<BlogArticleDocument>('blog_article', {
    orderings: { field: 'my.blog_article.publication_date', direction: 'asc' },
    fetch: ['blog_article.title', 'blog_article.featured_image'],
  })
)

// Find the current article index and determine next/previous articles
const currentIndex = computed(() => {
  return allArticles.value?.findIndex(a => a.id === article.value?.id)
})

const nextArticle = computed(() => {
  return allArticles.value && currentIndex.value !== undefined && currentIndex.value < allArticles.value.length - 1
    ? allArticles.value[currentIndex.value + 1]
    : null
})

const prevArticle = computed(() => {
  return allArticles.value && currentIndex.value !== undefined && currentIndex.value > 0
    ? allArticles.value[currentIndex.value - 1]
    : null
})

</script>


<template>
  <div>
    <SliceZone
      v-if="article"
      id="main"
      wrapper="main"
      class="page--article"
      :slices="article?.data.slices ?? []"
      :components="components"
    />

    <nav class="article-navigation">
      <PrismicLink
        v-if="prevArticle"
        :field="prevArticle"
        class="prev-article link"
        aria-label="Navigate to the previous article."
      >
        <div class="image">
          <PrismicImage
            :field="prevArticle?.data?.featured_image"
            :alt="prevArticle?.data?.featured_image?.alt || 'No image description provided.'"
            :widths="prismicImageSettings.presets.tiny.widths"
            :imgix-params="prismicImageSettings.presets.tiny.imgixParams"
            loading="lazy"
          />
        </div>
        <div class="details">
          <span class="headline">Previous:</span>
          <span class="title">{{ prevArticle?.data?.title }}</span>
        </div>
      </PrismicLink>

      <PrismicLink
        v-if="nextArticle"
        :field="nextArticle"
        class="next-article link"
        aria-label="Navigate to the next article."
      >
        <div class="image">
          <PrismicImage
            :field="nextArticle?.data?.featured_image"
            :alt="nextArticle?.data?.featured_image?.alt || 'No image description provided.'"
            :widths="prismicImageSettings.presets.tiny.widths"
            :imgix-params="prismicImageSettings.presets.tiny.imgixParams"
            loading="lazy"
          />
        </div>
        <div class="details">
          <span class="headline">Next:</span>
          <span class="title">{{ nextArticle?.data?.title }}</span>
        </div>
      </PrismicLink>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/components/_article-nav.scss';
</style>
