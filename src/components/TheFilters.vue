<template>
  <div class="filters">
    <BaseSelect
      :value.sync="selectedOption"
      :options="Categories"
      placeholder="Category"
    >
    </BaseSelect>

    <BaseSelect
      :value.sync="selectedOption"
      :options="Prices"
      placeholder="Sort By price"
    >
    </BaseSelect>
    <BaseRange></BaseRange>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import BaseSelect from "@/components/BaseSelect.vue";
import BaseRange from "@/components/BaseRange.vue";

@Component({
  components: {
    BaseSelect,
    BaseRange,
  },
})
export default class TheFilters extends Vue {
  selectedOption: any = {};

  Categories = [
    { id: 1, name: "All" },
    { id: 2, name: "smartphones" },
    { id: 3, name: "laptops" },
  ];

  Prices = [
    { id: 4, name: "All" },
    { id: 5, name: "Price high to low" },
    { id: 6, name: "Price low to high" },
  ];

  @Watch("selectedOption")
  watchSelectedOption() {
    this.$emit("sort", this.selectedOption.name);
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
