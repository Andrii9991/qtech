<template>
  <button :default="defaultButton" :signUpButton="signUpButton">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BaseButton extends Vue {
  @Prop({ default: "" }) text!: string;
  @Prop({ default: "button" }) signUpButton!: string;
  @Prop({ default: "button" }) defaultButton!: string;
  @Prop({ default: "" }) test!: string;
}
</script>

<style scoped lang="scss">
.default-button {
  padding: 8px;
  box-shadow: inset 0 0 0 2px $black;
  border: none;
  border-radius: 8px;
  background: none;
  background-color: $white;
  color: $black;
  transition-duration: 0.2s;
  cursor: pointer;

  &:hover {
    background-color: $black;
    color: $cream;
    transform: scale(1.04);
  }
}

.signUp-button {
  padding: 10px 20px;
  border: none;
  background-color: transparent;
  color: #000;
  border: 2px solid #000;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.8s, color 0.8s;

  &:hover {
    background-color: #000;
    color: #fff;
  }
}
</style>
