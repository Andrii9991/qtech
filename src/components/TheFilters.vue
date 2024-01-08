<template>
  <div class="filters">
    <BaseButton
      class="filters__burger-menu"
      @click.native="onShowMenu"
      text="Filters"
    >
    </BaseButton>

    <div
      class="filters__wrapper"
      :class="{ 'filters-mobile-visible': isActive }"
    >
      <BaseSelect
        class="filter-category filter"
        :value.sync="selectedOptionCategory"
        :options="Categories"
        :areOptionsVisible.sync="areOptionsVisibleCategory"
        @update:areOptionsVisible="toggleOptionCategory"
        @update:value="onCategoryUpdate"
        placeholder="Category"
      >
      </BaseSelect>

      <BaseSelect
        class="filter-price filter"
        :value.sync="selectedOptionPrice"
        :options="Prices"
        :areOptionsVisible.sync="areOptionsVisiblePrice"
        @update:areOptionsVisible="toggleOptionPrice"
        @update:value="onPriceUpdate"
        placeholder="Sort By price"
      >
      </BaseSelect>
      <BaseRange
        class="filter-range"
        v-model="priceValue"
        @input="onPriceChange"
        :min="minPrice"
        :max="maxPrice"
      >
      </BaseRange>
      <BaseButton
        @click.native="onCloseMenu"
        class="filters__burger-show"
        text="Show"
      ></BaseButton>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseRange from "@/components/BaseRange.vue";
import { IOption } from "@/interfaces/options";
import BaseButton from "./BaseButton.vue";

@Component({
  components: {
    BaseSelect,
    BaseRange,
    BaseButton,
  },
})
export default class TheFilters extends Vue {
  selectedOptionCategory: IOption = {};
  selectedOptionPrice: IOption = {};
  areOptionsVisibleCategory = false;
  areOptionsVisiblePrice = false;
  isActive = false;

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

  minPrice = 0;
  maxPrice = 1750;
  priceValue = [this.minPrice, this.maxPrice];

  onCategoryUpdate() {
    this.$emit("sortCategory", this.selectedOptionCategory.name);
    this.selectedOptionPrice = {};
    this.isActive = false;
  }

  onPriceUpdate() {
    this.$emit("sortPrice", this.selectedOptionPrice.name);
    this.selectedOptionCategory = {};
    this.isActive = false;
  }

  toggleOptionCategory() {
    this.areOptionsVisiblePrice = false;
  }

  toggleOptionPrice() {
    this.areOptionsVisibleCategory = false;
  }

  onPriceChange(value: number): void {
    this.$emit("priceChange", value);
  }

  onShowMenu() {
    this.isActive = !this.isActive;
  }
  onCloseMenu() {
    this.isActive = !this.isActive;
  }
}
</script>
<style scoped lang="scss">
.filters {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 32px;
  min-height: 50px;
  padding: 8px 16px;
  background-color: $grey-lite;

  .filters__burger-menu {
    display: none;
  }

  &__wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
    align-items: center;
    width: 100%;
    max-width: 1240px;

    .filters__burger-show {
      display: none;
    }
  }
}

@media (max-width: 767px) {
  .filters {
    background-color: $black;
    display: flex;
    justify-content: flex-start;

    .filters__wrapper {
      position: absolute;
      top: 0;
      left: -250px;
      display: flex;
      flex-direction: column;
      z-index: 1;
      width: 250px;
      background-color: $grey-lite;
      opacity: 0.9;
      padding: 75px 20px 10px;

      .filter {
        padding: 10px 0;
      }
      .filter-range {
        z-index: 0;
        padding-bottom: 10px;
      }
      .filters__burger-show {
        display: block;
      }
    }
    .filters-mobile-visible {
      transition: 0.5s;
      transform: translateX(100%);
    }

    .filters__burger-menu {
      display: block;
      z-index: 2;
    }
  }
}
</style>
