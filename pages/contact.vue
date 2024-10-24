<script setup lang="ts">
import { ref } from 'vue'
import { usePrismic } from '@prismicio/vue'
import { usePageSeo } from '~/composables/usePageSeo'

const prismic = usePrismic()
const route = useRoute()

const { data: page, error } = useAsyncData('contactPage', () => 
  prismic.client.getSingle('contact'))

if (error.value) {
  console.error('Error value from useAsyncData:', error.value)
}

const tooltipText = ref('')

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text).then(() => {
    tooltipText.value = 'Email copied!'
    setTimeout(() => {
      tooltipText.value = 'Click to copy email.'
    }, 2750)
  }).catch(err => {
    console.error('Failed to copy text: ', err)
  })
}

const showHoverText = () => {
  tooltipText.value = 'Click to copy email.'
}

const hideHoverText = () => {
  tooltipText.value = ''
}

const handleKeydown = (event: KeyboardEvent, text: string) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    copyToClipboard(text)
  }
}

usePageSeo(page)
</script>

<template>
  <main
    id="main"
    class="page--contact"
  >
    <section class="contact__intro wrapper wrapper--narrow">
      <h1 class="headline">
        {{ page?.data.headline }}
      </h1>
      <PrismicRichText
        :field="page?.data.copy"
        class="copy"
      />
      <span
        class="link tooltip-container"
        aria-label="Click to copy email address to your clipboard"
        tabindex="0"
        @click.prevent="copyToClipboard(page?.data.contact_link[0]?.email ?? '')"
        @mouseover="showHoverText"
        @mouseleave="hideHoverText"
        @focus="showHoverText"
        @blur="hideHoverText"
        @keydown="handleKeydown($event, page?.data.contact_link[0]?.email ?? '')"
      >
        {{ page?.data.contact_link[0]?.link_text }}
        <span
          v-if="tooltipText"
          class="tooltip"
        >
          {{ tooltipText }}
        </span>
      </span>
    </section>
  </main>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/pages/_contact.scss';
</style>