<template>
  <div class="catalog-wrapper">
    <div class="catalog-cart" v-for="product in productList" :key="product.id">
      <div class="catalog-cart__image-wrap">
        <img class="catalog-cart__image" :src="product.images[0]" alt="" />
      </div>

      <h3 class="catalog-cart__title">{{ product.title }}</h3>
      <p class="catalog-cart__description">{{ product.description }}</p>
      <h3 class="catalog-cart__price">
        <span>{{ product.price }} USD</span>
      </h3>
      <BaseButton
        @click.native="setProductAsCurrent(product)"
        text="Детальний опис"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";

@Component({
  components: {
    BaseButton,
  },
})
export default class CatalogPage extends Vue {
  get productList(): Array<Record<string, unknown>> {
    return this.$store.state.products.productList;
  }

  nameURL(product: any): string {
    return product.title.toLowerCase().replace(/\s+/g, "-");
  }

  setProductAsCurrent(product: any): void {
    this.$router.push({
      name: "ContentPage",
      params: { name: this.nameURL(product) },
    });
    this.$store.commit("products/setCurrentProduct", product);
  }
}
</script>
<style scoped lang="scss">
.catalog-wrapper {
  display: grid;
  padding: 64px 46px;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 30px;
  padding: 25px;
  margin: 0 auto 25px;
  min-width: 150px;
  color: $cream;

  .catalog-cart {
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    min-height: 240px;
    max-width: 450px;
    background-color: $grey-lite;
    padding: 10px;
    border-radius: 10px;
    transition-property: background-color, box-shadow;
    transition-duration: 0.2s;
    cursor: pointer;

    &:hover {
      box-shadow: inset 2px -2px 1.5px 1.5px $black;
    }

    &__image-wrap {
      width: 200px;
      overflow: hidden;
      margin: 0 auto;
    }
    &__image {
      object-fit: cover;
      object-position: center;
      height: 200px;
      width: 100%;
      border-radius: 8px;
      border: 4px solid $black;

      &:hover {
        height: 210px;
        border-radius: 16px;
      }
    }

    &__description {
      padding: 15px 15px;
    }

    &__link {
      text-decoration: none;
    }
  }
}
</style>
