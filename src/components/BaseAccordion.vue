<template>
  <div class="base-accordion">
    <h3 class="base-accordion__title">
      {{ title }}
    </h3>
    <slot name="description"></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BaseAccordion extends Vue {
  @Prop({ default: "" }) title!: string;
}
</script>

<style scoped lang="scss"></style>
