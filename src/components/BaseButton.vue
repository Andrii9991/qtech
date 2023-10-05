<template>
  <button :class="['default-button', { 'signUp-button': styleButton }]">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IProduct } from "@/interfaces/products";

@Component
export default class BaseButton extends Vue {
  @Prop({ default: "" }) text!: string;
  @Prop({ default: false }) styleButton!: IProduct;
}
</script>

<style scoped lang="scss">
.default-button {
  padding: 8px;
  // box-shadow: inset 0 0 0 2px $black;
  border: none;
  border-radius: 8px;
  background: none;
  background-color: $white;
  color: $black;
  transition-duration: 0.2s;
  transition: 0.6s;
  cursor: pointer;

  &:hover {
    background-color: $black;
    color: $white;
    transform: scale(1.04);
  }
}

.signUp-button {
  padding: 5px 10px;
  border-radius: 4px;
  background-color: $orange;
  color: $black;
  cursor: pointer;
  transition: background-color 0.8s, color 0.8s;

  &:hover {
    background-color: $white;
    color: $black;
  }
}
</style>
