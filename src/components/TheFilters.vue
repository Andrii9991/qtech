<template>
  <div class="filters">
    <BaseSelect
      title="Categories"
      :options="Categories"
      :selected="selected"
      @select="sortByCategories"
    >
    </BaseSelect>

    <BaseSelect> </BaseSelect>
    <BaseRange></BaseRange>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseRange from "@/components/BaseRange.vue";
import { IProduct } from "@/interfaces/products";

@Component({
  components: {
    BaseSelect,
    BaseRange,
  },
})
export default class TheFilters extends Vue {
  selected = "Category";
  sortedProducts: IProduct[] = [];

  Categories = [
    { name: "smartphones", value: "S" },
    { name: "laptops", value: "L" },
  ];

  get productList(): IProduct[] {
    return this.$store.state.products.productList;
  }

  get filterProducts(): IProduct[] {
    if (this.sortedProducts.length) {
      return this.sortedProducts;
    } else {
      return this.productList;
    }
  }

  sortByCategories(category: any) {
    this.sortedProducts = [];

    this.productList.map((item: IProduct) => {
      if (item.category === category.name) {
        this.sortedProducts.push(item);
      }
    });
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
