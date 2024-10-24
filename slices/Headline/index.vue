<script setup lang="ts">
import { computed } from "vue";
import { type Content } from "@prismicio/client";
import { isFilled } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.HeadlineSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const { slice } = props;

const headlineClass = computed(() => {
  const style = slice.primary.headline_style;
  const classMap = {
    Large: 'headline--large',
    Medium: 'headline--medium',
    Small: 'headline--small',
    Hidden: 'headline--hidden',
  };
  return classMap[style] || '';
});
</script>

<template>
  <section
    v-if="isFilled.keyText(slice.primary.headline)"
    class="headline wrapper"
  >
    <component
      :is="slice.primary.headline_level"
      :data-slice-type="slice.slice_type"
      :data-slice-variation="slice.variation"
      :class="headlineClass"
    >
      {{ slice.primary.headline }}
    </component>
  </section>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/components/_headlines.scss';
</style>