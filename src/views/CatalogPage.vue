<template>
  <div class="catalog-page">
    <TheFilters
      class="catalog-page__filters"
      @sortCategory="onSortCategory"
      @sortPrice="onSortPrice"
      @priceChange="onPriceChange"
    />

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

    <div class="catalog-page__container">
      <div
        class="catalog-cart"
        v-for="product in productList"
        :key="product.id"
      >
        <div class="image-wrap">
          <img
            class="image-wrap__image"
            @click="setProductAsCurrent(product)"
            :src="product.images[0]"
            alt=""
          />
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
import BaseModal from "@/components/BaseModal.vue";
import TheFilters from "@/components/TheFilters.vue";
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
export default class CatalogPage extends Vue {
  sortCategory = "";
  sortPrice = "";
  isModalVisible = false;
  currentSlide = 1;

  minRangePrice = 0;
  maxRangePrice = 0;

  get productList(): IProduct[] {
    const storeProdcuts = this.$store.state.products.productList;
    let filtredProducts;

    if (
      this.sortCategory === "smartphones" ||
      this.sortCategory === "laptops"
    ) {
      filtredProducts = storeProdcuts.filter(
        (item: IProduct) => item.category === this.sortCategory
      );
    } else if (this.sortPrice === "Price low to high") {
      filtredProducts = [...storeProdcuts];
      filtredProducts.sort((a: IProduct, b: IProduct) => a.price - b.price);
    } else if (this.sortPrice === "Price high to low") {
      filtredProducts = [...storeProdcuts];
      filtredProducts.sort((a: IProduct, b: IProduct) => b.price - a.price);
    } else if (this.sortPrice === "All") {
      filtredProducts = [];
    } else if (this.minRangePrice >= 0) {
      filtredProducts = storeProdcuts.filter((item: IProduct) => {
        return (
          item.price >= this.minRangePrice && item.price <= this.maxRangePrice
        );
      });
    }

    return filtredProducts?.length > 0 ? filtredProducts : storeProdcuts;
  }
  get currentProduct(): IProduct {
    return this.$store.state.products.currentProduct;
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
    this.isModalVisible = true;
    this.$store.commit("products/setCurrentProduct", product);
  }

  onSortCategory(category: string): void {
    this.sortCategory = category;
    this.sortPrice = "Recommended";
  }

  onSortPrice(price: string): void {
    this.sortPrice = price;
    this.sortCategory = "All";
  }

  onPriceChange(value: Array<number>): void {
    this.minRangePrice = value[0];
    this.maxRangePrice = value[1];
  }
  onCloseModal() {
    this.isModalVisible = !this.isModalVisible;
  }
}
</script>
<style scoped lang="scss">
.catalog-page {
  position: relative;
  color: $white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;

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
              max-width: 350px;
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
            margin-bottom: 10px;
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
    .catalog-cart {
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
  .catalog-page__container {
    padding-top: 10px;
  }
}
</style>
