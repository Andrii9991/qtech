<template>
  <div class="base-accordion">
    <div class="base-accordion__title" @click="swicthContent">
      <h5>{{ title }}</h5>
      <h3 class="icon" v-if="!isOpened">+</h3>
      <h3 class="icon" v-else>></h3>
    </div>
    <transition name="fade">
      <div class="base-accordion__content" v-if="isOpened">
        <slot class="test" name="description"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BaseAccordion extends Vue {
  @Prop({ default: "" }) title!: string;
  isOpened = false;

  swicthContent() {
    this.isOpened = !this.isOpened;
  }
}
</script>

<style scoped lang="scss">
.base-accordion {
  margin: 0 auto;
  max-width: 600px;
  background-color: $grey;
  border-radius: 20px;
  transition: 0.5s;
  box-shadow: inset 0 0 0 2px $white;

  &:hover {
    box-shadow: inset 0 0 0 2px $white;
  }

  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    margin-bottom: 8px;
    background-color: $grey;
    cursor: pointer;
    transition-duration: 0.5s;
    box-shadow: inset 0 0 0 2px $white;
    border-radius: 8px;

    .icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-left: 10px;
      transition: 0.5s;

      &:hover {
        transform: scale(1.04);
        background-color: $grey-lite;
      }
    }
  }

  &__content {
    padding-left: 8px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
