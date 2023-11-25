<template>
  <div class="filters">
    <BaseSelect
      :value.sync="selectedOptionCategory"
      :options="Categories"
      placeholder="Category"
      @update:value="onUpdateCategory"
    >
    </BaseSelect>

    <BaseSelect
      :value.sync="selectedOptionPrice"
      :options="Prices"
      placeholder="Sort By price"
    >
    </BaseSelect>
    <BaseRange></BaseRange>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from "vue-property-decorator";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseRange from "@/components/BaseRange.vue";
import { IOption } from "@/interfaces/options";

@Component({
  components: {
    BaseSelect,
    BaseRange,
  },
})
export default class TheFilters extends Vue {
  @Prop() selectedOptionCategory!: string;
  @Prop() selectedOptionPrice!: IOption;

  get sortCategory(): string {
    return this.$store.state.filters.sortCategory;
  }
  get sortPrice(): string {
    return this.$store.state.filters.sortPrice;
  }

  Categories = [
    { id: 1, name: "All" },
    { id: 2, name: "smartphones" },
    { id: 3, name: "laptops" },
  ];

  Prices = [
    { id: 1, name: "Recommended" },
    { id: 2, name: "Price high to low" },
    { id: 3, name: "Price low to high" },
  ];

  onUpdateCategory(value: IOption) {
    this.$emit("update:selectedOptionCategory", value);
  }

  @Watch("selectedOptionCategory")
  watchSelectedOptionCategory() {
    this.$emit("sortCategory", this.selectedOptionCategory.name);
  }

  @Watch("selectedOptionPrice")
  watchSelectedOptionPrice() {
    this.$emit("sortPrice", this.selectedOptionPrice.name);
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
