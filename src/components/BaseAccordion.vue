<template>
  <div class="base-accordion">
    <h3 class="base-accordion__title" @click="toggleAccordion">
      {{ title }}
    </h3>
    <div class="base-accordion__content" v-if="isOpen">
      <slot class="test" name="description"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BaseAccordion extends Vue {
  @Prop({ default: "" }) title!: string;
  isOpen = false;

  toggleAccordion() {
    this.isOpen = !this.isOpen;
  }
}
</script>

<style scoped lang="scss">
.base-accordion {
  &:hover {
    cursor: pointer;
  }
}
</style>
