<template>
  <div class="base-range">
    <vue-slider
      class="base-range__slider"
      :value="value"
      :min="min"
      :max="max"
      :enableCross="false"
      :interval="10"
      :railStyle="12"
      :minRange="100"
      :width="200"
      :height="4"
      dotSize="16"
      @change="onChange"
    >
    </vue-slider>

    <div class="base-range__value">
      <p class="min-value">Min: {{ value[0] }}$</p>
      <p class="min-value">Max: {{ value[1] }}$</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import BaseButton from "./BaseButton.vue";
import VueSlider from "vue-slider-component";
import "vue-slider-component/theme/default.css";

type Value = number | string | Array<number | string>;

@Component({
  components: {
    BaseButton,
    VueSlider,
  },
})
export default class BaseRange extends Vue {
  @Prop({ default: 0 }) value!: Value;
  @Prop({ default: 0 }) min!: number;
  @Prop({ default: 100 }) max!: number;

  onChange(value: Value) {
    this.$emit("input", value);
  }
}
</script>

<style scope lang="scss">
.base-range {
  width: 200px;
  .vue-slider-rail {
    border-radius: 15px;
    background-color: $grey;
  }

  .vue-slider-process {
    background-color: $white;
    border-radius: 15px;
  }

  .vue-slider-dot-handle {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: $white;
    box-sizing: border-box;
    box-shadow: 0.5px 0.5px 2px 1px rgba(0, 0, 0, 0.32);
  }
  .vue-slider-dot-handle-focus {
    box-shadow: 0px 0px 1px 2px $black;
  }

  .vue-slider-dot-tooltip-inner {
    font-size: 14px;
    white-space: nowrap;
    padding: 2px 5px;
    min-width: 20px;
    text-align: center;
    color: $white;
    border-radius: 4px;
    background-color: $grey-lite;
    box-sizing: content-box;
  }

  &__value {
    display: flex;
    justify-content: center;

    .min-value {
      margin-right: 20px;
    }
  }
}
</style>
