<script setup lang="ts">
import { computed } from 'vue'
import { type Content } from '@prismicio/client'
import { isFilled } from '@prismicio/client'
import { prismicImageSettings } from '@/utils/prismicImageSettings';

const props = defineProps(getSliceComponentProps<Content.TextSlice>(
  ['slice', 'index', 'slices', 'context']
));

function isCopyWithPullQuote(slice: Content.TextSlice): slice is Content.TextSlice & { primary: { pull_quote_position: string } } {
  return slice.variation === 'copyWithPullQuote'
}

const pullQuoteClass = computed(() => {
  if (isCopyWithPullQuote(props.slice)) {
    const position = props.slice.primary.pull_quote_position
    return position === 'Quote Right' ? 'quote--right' : 'quote--left'
  }
  return ''
})

function getStickerFileName(selection: string | null): string {
  switch (selection) {
    case 'Pink Flower': return 'sticker_01.webp';
    case 'Yellow Flower': return 'sticker_02.webp';
    case 'Blue Flower': return 'sticker_03.webp';
    case 'Green Flower': return 'sticker_04.webp';
    case 'Blue Star': return 'sticker_05.webp';
    case 'Red Star': return 'sticker_06.webp';
    case 'Green Star': return 'sticker_07.webp';
    default: return '';
  }
}

function getPositionClass(position: string | null): string {
  switch (position) {
    case 'Top': return 'top';
    case 'Middle': return 'middle';
    case 'Bottom': return 'bottom';
    default: return '';
  }
}
</script>

<template>
  <section
    v-if="slice.variation === 'default'"
    class="copy wrapper wrapper--narrow"
  >
    <PrismicRichText
      v-if="isFilled.richText(slice.primary.copy)"
      :field="slice.primary.copy"
      class="copy__inner"
    />
  </section>

  <section
    v-else-if="slice.variation === 'pullQuote'"
    class="article-pull-quote wrapper wrapper--page-width"
  >
    <div
      :class="['illustration__left', getPositionClass(slice.primary.illustration_left_position)]"
    >
      <img
        v-if="getStickerFileName(slice.primary.illustration_left)"
        :src="`/stickers/${getStickerFileName(slice.primary.illustration_left)}`"
        :alt="slice.primary.illustration_left || 'Sticker'"
      >
    </div>

    <blockquote
      v-if="isFilled.keyText(slice.primary.pull_quote)"
      class="quote"
    >
      "{{ slice.primary.pull_quote }}"
    </blockquote>

    <div
      :class="['illustration__right', getPositionClass(slice.primary.illustration_right_position)]"
    >
      <img
        v-if="getStickerFileName(slice.primary.illustration_right)"
        :src="`/stickers/${getStickerFileName(slice.primary.illustration_right)}`"
        :alt="slice.primary.illustration_right || 'Sticker'"
      >
    </div>
  </section>


  <section
    v-else-if="slice.variation === 'copyWithImage'"
    class="copy-with-image wrapper wrapper--page-width"
    :class="{
      'image--left': slice.primary.layout === 'Image Left',
      'image--right': slice.primary.layout === 'Image Right',
    }"
  >
    <figure class="image">
      <PrismicImage
        v-if="slice.primary.image"
        :field="slice.primary.image"
        :alt="slice.primary.image.alt || 'Image description not provided'"
        :widths="prismicImageSettings.presets.default.widths"
        :imgix-params="prismicImageSettings.presets.default.imgixParams"
      />
      <figcaption
        v-if="isFilled.keyText(slice.primary.image_caption)"
        class="image__caption"
      >
        {{ slice.primary.image_caption }}
      </figcaption>
    </figure>

    <div
      v-if="isFilled.richText(slice.primary.copy)"
      class="copy"
    >
      <PrismicRichText
        :field="slice.primary.copy"
        class="copy__inner"
      />
    </div>
  </section>

  <section
    v-else-if="slice.variation === 'copyWithPullQuote'"
    :class="['copy-with-pull-quote', pullQuoteClass, 'wrapper wrapper--page-width']"
  >
    <div
      v-if="isFilled.richText(slice.primary.copy)"
      class="copy"
    >
      <PrismicRichText
        :field="slice.primary.copy"
        class="copy__inner"
      />
    </div>

    <div class="pull-quote">
      <blockquote
        v-if="isFilled.keyText(slice.primary.pull_quote)"
        class="quote"
      >
        {{ slice.primary.pull_quote }}
      </blockquote>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/slices/_copy.scss';
  @import '@/assets/scss/slices/_article-pull-quote.scss';
  @import '@/assets/scss/slices/_copy-with-image.scss';
  @import '@/assets/scss/slices/_copy-with-pull-quote.scss';
</style>