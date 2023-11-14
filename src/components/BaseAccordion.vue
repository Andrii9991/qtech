<template>
  <div class="base-accordion">
    <div class="base-accordion__container" @click="swicthContent">
      <div class="base-accordion__title">
        <h5>{{ title }}</h5>
        <h3 class="icon" v-if="!isActive">+</h3>
        <h3 class="icon" v-else>></h3>
      </div>
      <transition name="fade">
        <div class="base-accordion__content" :class="{ visible: isActive }">
          <slot name="description"></slot>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BaseAccordion extends Vue {
  @Prop({ default: "" }) title!: string;
  isActive = false;

  swicthContent() {
    this.isActive = !this.isActive;
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

  &__container {
    border: 4px white solid;
    border-radius: 20px;
  }
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: $grey;
    cursor: pointer;
    transition-duration: 0.5s;
    border-radius: 20px;

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
    visibility: hidden;
    opacity: 0;
    height: 0;
    transition: opacity 0.1s, height 0.5s, padding 0.3s, visibility 0.3s;
  }

  .visible {
    visibility: visible;
    opacity: 1;
    padding: 0 20px;
    height: 250px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 16px;
      background-color: $grey;
      border-radius: 20px;
    }

    &::-webkit-scrollbar-track {
      background-color: $grey;
      margin-block: 3px;
      border-radius: 100vw;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $white;
      border: 4px $grey solid;
      border-radius: 20px;
    }
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
