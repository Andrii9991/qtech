<template>
  <div class="product-view__wrapper">
    <h3 class="product-view__title">{{ currentProduct.title }}</h3>
    <p class="product-view__description">{{ currentProduct.description }}</p>
    <div class="image-wpapper">
      <img class="image-wpapper__item" :src="currentProduct.images[0]" alt="" />
      <img class="image-wpapper__item" :src="currentProduct.images[1]" alt="" />
      <img class="image-wpapper__item" :src="currentProduct.images[2]" alt="" />
    </div>
    <div class="product-view__characteristics">
      <ul class="characteristics">
        <h4>Характеристики:</h4>
        <li class="characteristics__brand">
          Бренд: {{ currentProduct.brand }}
        </li>
        <li class="characteristics__category">
          Категорія: {{ currentProduct.category }}
        </li>
        <li class="characteristics__ratign">
          Рейтинг: {{ currentProduct.rating }}
        </li>
      </ul>
    </div>

    <div class="buttons">
      <BaseButton @click.native="login" text="Купити" />
      <BaseButton @click.native="login" text="Додати в кошик" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import { Product } from "@/interface/interface";

@Component({
  components: {
    BaseButton,
  },
})
export default class ContentPage extends Vue {
  product = {};

  get productList(): Product {
    return this.$store.state.products.productList;
  }
  get currentProduct(): Product {
    return this.$store.state.products.currentProduct;
  }
}
</script>

<style lang="scss">
.product-view__wrapper {
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
