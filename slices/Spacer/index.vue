<script setup lang="ts">
import { type Content } from "@prismicio/client";

const props = defineProps(
  getSliceComponentProps<Content.SpacerSlice>([
    "slice",
    "index",
    "slices",
    "context",
  ]),
);

const { slice } = props;

const spacerOptions: Record<string, string> = {
  Small: '32px',
  Medium: '64px',
  Large: '96px',
  XL: '128px'
}

const spacerHeight = spacerOptions[slice.primary.size ?? 'Medium'];
</script>

<template>
  <section
    :data-slice-type="slice.slice_type"
    :data-slice-variation="slice.variation"
    class="spacer wrapper wrapper--full-width"
  >
    <div :style="{ height: spacerHeight }" />
  </section>
</template>
