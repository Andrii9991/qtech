<template>
  <div class="base-range">
    <input
      class="price"
      v-model.number="minPrice"
      type="range"
      min="0 "
      max="2000"
      step="10"
      @change="setRangeSlider"
    />
    <input
      class="price"
      v-model.number="maxPrice"
      type="range"
      min="0 "
      max="2000"
      step="10"
      @change="setRangeSlider"
    />

    <div class="range-interaction">
      <p>Min: {{ minPrice }}</p>
      <p>Max: {{ maxPrice }}</p>
    </div>

    <!-- <BaseButton @click.native="setRangeSlider" text="btn" /> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "./BaseButton.vue";

@Component({
  components: {
    BaseButton,
  },
})
export default class BaseRange extends Vue {
  minPrice = 100;
  maxPrice = 2000;

  setRangeSlider(): void {
    if (this.minPrice > this.maxPrice) {
      let temp = this.maxPrice;
      this.maxPrice = this.minPrice;
      this.minPrice = temp;
    }
    this.$emit("minPrice", this.minPrice);
    this.$emit("maxPrice", this.maxPrice);
  }
}
</script>
<style scoped lang="scss">
.base-range {
  width: 200px;
  margin: auto 16px;
  text-align: center;
  position: relative;

  .price {
    position: absolute;
    left: 0;
    bottom: 0;
    background: $white;
    border-radius: 8px;
    height: 7px;
    -webkit-appearance: none;
  }

  .price::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    -webkit-appearance: none;
    cursor: pointer;
    background: $grey;
  }

  .range-interaction {
    display: flex;
    margin-bottom: 16px;
  }

  .range-interaction p {
    margin-right: 10px;
  }
}
</style>
