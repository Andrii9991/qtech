<template>
  <button :class="['base-button', styleButton, size]" :disabled="isDisebled">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BaseButton extends Vue {
  @Prop({ default: "" }) text!: string;
  @Prop({ default: "" }) styleButton!: string;
  @Prop({ default: "" }) size!: string;
  @Prop({ default: false }) isDisebled!: boolean;
}
</script>

<style scoped lang="scss">
.base-button {
  padding: 8px;
  border-radius: 40px;
  background: none;
  background-color: $white;
  color: $black;
  transition-duration: 0.5s;
  padding: 8px 20px;
  cursor: pointer;

  &:hover {
    background-color: $black;
    color: $white;
    transform: scale(1.04);
  }
  &:disabled {
    background-color: $grey-lite;
    box-shadow: inset 0 0 0 2px $grey-lite;
    color: $white;

    &:hover {
      background-color: $grey-lite;
      box-shadow: inset 0 0 0 2px $grey-lite;
      color: $white;
      transform: scale(1);
      cursor: default;
    }
  }
}

.black {
  background-color: $black;
  color: $white;

  &:hover {
    box-shadow: inset 0 0 0 2px $black;
  }
}

.small {
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
}
</style>
