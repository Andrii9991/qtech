<template>
  <div class="catalog-wrapper">
    <div class="catalog-cart" v-for="product in productList" :key="product.id">
      <div class="catalog-cart__image-wrap">
        <img class="catalog-cart__image" :src="product.images[0]" alt="" />
      </div>

      <h4 class="catalog-cart__title">{{ product.title }}</h4>
      <p class="catalog-cart__description">{{ product.description }}</p>
      <h3 class="catalog-cart__price">
        <span>{{ product.price }} USD</span>
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CatalogPage extends Vue {
  productList: any = this.$store.state.products.productList;

  mounted() {
    console.log(this.productList);
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
    min-width: 350px;
    padding: 10px;
    border-radius: 10px;
    transition-property: background-color, box-shadow;
    transition-duration: 0.2s;
    box-shadow: inset 2px -2px 1.5px 1.5px $black;
    cursor: pointer;

    &__image-wrap {
      width: 200px;
      overflow: hidden;
      margin: 0 auto;
    }
    &__image {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }

    &__description {
      padding: 15px 0;
    }
  }
}
</style>
