<template>
  <div class="base-range">
    <vue-slider
      :value="value"
      :min="min"
      :max="max"
      :enableCross="false"
      :interval="10"
      width="200"
      height="4"
      @change="onChange"
    >
    </vue-slider>
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

<style scoped lang="scss">
.base-range {
  width: 200px;
  background-color: $black;
}
</style>
