<template>
  <div class="base-input">
    <label class="base-input__label" for="email"> {{ label }} </label>
    <input
      class="base-input__input"
      @input="onInput"
      :value="value"
      :type="type"
      :placeholder="placeholder"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class BaseInput extends Vue {
  @Prop({ default: "" }) value!: string;
  @Prop({ default: "" }) placeholder!: string;
  @Prop({ default: "" }) label!: string;
  @Prop({ default: "text" }) type!: string;

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.$emit("input", target.value);
  }
}
</script>
<style scoped lang="scss">
.base-input {
  &__label {
    font-size: 16px;
    color: $black;
    display: block;
    margin-bottom: 8px;
  }

  &__input {
    width: 100%;
    padding: 10px;
    box-shadow: 0 0 0 1px $black;
    color: $black;
    border-radius: 8px;
    font-size: 16px;
  }
}
</style>
