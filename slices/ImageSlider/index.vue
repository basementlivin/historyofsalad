<script setup lang="ts">
import { computed } from "vue";
import { type Content } from "@prismicio/client";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation, A11y, Keyboard } from 'swiper/modules';
import { prismicImageSettings } from '@/utils/prismicImageSettings';

const props = defineProps(
  getSliceComponentProps<Content.ImageSliderSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

// Check if the slice exists and has primary and images fields before processing
const slides = computed(() => {
  const images = props?.slice?.primary?.images ?? [];
  const minSlides = 10;
  let duplicatedImages = [...images];

  if (images.length < minSlides) {
    while (duplicatedImages.length < minSlides) {
      duplicatedImages = [...duplicatedImages, ...images];
    }
  }

  return duplicatedImages;
});
</script>

<template>
  <section
    v-if="props.slice?.primary?.images && slice.variation === 'default'"
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="image-slider wrapper wrapper--fullscreen"
  >
    <Swiper
      :modules="[Autoplay, Navigation, A11y, Keyboard]"
      :grab-cursor="true"
      :space-between="16"
      :slides-per-view="'auto'"
      :loop="true"
      :speed="680"
      :autoplay="{
        delay: 2850,
        disableOnInteraction: false,
      }"
      :navigation="{
        nextEl: '.swiper-button-next--custom',
        prevEl: '.swiper-button-prev--custom',
      }"
      :a11y="{
        enabled: true,
      }"
      :keyboard="{
        enabled: true,
      }"
    >
      <SwiperSlide
        v-for="(slide, index) in slides"
        :key="index"
        class="swiper-slide--custom"
      >
        <div class="image">
          <PrismicImage
            v-if="slide?.image"
            :field="slide.image"
            :alt="slide.image.alt || 'Image description not provided'"
            :widths="prismicImageSettings.presets.default.widths"
            :imgix-params="prismicImageSettings.presets.default.imgixParams"
            loading="lazy"
          />
        </div>
      </SwiperSlide>
    </Swiper>
    <div class="swiper-navigation">
      <div
        class="swiper-button-next--custom"
        aria-label="Next slide"
      >
        +
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
  @import '@/assets/scss/slices/_image-slider.scss';
</style>
