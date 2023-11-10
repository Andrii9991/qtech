<template>
  <div class="product-view-page">
    <h2 class="product-view-page__title">{{ currentProduct.title }}</h2>
    <p class="product-view-page__description">
      {{ currentProduct.description }}
    </p>
    <div class="product-view-page__content">
      <div class="image-wpapper">
        <img
          class="image-wpapper__item"
          :src="currentProduct.images[0]"
          alt=""
        />
        <img
          class="image-wpapper__item"
          :src="currentProduct.images[1]"
          alt=""
        />
        <img
          class="image-wpapper__item"
          :src="currentProduct.images[2]"
          alt=""
        />
      </div>
      <div class="content__characteristics">
        <ul class="characteristics">
          <h4>About this item:</h4>
          <li class="characteristics__brand">
            Brand: {{ currentProduct.brand }}
          </li>
          <li class="characteristics__category">
            Category: {{ currentProduct.category }}
          </li>
          <li class="characteristics__ratign">
            Ratind: {{ currentProduct.rating }}
          </li>
        </ul>

        <div class="buttons">
          <BaseButton
            class="buy-button button"
            styleButton="red"
            text="Buy now"
          />
          <BaseButton
            class="bag-button button"
            @click.native="addToCart"
            :isDisebled="(currentProduct.count || 0) > 0 ? true : false"
            :text="(currentProduct.count || 0) > 0 ? 'In cart' : 'Add to cart'"
          />
        </div>
      </div>
      <p>{{ currentProduct.count }}</p>
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
export default class ProductViewPage extends Vue {
  get currentProduct(): IProduct {
    return this.$store.state.products.currentProduct;
  }
  get count(): IProduct {
    return this.$store.getters["cart/getCountsArray"];
  }

  get test(): IProduct {
    return this.$store.getters["products/getTest"];
  }

  addToCart(): void {
    this.$store.commit("cart/addToCart", this.currentProduct);
    this.$store.commit("products/increament", this.currentProduct.id);
    this.currentProduct.count!++;
  }
}
</script>

<style lang="scss">
.product-view-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  color: $white;
  margin-top: 16px;

  &__title {
    margin-bottom: 16px;
  }

  &__content {
    display: flex;
    justify-content: space-around;
    margin-top: 24px;
    width: 100%;
    height: 100vh;

    .image-wpapper {
      display: flex;
      flex-direction: column;

      &__item {
        max-width: 150px;
        height: 150px;
        border-radius: 8px;
        padding: 10px;
      }
    }
    .content__characteristics {
      max-width: 350px;

      .characteristics {
        width: 100%;
      }
      .buttons {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 20px;

        .button {
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>
