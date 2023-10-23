<template>
  <div class="cart-page">
    <ul class="list">
      <li class="list__item" v-for="item in userCart" :key="item.id">
        <p>{{ item.title }}</p>
        <p>X</p>
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
}
</script>
<style scoped lang="scss">
.cart-page {
  color: $white;
  .list {
    &__item {
      display: flex;
    }
  }
}
</style>
