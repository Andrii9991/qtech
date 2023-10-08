<template>
  <div class="product-view-page">
    <h3 class="product-view-page__title">{{ currentProduct.title }}</h3>
    <p class="product-view-page__description">
      {{ currentProduct.description }}
    </p>
    <div class="image-wpapper">
      <img class="image-wpapper__item" :src="currentProduct.images[0]" alt="" />
      <img class="image-wpapper__item" :src="currentProduct.images[1]" alt="" />
      <img class="image-wpapper__item" :src="currentProduct.images[2]" alt="" />
    </div>
    <div class="product-view-page__characteristics">
      <ul class="characteristics">
        <h4>Characteristics:</h4>
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
    </div>

    <div class="buttons">
      <!-- <BaseButton @click.native="login" text="Купити" />
      <BaseButton @click.native="login" text="Додати в кошик" /> -->
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
}
</script>

<style lang="scss">
.product-view-page {
  display: flex;
  flex-direction: column;
  align-items: center;

  .image-wpapper {
    display: flex;
    margin: 10px;

    &__item {
      max-width: 240px;
      height: auto;
      border-radius: 8px;
      margin: 20px;
    }
  }

  .characteristics {
    list-style: none;
  }

  .buttons {
    margin: 20px;
  }
}
</style>
