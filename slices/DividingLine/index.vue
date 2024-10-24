<script setup lang="ts">
import { computed } from "vue";
import { type Content } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.DividingLineSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const { slice } = props;

const paddingMap = {
  '16px': '16px',
  '32px': '32px',
  '48px': '48px',
  '64px': '64px',
};

const paddingTop = computed(() => {
  return paddingMap[slice.primary.padding_top] || '0px';
});

const paddingBottom = computed(() => {
  return paddingMap[slice.primary.padding_bottom] || '0px';
});
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    :style="{ paddingTop: paddingTop, paddingBottom: paddingBottom }"
    class="dividing-line"
  >
    <div class="line" />
  </section>
</template>

<style lang="scss" scoped>
  @import '@/assets/scss/slices/_dividing-line.scss';
</style>