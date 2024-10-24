<script setup lang="ts">
import { components } from '~/slices'
import { usePrismic } from '@prismicio/vue'
import { usePageSeo } from '~/composables/usePageSeo'

const prismic = usePrismic()
const route = useRoute()

const { data: page, error } = useAsyncData('aboutPage', () => 
  prismic.client.getSingle('about'))

if (error.value) {
  console.error('Error value from useAsyncData:', error.value)
}

usePageSeo(page)
</script>

<template>
  <main 
    id="main"
    :key="route.fullPath"
    class="page--about"
  >
    <div class="about__intro wrapper wrapper--narrow">
      <h1 class="headline">
        {{ page?.data.headline }}
      </h1>
      <span class="subheadline">
        {{ page?.data.subheadline }}
      </span>
      <PrismicRichText
        :field="page?.data.copy"
        class="copy"
      />
    </div>
    <SliceZone
      :slices="page?.data.slices ?? []"
      :components="components"
    />
  </main>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/pages/_about.scss';
</style>