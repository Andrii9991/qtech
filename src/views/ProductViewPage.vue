<template>
  <div class="product-view-page">
    <h2 class="product-view-page__title">{{ currentProduct.title }}</h2>
    <p class="product-view-page__description">
      {{ currentProduct.description }}
    </p>
    <div class="product-view-page__content">
      <div class="carousel__wrapper">
        <carousel
          :perPage="1"
          paginationColor="#ffffff"
          paginationActiveColor="#ffffff"
          :autoplay="true"
          :autoplayTimeout="4000"
          :loop="true"
          :navigationEnabled="true"
          v-model="currentSlide"
          class="image-wpapper"
        >
          <slide v-for="image in currentProduct.images" :key="image">
            <img class="image-wpapper__item" :src="image" alt="product-image" />
          </slide>
        </carousel>
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
    <div class="product-view-page__comments">
      <h2>Comments</h2>
      <div class="comment" v-for="comment in randomComments" :key="comment.id">
        <h3 class="comment__user">{{ comment.user.username }}:</h3>
        <p class="comment__body">{{ comment.body }}</p>
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

    .carousel__wrapper {
      max-width: 400px;
    }

    .image-wpapper {
      display: flex;
      flex-direction: column;

      &__item {
        max-width: 250px;
        height: 250px;
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
  &__comments {
    margin-top: 20px;
    .comment {
      box-shadow: 0 0 0 1px $white inset;
      margin-bottom: 10px;
      border-radius: 8px;
      width: 100vh;
      padding: 8px;
      color: $white;

      &__user {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
