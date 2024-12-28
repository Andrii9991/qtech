<template>
  <div class="home-page">
    <div class="home-carousel">
      <h1>Sales hit</h1>
      <carousel
        class="home-carousel__wrapper"
        v-model="currentSlide"
        :perPage="1"
        :autoplayTimeout="4000"
        :loop="true"
        :navigationEnabled="true"
        :paginationEnabled="false"
        :minSwipeDistance="1"
        :perPageCustom="[
          [1199, 5],
          [980, 4],
          [767, 3],
          [340, 2],
        ]"
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
          <p class="product-title">{{ product.title }}</p>
          <p class="product-brand">{{ product.brand }}</p>

          <h4 class="product__price-actual">{{ product.price }}$</h4>
        </slide>
      </carousel>
    </div>

    <div class="current-product__modal">
      <BaseModal
        class="current-product__wrapper"
        v-if="isModalVisible"
        @closeModal="onCloseModal"
        :title="currentProduct.title"
      >
        <template #content>
          <div class="product-content">
            <div class="product-content__carousel-wrapper">
              <carousel
                class="image-wpapper"
                v-model="currentSlide"
                :perPage="1"
                :paginationEnabled="false"
                :centerMode="true"
                :adjustableHeight="true"
                :autoplay="true"
                :autoplayTimeout="4000"
                :loop="true"
              >
                <slide v-for="image in currentProduct.images" :key="image">
                  <img
                    class="image-wpapper__item"
                    :src="image"
                    alt="product-image"
                  />
                </slide>
              </carousel>
            </div>

            <div class="content__characteristics">
              <h3>Description</h3>
              <p class="characteristics__description">
                {{ currentProduct.description }}
              </p>
              <ul class="characteristics">
                <h3>About this item:</h3>

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
                  @click.native="addToCart(currentProduct)"
                  :isDisebled="(currentProduct.count || 0) > 0 ? true : false"
                  :text="
                    (currentProduct.count || 0) > 0 ? 'In cart' : 'Add to cart'
                  "
                />
              </div>
            </div>

            <p>{{ currentProduct.count }}</p>
          </div>
        </template>
      </BaseModal>
    </div>

    <div class="home-page__container">
      <div class="home-cart" v-for="product in productList" :key="product.id">
        <div class="image-wrap">
          <img
            class="image-wrap__image"
            @click="setProductAsCurrent(product)"
            :src="product.images[0]"
            alt=""
          />
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
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import TheFilters from "@/components/TheFilters.vue";
import BaseModal from "@/components/BaseModal.vue";
import { IProduct } from "@/interfaces/products";
import { Carousel, Slide } from "vue-carousel";

@Component({
  components: {
    BaseButton,
    TheFilters,
    BaseSelect,
    BaseModal,
    Carousel,
    Slide,
  },
})
export default class HomePage extends Vue {
  currentSlide = 1;
  widthWindow = 5;
  isModalVisible = false;

  get currentProduct(): IProduct {
    return this.$store.state.products.currentProduct;
  }

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
      params: {
        name: product.title,
      },
    });
    this.$store.commit("products/setCurrentProduct", product);
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
  overflow: hidden;

  .home-carousel {
    margin-top: 16px;
    text-align: center;

    &__wrapper {
      min-height: 300px;
      border-radius: 24px;
      margin: 16px;

      &:hover {
        cursor: pointer;
      }
      .item-content {
        box-shadow: 0 0 0 4px $black inset;
        padding: 10px 0;
        background-color: #1d1d1d;
        border-radius: 16px;

        .product-title {
          font-size: 14px;
          font-weight: 500;
          min-height: 40px;
        }

        .product-brand {
          font-size: 14px;
          font-weight: 300;
        }

        .image-wpapper__item {
          border-radius: 8px;
          margin: 8px;
          width: auto;
          height: 200px;
          transition: 0.5s;

          &:hover {
            transform: scale(0.95);
          }
        }
        .product__price-actual {
          color: $red-price;
          margin-top: 12px;
        }
      }
    }
  }

  .current-product__modal {
    display: flex;
    margin: 16px;
    justify-content: center;
    align-items: center;
    .current-product__wrapper {
      max-width: 900px;
      width: 100%;
      top: 50px;
      margin: 16px;

      background-color: $grey;
      .product-content {
        display: flex;
        justify-content: space-around;
        margin-top: 24px;
        width: 100%;

        &__carousel-wrapper {
          text-align: center;
          width: 400px;
          .image-wpapper {
            display: flex;
            flex-direction: column;

            &__item {
              max-width: auto;
              height: 350px;
              border-radius: 8px;
              border-radius: 16px;
              padding: 10px;
            }
          }
        }
        .content__characteristics {
          max-width: 350px;

          .characteristics__description {
            margin: 10px 0;
          }
          .characteristics {
            width: 100%;
            list-style: none;
          }
          .buttons {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-top: 10px;
            .button {
              margin-bottom: 20px;
            }
          }
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
      border-radius: 24px;
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
        border-radius: 16px;
        transition-duration: 0.5s;
        display: flex;
        justify-content: center;
        align-items: center;

        &:hover {
          border-radius: 16px;

          .image-wrap__image {
            transform: scale(1.1);
          }
        }

        &__image {
          object-fit: cover;
          object-position: center;
          height: 90%;
          width: auto;
          transition: 0.5s;
        }
      }

      &__description {
        padding: 15px 15px;
        margin-bottom: 16px;
        height: 95px;
        overflow: hidden;
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
        }
      }
    }

    .current-product__modal {
      .current-product__wrapper {
        .product-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 0;
        }
      }
    }
    .home-page__container {
      padding-top: 10px;
    }
  }
}

@media (max-width: 480px) {
  .home-page {
    .home-carousel {
      &__wrapper {
        .item-content {
          .image-wpapper__item {
            width: auto;
            height: 160px;
          }
        }
      }
    }
  }
}

@media (max-width: 440px) {
  .home-page {
    .home-carousel {
      &__wrapper {
        .item-content {
          .image-wpapper__item {
            width: auto;
            height: 120px;
          }
        }
      }
    }
  }
}
</style>
