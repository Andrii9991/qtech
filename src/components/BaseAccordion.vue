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
  margin: 0 auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 600px;

  &__title {
    padding: 10px 20px;
    margin-bottom: 8px;
    border: 2px solid $white;
    border-radius: 8px;
    cursor: pointer;
    transition-duration: 0.5s;

    &:hover {
      transform: scale(0.96);
    }
  }
}
</style>
