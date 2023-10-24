<template>
  <div class="cart-page">
    <ul class="list">
      <li class="list__item" v-for="item in userCart" :key="item.id">
        <img class="item__image" :src="item.images[1]" alt="" />
        <h3 class="item__title">{{ item.title }}</h3>
        <h3 @click="removeItem(item)">X</h3>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { IProduct } from "@/interfaces/products";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class CartPage extends Vue {
  get userCart(): IProduct[] {
    return this.$store.state.cart.userCart;
  }

  removeItem(item: IProduct): void {
    this.$store.commit("cart/removeFromCart", item);
  }
}
</script>
<style scoped lang="scss">
.cart-page {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  background-color: $grey-lite;
  color: $white;
  min-height: 100vh;

  .list {
    display: flex;
    flex-direction: column;
    width: 1230px;

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      list-style-type: none;
      background-color: $grey;
      border-radius: 20px;
      padding: 0 10px;
      margin: 10px 0;
      .item__image {
        max-width: 150px;
        height: 150px;
        border-radius: 20px;
        padding: 10px;
      }
    }
  }
}
</style>
