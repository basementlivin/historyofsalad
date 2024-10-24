<script setup lang="ts">
import { ref } from 'vue'
import { usePrismic } from '@prismicio/vue'
import * as prismic from '@prismicio/client'
import { prismicImageSettings } from '@/utils/prismicImageSettings';

const emit = defineEmits(['close-search-modal'])

const searchQuery = ref('')
const results = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const prismicClient = usePrismic().client

const onSearch = async () => {
  if (searchQuery.value.trim().length < 3) {
    results.value = []
    return
  }

  loading.value = true
  error.value = null

  try {
    // Search in Ask Jelly Articles
    const askJellyResults = await prismicClient.get({
      predicates: [
        prismic.filter.at('document.type', 'ask_jelly_article'),
        prismic.filter.fulltext('document', searchQuery.value)
      ],
    })

    // Search in Jelly Loves Articles
    const jellyLovesResults = await prismicClient.get({
      predicates: [
        prismic.filter.at('document.type', 'jelly_loves_article'),
        prismic.filter.fulltext('document', searchQuery.value)
      ],
    })

    // Search in Blog Articles
    const blogArticleResults = await prismicClient.get({
      predicates: [
        prismic.filter.at('document.type', 'blog_article'),
        prismic.filter.fulltext('document', searchQuery.value)
      ],
    })

    results.value = [...askJellyResults.results, ...jellyLovesResults.results, ...blogArticleResults.results]
  } catch (err) {
    error.value = 'An error occurred while searching.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="search-component">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search articles..."
      class="search-input h3"
      @input="onSearch"
    >
    <div
      v-if="loading"
      class="loading"
    >
      Searching...
    </div>
    <div v-if="error">
      {{ error }}
    </div>
    <ul
      v-if="results.length"
      class="search-results"
    >
      <li
        v-for="(result, index) in results"
        :key="result.id"
        class="result"
      >
        <NuxtLink
          :to="`/${result.type === 'ask_jelly_article' ? 'ask-jelly' : result.type === 'jelly_loves_article' ? 'jelly-loves' : 'articles'}/${result.uid}`"
          class="link--no-underline"
          :aria-labelledby="`result__title--${index}`"
          @click="emit('close-search-modal')"
        >
          <div
            :class="{
              'image': true,
              'image--ask-jelly': result.type === 'ask_jelly_article',
              'image--blog': result.type === 'blog_article' || result.type === 'jelly_loves_article'
            }"
          >
            <PrismicImage
              :field="result.data.featured_image"
              :alt="result.data.featured_image.alt || 'No image description provided'"
              :widths="prismicImageSettings.presets.tiny.widths"
              :imgix-params="prismicImageSettings.presets.tiny.imgixParams"
              loading="lazy"
            />
          </div>
          <span
            :id="`result__title--${index}`"
            class="title"
          >
            {{ result.data.title }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/components/_search.scss';
</style>