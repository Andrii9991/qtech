<template>
  <div class="cart-page">
    <ul class="list">
      <li class="list__item" v-for="item in userCart" :key="item.id">
        <img class="item__image" :src="item.images[0]" alt="" />
        <h3 class="item__title">{{ item.title }}</h3>
        <div class="action">
          <h3 class="action__close" @click="removeItem(item.id)">X</h3>
          <div class="action__counter">
            <BaseButton @click.native="increament(item.id)" text="+" />
            <p>{{ item.count }}</p>
            <BaseButton @click.native="decreamnet(item.id)" text="-" />
            <h5 class="price">{{ item.price * (item.count || 1) }} $</h5>
          </div>

          <BaseButton
            class="action__buy"
            text="Proceed to checkout"
            styleButton="red"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { IProduct } from "@/interfaces/products";
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";

@Component({
  components: {
    BaseButton,
  },
})
export default class CartPage extends Vue {
  count = 0;

  get userCart(): IProduct[] {
    return this.$store.state.cart.userCart;
  }

  removeItem(itemId: number): void {
    this.$store.commit("cart/removeFromCart", itemId);
  }

  increament(itemId: number): void {
    this.$store.commit("cart/increament", itemId);
  }

  decreamnet(itemId: number): void {
    this.$store.commit("cart/decreament", itemId);
  }
}
</script>
<style scoped lang="scss">
.cart-page {
  display: flex;
  justify-content: center;
  margin-top: 16px;
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
      .action {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        height: 100%;

        &__close {
          display: flex;
          justify-content: center;
          margin: 10px 0;
          cursor: pointer;
          transition-duration: 0.5s;

          &:hover {
            transform: scale(1.04);
          }
        }

        &__counter {
          margin: 10px 0;
        }

        &__buy {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
