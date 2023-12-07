<template>
  <div class="catalog-page">
    <TheFilters
      class="catalog-page__filters"
      @sortCategory="onSortCategory"
      @sortPrice="onSortPrice"
    />

    <div class="catalog-page__container">
      <div
        class="catalog-cart"
        v-for="product in productList"
        :key="product.id"
      >
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
import { IProduct } from "@/interfaces/products";

@Component({
  components: {
    BaseButton,
    TheFilters,
    BaseSelect,
  },
})
export default class CatalogPage extends Vue {
  sortCategory = "";
  sortPrice = "";

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
    }

    return filtredProducts?.length > 0 ? filtredProducts : storeProdcuts;
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

  onSortCategory(category: string): void {
    this.sortCategory = category;
    this.sortPrice = "Recommended";
  }

  onSortPrice(price: string): void {
    this.sortPrice = price;
    this.sortCategory = "All";
  }
}
</script>
<style scoped lang="scss">
.catalog-page {
  position: relative;
  color: $white;
  display: flex;
  flex-direction: column;

  &__filters {
    margin: 0px;
    padding: 0px;
  }

  &__container {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
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
</style>
