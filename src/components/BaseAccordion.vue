<template>
  <div class="base-accordion">
    <h5 class="base-accordion__title" @click="toggleAccordion">
      {{ title }}
    </h5>
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
    border-radius: 8px;
    background-color: $grey;
    cursor: pointer;
    transition-duration: 0.5s;

    &:hover {
      box-shadow: inset 0 0 0 2px $white;
    }
  }
}
</style>
