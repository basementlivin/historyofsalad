<script setup lang="ts">
import { type Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { prismicImageSettings } from '@/utils/prismicImageSettings';

defineProps(
  getSliceComponentProps<Content.ImageSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    :class="[
      'image', 
      'image--' + slice.variation,
      'wrapper', 
      { 
        'wrapper--fullscreen': slice.variation === 'default',
        'wrapper--wide': slice.variation === 'twoColumn'
      }
    ]"
  >
    <div
      v-if="slice.variation === 'default' && isFilled.image(slice.primary.image)"
      class="image__container full"
    >
      <PrismicImage
        v-if="slice.primary.image"
        :field="slice.primary.image"
        :alt="slice.primary.image.alt || 'Image description not provided'"
        :widths="prismicImageSettings.presets.hero.widths"
        :imgix-params="prismicImageSettings.presets.hero.imgixParams"
        loading="lazy"
      />
      <svg
        v-if="slice.variation === 'default' && isFilled.image(slice.primary.image)"
        class="mask"
        viewBox="0 0 1543.25 38.41"
      >
        <path
          fill="currentColor"
          fill-opacity="1"
          d="M.12 38.28h1543l-.39-30.48s-508.61 54.48-743.61 11.48-799-.18-799-.18v19.18Z"
        />
      </svg>
    </div>
    <div
      v-if="slice.variation === 'twoColumn' && isFilled.image(slice.primary.image_left) && isFilled.image(slice.primary.image_right)"
      class="image__container columns"
    >
      <PrismicImage
        v-if="slice.primary.image_left"
        :field="slice.primary.image_left"
        :alt="slice.primary.image_left.alt ?? 'Image description not provided'"
        :widths="prismicImageSettings.presets.default.widths"
        :imgix-params="prismicImageSettings.presets.default.imgixParams"
        loading="lazy"
      />
      <PrismicImage
        v-if="slice.primary.image_right"
        :field="slice.primary.image_right"
        :alt="slice.primary.image_right.alt || 'Image description not provided'"
        :widths="prismicImageSettings.presets.default.widths"
        :imgix-params="prismicImageSettings.presets.default.imgixParams"
        loading="lazy"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/slices/_image.scss';
</style>