<template>
  <div class="catalog-page">
    <div class="catalog-cart" v-for="product in productList" :key="product.id">
      <div class="catalog-cart__image-wrap">
        <img class="catalog-cart__image" :src="product.images[0]" alt="" />
      </div>

      <h3 class="catalog-cart__title">{{ product.title }}</h3>
      <p class="catalog-cart__description">{{ product.description }}</p>
      <h3 class="catalog-cart__price">
        <span>{{ product.price }} USD</span>
      </h3>
      <BaseButton @click.native="setProductAsCurrent(product)" text="Detail" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import { IProduct } from "@/interfaces/products";

@Component({
  components: {
    BaseButton,
  },
})
export default class CatalogPage extends Vue {
  get productList(): IProduct[] {
    return this.$store.state.products.productList;
  }

  nameURL(product: IProduct): string {
    return product.title.toLowerCase().replace(/\s+/g, "-");
  }

  setProductAsCurrent(product: IProduct): void {
    this.$router.push({
      name: "ProductViewPage",
      params: { name: this.nameURL(product) },
    });
    this.$store.commit("products/setCurrentProduct", product);
  }
}
</script>
<style scoped lang="scss">
.catalog-page {
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
    background-color: $grey;
    padding: 8px;
    transition-property: background-color, box-shadow;
    transition-duration: 0.2s;
    cursor: pointer;

    &:hover {
      border: 1px solid $white;
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
      transition: 0.5s;

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
