<template>
  <div class="product-view-page">
    <div class="product-view-page__content">
      <div class="carousel__wrapper">
        <carousel
          class="image-wpapper"
          v-model="currentSlide"
          :perPage="1"
          paginationColor="#ffffff"
          paginationActiveColor="#ffffff"
          :centerMode="true"
          :adjustableHeight="true"
          :autoplay="true"
          :autoplayTimeout="4000"
          :loop="true"
        >
          <slide v-for="image in currentProduct.images" :key="image">
            <img class="image-wpapper__item" :src="image" alt="product-image" />
          </slide>
        </carousel>
      </div>
      <div class="content__wrapper">
        <span class="product__rating-line">RATING</span>
        <h3 class="product__title">{{ currentProduct.title }}</h3>
        <h4 class="product__description">{{ currentProduct.description }}</h4>
        <span class="product__price">{{ currentProduct.price }}$</span>
        <div class="buttons">
          <div class="buttons__wrapper">
            <BaseButton
              class="buy-button button"
              styleButton="red"
              text="BUY NOW"
            />
            <BaseButton
              class="bag-button button"
              @click.native="addToCart"
              :isDisebled="(currentProduct.count || 0) > 0 ? true : false"
              :text="
                (currentProduct.count || 0) > 0 ? 'IN CART' : 'ADD TO CART'
              "
            />
          </div>
          <div class="icons__wrapper">
            <div class="reviews-button">
              <img
                class="rewiews-icon"
                src="../design/images/product/chat_bubble.svg"
                alt=""
              />
              <span class="reviews-title">Reviews</span>
            </div>
            <div class="favorite-button">
              <img
                class="favorite-icon"
                src="../design/images/product/favourite 3.svg"
                alt=""
              />
              <span class="favorite-title">Favorite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import { IProduct } from "@/interfaces/products";
import { IComment } from "@/interfaces/comments";
import { Carousel, Slide } from "vue-carousel";

@Component({
  components: {
    BaseButton,
    Carousel,
    Slide,
  },
})
export default class ProductViewPage extends Vue {
  currentSlide = 1;

  get currentProduct(): IProduct {
    return this.$store.state.products.currentProduct;
  }
  get count(): IProduct {
    return this.$store.getters["cart/getCountsArray"];
  }

  get allComments(): IComment[] {
    return this.$store.state.comments.allComments;
  }

  get randomComments() {
    const randomComments = [...this.allComments];

    randomComments.sort(() => Math.random() - 0.5);

    return randomComments.slice(0, 5);
  }

  addToCart(): void {
    this.$store.commit("cart/addToCart", this.currentProduct);
    this.$store.commit("products/increament", this.currentProduct.id);
  }

  increament(): void {
    if (this.currentSlide === this.currentProduct.images.length - 1)
      this.currentSlide = 0;
    else this.currentSlide++;
  }

  deacreamnet(): void {
    if (this.currentSlide > 0) this.currentSlide--;
  }

  mounted() {
    console.log(this.currentProduct);
  }
}
</script>

<style lang="scss">
.product-view-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 106px 86px;
  color: $white;
  margin-top: 16px;
  width: 1240px;
  margin-top: 126px;
  height: 840px;
  border-radius: 50px;
  background-color: $grey;

  &__title {
    margin-bottom: 16px;
  }

  &__content {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
    width: 100%;

    .carousel__wrapper {
      text-align: center;
      width: 545px;
      height: 572px;
      border-radius: 50px;
      background-color: $white;
      box-shadow: 2px 6px 6px $black;

      .image-wpapper {
        display: flex;

        &__item {
          height: 570px;
          width: auto;
          border-radius: 8px;
          border-radius: 16px;
          padding: 10px;
        }
      }
    }

    .content__wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      margin-left: 60px;

      .product__rating-line {
        margin-bottom: 24px;
      }

      .product__title {
        font-size: 24px;
        font-weight: 600;
        margin-bottom: 24px;
      }

      .product__description {
        font-size: 16px;
        font-weight: 200;
        margin-bottom: 70px;
      }

      .product__price {
        font-size: 32px;
        font-weight: 700;
        margin-bottom: 32px;
        color: #c82121;
      }

      .buttons {
        display: grid;
        grid-template-columns: 70% 30%;
        gap: 16px; /* Відстань між секціями */
        align-items: center;
        .buttons__wrapper {
          display: flex;
          flex-direction: column;

          .button {
            margin-bottom: 20px;
            width: 300px;
            height: 64px;
            border-radius: 50px;
            font-size: 24px;
            font-weight: 600;
          }
        }

        .icons__wrapper {
          display: flex;
          flex-direction: column;
          margin-left: 30px;

          .reviews-button {
            display: flex;
            flex-direction: column;
            margin-bottom: 26px;

            .rewiews-icon {
              margin-bottom: 6px;
              width: 39px;
              height: 39px;
            }

            .reviews-title {
              font-size: 12px;
              font-weight: 200;
            }
          }

          .favorite-button {
            display: flex;
            flex-direction: column;
            // margin-top: 16px;

            .favorite-icon {
              margin-bottom: 6px;
              width: 39px;
              height: 39px;
            }

            .favorite-title {
              font-size: 12px;
              font-weight: 200;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 767px) {
  .product-view-page {
    &__description {
      max-width: 300px;
      width: 100%;
      white-space: pre-wrap;
    }

    &__content {
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .content__wrapper {
        .buttons {
          margin: 10px 0 0 0;
        }
      }
    }
  }
}
</style>
