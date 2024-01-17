<template>
  <div class="home-page">
    <div class="home-carousel">
      <carousel
        class="home-carousel__wrapper"
        v-model="currentSlide"
        :perPage="widthWindow"
        :autoplay="true"
        :autoplayTimeout="4000"
        :loop="true"
        :paginationEnabled="false"
        :minSwipeDistance="2"
      >
        <slide
          class="item-content"
          @click.native="setProductAsCurrent(product)"
          v-for="product in productList"
          :key="product.id"
        >
          <img
            class="image-wpapper__item"
            :src="product.images[0]"
            alt="product-image"
          />
          <p>{{ product.title }}</p>
          <p>{{ product.brand }}</p>
          <p>{{ product.price }}$</p>
        </slide>
      </carousel>
    </div>

    <div class="home-page__container">
      <div class="home-cart" v-for="product in productList" :key="product.id">
        <div class="image-wrap">
          <img class="image-wrap__image" :src="product.images[0]" alt="" />
        </div>

        <h3 class="home-cart__title">{{ product.title }}</h3>
        <p class="home-cart__description">{{ product.description }}</p>

        <h3 class="home-cart__price">{{ product.price }} USD</h3>
        <div class="home-cart__buttons">
          <BaseButton
            class="button__detail"
            @click.native="setProductAsCurrent(product)"
            text="Detail"
          />
          <BaseButton
            class="button__bag"
            @click.native="addToCart(product)"
            :isDisebled="(product.count || 0) > 0 ? true : false"
            :text="(product.count || 0) > 0 ? 'In cart' : 'Add to cart'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import TheFilters from "@/components/TheFilters.vue";
import { IProduct } from "@/interfaces/products";
import { Carousel, Slide } from "vue-carousel";

@Component({
  components: {
    BaseButton,
    TheFilters,
    BaseSelect,
    Carousel,
    Slide,
  },
})
export default class HomePage extends Vue {
  currentSlide = 1;
  widthWindow = window.innerWidth <= 767 ? 3 : 4;

  get productImages() {
    return this.$store.getters["products/getProductsImage"];
  }

  minRangePrice = 0;
  maxRangePrice = 0;

  get productList(): IProduct[] {
    return this.$store.state.products.productList;
  }

  get userCart(): IProduct[] {
    return this.$store.state.cart.userCart;
  }

  nameURL(product: IProduct): string {
    return product.title.toLowerCase().replace(/\s+/g, "-");
  }

  addToCart(product: IProduct): void {
    this.$store.commit("cart/addToCart", product);
    this.$store.commit("products/increament", product.id);
  }

  setProductAsCurrent(product: IProduct): void {
    this.$router.push({
      name: "ProductViewPage",
      params: { name: this.nameURL(product) },
    });
    this.$store.commit("products/setCurrentProduct", product);
  }
  @Watch("window.innerWidth")
  onResize() {
    this.widthWindow = window.innerWidth <= 767 ? 3 : 4;
  }

  mounted() {
    window.addEventListener("resize", this.onResize);
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
}
</script>
<style scoped lang="scss">
.home-page {
  position: relative;
  color: $white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;

  .home-carousel {
    margin-top: 16px;
    text-align: center;

    &__wrapper {
      background-color: $grey;
      height: 300px;
      border-radius: 16px;
      margin: 16px;
      .item-content {
        padding: 10px 0;

        .image-wpapper__item {
          border-radius: 8px;
          margin: 8px;
          width: 200px;
          height: 200px;
        }
      }
    }
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 30px;
    padding: 25px;
    .home-cart {
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
}

@media (max-width: 767px) {
  .home-page {
    .home-carousel {
      margin-top: 8px;

      &__wrapper {
        margin: 8px;
        .item-content {
          padding: 10px 0;

          .image-wpapper__item {
            width: 140px;
            height: 140px;
          }
        }
      }
    }
    .home-page__container {
      padding-top: 10px;
    }
  }
}
</style>
