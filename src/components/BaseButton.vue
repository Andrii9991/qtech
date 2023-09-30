<template>
  <button class="button">{{ text }}</button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BaseButton extends Vue {
  @Prop({ default: "" }) text!: string;
}
</script>

<style scoped lang="scss">
.button {
  padding: 8px;
  box-shadow: inset 0 0 0 2px $black;
  border: none;
  border-radius: 8px;
  background: none;
  background-color: $cream;
  color: $black;
  transition-duration: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: $black;
    color: $cream;
    transform: scale(1.04);
  }
}
</style>
