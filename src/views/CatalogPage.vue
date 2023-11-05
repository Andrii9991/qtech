<template>
  <div class="catalog-page">
    <div class="catalog-cart" v-for="product in productList" :key="product.id">
      <div class="image-wrap">
        <img class="image-wrap__image" :src="product.images[0]" alt="" />
      </div>

      <h3 class="catalog-cart__title">{{ product.title }}</h3>
      <p class="catalog-cart__description">{{ product.description }}</p>

      <h3 class="catalog-cart__price">{{ product.price }} USD</h3>
      <div class="catalog-cart__buttons">
        <BaseButton
          class="button__detail"
          @click.native="setProductAsCurrent(product)"
          text="Detail"
        />
        <BaseButton
          class="button__bag"
          @click.native="addToCart(product)"
          :isDisebled="false"
          text="Add to cart"
        />
      </div>
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
  test = true;
  get productList(): IProduct[] {
    return this.$store.state.products.productList;
  }

  nameURL(product: IProduct): string {
    return product.title.toLowerCase().replace(/\s+/g, "-");
  }

  addToCart(product: IProduct): void {
    this.$store.commit("cart/addToCart", product);
    if (product) {
      this.test = true;
    }
    console.log(this.test);
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
    border-radius: 40px;
    background-color: $grey;
    padding: 8px;
    transition-property: background-color, box-shadow;
    transition-duration: 0.2s;
    cursor: pointer;

    .image-wrap {
      width: 200px;
      height: 200px;
      overflow: hidden;
      margin-bottom: 8px;
      border-radius: 8px;
      box-shadow: 0 0 0 4px $black;
      transition-duration: 0.5s;

      &:hover {
        border-radius: 16px;

        .image-wrap__image {
          transform: scale(1.1);
        }
      }

      &__image {
        object-fit: cover;
        object-position: center;
        height: 100%;
        width: 100%;
        transition: 0.5s;
      }
    }

    &__description {
      padding: 15px 15px;
    }
    &__price {
      margin-bottom: 16px;
    }

    &__link {
      text-decoration: none;
    }

    &__buttons {
      display: flex;

      .button__detail {
        padding: 4px 8px;
        margin-right: 4px;
      }

      .button__bag {
        padding: 4px 8px;
        margin-left: 4px;
      }
    }
  }
}
</style>
