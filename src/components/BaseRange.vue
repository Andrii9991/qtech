<template>
  <div class="base-range">
    <input
      class="price"
      type="range"
      min="0 "
      max="2000"
      step="10"
      v-model.number="minPrice"
    />
    <input
      class="price"
      type="range"
      min="0 "
      max="2000"
      step="10"
      v-model.number="maxPrice"
    />

    <div class="range-values">
      <p>Min: {{ minPrice }}</p>
      <p>Max: {{ maxPrice }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class BaseRange extends Vue {
  minPrice = 100;
  maxPrice = 2000;
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
  }

  .price::-webkit-slider-thumb {
    z-index: 2;
    position: relative;
    top: 2px;
    margin-top: -7px;
  }

  .range-values {
    display: flex;
    margin-bottom: 16px;
  }

  .range-values p {
    margin-right: 10px;
  }
}
</style>
