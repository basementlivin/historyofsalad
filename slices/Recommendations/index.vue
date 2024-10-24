<script setup lang="ts">
import { type Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";
import { prismicImageSettings } from '@/utils/prismicImageSettings';
import { onMounted, ref, nextTick } from 'vue';

defineProps(
  getSliceComponentProps<Content.RecommendationsSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const masonryContainer = ref<HTMLElement | null>(null); // Specify the type for the container

const initializeMasonry = async () => {
  if (!import.meta.env.SSR && masonryContainer.value) { // Check if not in SSR
    const Masonry = (await import('masonry-layout')).default; // Dynamic import
    new Masonry(masonryContainer.value, {
      itemSelector: '.rec',
      columnWidth: '.rec',
      percentPosition: true,
      gutter: 32,
    });
  }
};


// Function to wait for all images to load
const waitForImages = async () => {
  if (!masonryContainer.value) return; // Check if the container is defined
  const images = masonryContainer.value.querySelectorAll('img') as NodeListOf<HTMLImageElement>;
  
  await Promise.all(
    Array.from(images).map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise<void>((resolve) => {
        img.addEventListener('load', () => resolve());
        img.addEventListener('error', () => resolve());
      });
    })
  );
};

onMounted(async () => {
  await waitForImages(); // Wait for all images to load
  nextTick(() => {
    initializeMasonry(); // Initialize Masonry after images are loaded
  });
});
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="recommendations wrapper wrapper--wide"
  >
    <div
      ref="masonryContainer"
      class="recommendations__inner"
    >
      <div
        v-for="(item, index) in slice.primary.recommendation"
        :key="index"
        class="rec"
      >
        <div class="rec__image">
          <PrismicImage
            v-if="item.image"
            :field="item.image"
            :alt="item.image.alt"
            :widths="prismicImageSettings.presets.default.widths"
            :imgix-params="prismicImageSettings.presets.default.imgixParams"
            loading="lazy"
          />
        </div>
        <div class="rec__content">
          <h3
            v-if="isFilled.keyText(item.title)"
            class="title"
          >
            {{ item.title }}
          </h3>
          <PrismicRichText
            v-if="isFilled.richText(item.copy)"
            :field="item.copy"
            class="copy" 
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/slices/_recommendations.scss';
</style>
