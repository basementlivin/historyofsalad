<script setup lang="ts">
import { components } from '~/slices'
import { usePageSeo } from '~/composables/usePageSeo'
const prismic = usePrismic()
const route = useRoute()

const { data: page } = useAsyncData('index', () =>
  prismic.client.getByUID('page', 'home', {
    fetchLinks: [
    ]
  })
)
usePageSeo(page)
</script>

<template>
  <SliceZone
    id="main"
    wrapper="main"
    :slices="page?.data.slices ?? []"
    :components="components"
  />
</template>