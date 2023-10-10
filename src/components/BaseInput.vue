<template>
  <div class="base-input">
    <label class="base-input__label" for="email"> {{ label }} </label>
    <input
      :class="['base-input__input', { error: isError }]"
      @input="onInput"
      @blur="checkField"
      :value="value"
      :type="type"
      :placeholder="placeholder"
    />
    <p v-if="isError" class="base-input__error-msg">{{ errorMsg }}</p>
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
  @Prop({ default: false }) isError!: boolean;
  @Prop({ default: "" }) errorMsg!: string;

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.$emit("input", target.value);
  }

  checkField(): void {
    this.$emit("checkField");
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
    border-radius: 40px;
    font-size: 16px;
  }
  .error {
    box-shadow: 0 0 0 1px $red;
  }

  &__error-msg {
    margin-top: 8px;
    color: $red;
  }
}
</style>
