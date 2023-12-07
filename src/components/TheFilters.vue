<template>
  <div class="filters">
    <BaseSelect
      :value.sync="selectedOptionCategory"
      :options="Categories"
      :areOptionsVisible.sync="areOptionsVisibleCategory"
      @update:areOptionsVisible="toggleOptionCategory"
      @update:value="onCategoryUpdate"
      placeholder="Category"
    >
    </BaseSelect>

    <BaseSelect
      :value.sync="selectedOptionPrice"
      :options="Prices"
      :areOptionsVisible.sync="areOptionsVisiblePrice"
      @update:areOptionsVisible="toggleOptionPrice"
      @update:value="onPriceUpdate"
      placeholder="Sort By price"
    >
    </BaseSelect>
    <BaseRange></BaseRange>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseRange from "@/components/BaseRange.vue";

@Component({
  components: {
    BaseSelect,
    BaseRange,
  },
})
export default class TheFilters extends Vue {
  selectedOptionCategory: any = {};
  selectedOptionPrice: any = {};

  areOptionsVisibleCategory = false;
  areOptionsVisiblePrice = false;

  Categories = [
    { id: 1, name: "All" },
    { id: 2, name: "smartphones" },
    { id: 3, name: "laptops" },
  ];

  Prices = [
    { id: 4, name: "Recommended" },
    { id: 5, name: "Price high to low" },
    { id: 6, name: "Price low to high" },
  ];

  onCategoryUpdate() {
    this.$emit("sortCategory", this.selectedOptionCategory.name);
    this.selectedOptionPrice = {};
  }

  onPriceUpdate() {
    this.$emit("sortPrice", this.selectedOptionPrice.name);
    this.selectedOptionCategory = {};
  }

  toggleOptionCategory() {
    this.areOptionsVisiblePrice = false;
  }

  toggleOptionPrice() {
    this.areOptionsVisibleCategory = false;
  }
}
</script>
<style scoped lang="scss">
.filters {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: $grey-lite;
  min-height: 50px;

  .options {
    display: flex;
    justify-content: center;
    margin-bottom: 4px;
    cursor: pointer;
    transition-duration: 0.5s;

    &:hover {
      padding: 0 10px;
      background-color: $grey;
      color: $white;
      border-radius: 40px;
    }
  }
}
</style>
