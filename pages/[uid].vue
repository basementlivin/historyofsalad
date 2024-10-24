<script setup lang="ts">
import { components } from '~/slices'
import { usePageSeo } from '~/composables/usePageSeo'

const prismic = usePrismic()
const route = useRoute()

const { data: page } = useAsyncData(route.params.uid as string, () =>
  prismic.client.getByUID('page', route.params.uid as string, {
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
