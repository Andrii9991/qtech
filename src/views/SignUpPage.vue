<template>
  <div class="signup-page">
    <h2 class="signup-page__title">Реєстрація</h2>
    <form class="content-window">
      <div class="content-window__group">
        <label class="content-window__label" for="name">Ім'я</label>
        <input
          class="content-window__input"
          v-model="name"
          type="text"
          placeholder="Введіть ім'я"
        />
      </div>

      <div class="content-window__group">
        <label class="content-window__label" for="email">Email</label>
        <input
          class="content-window__input"
          v-model="email"
          type="email"
          placeholder="Введіть Email"
        />
      </div>

      <div class="content-window__group">
        <label class="content-window__label" for="password">Пароль</label>
        <input
          class="content-window__input"
          v-model="password"
          type="password"
          placeholder="Введіть пароль"
        />
      </div>

      <div class="content-window__group">
        <label class="content-window__label" for="password"
          >Підтвердіть пароль</label
        >
        <input
          class="content-window__input"
          v-model="password"
          type="password"
          placeholder="Підтвердіть пароль"
        />
      </div>
      <div class="signUp__buttons">
        <BaseButton
          class="signup-button login-button"
          text="Зареєструватись"
        ></BaseButton>
        <BaseButton
          class="login-button login-button"
          text="Увійти"
        ></BaseButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import { IProduct } from "@/interfaces/products";

@Component({
  components: {
    BaseButton,
  },
})
export default class SignUpPage extends Vue {}
</script>

<style scoped lang="scss">
.signup-page {
  background-color: #f8f8f8;
  padding: 20px;
  text-align: center;

  &__title {
    color: $grey;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .content-window {
    background-color: $white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: left;
    max-width: 400px;
    margin: 0 auto;

    &__group {
      margin-bottom: 15px;

      .content-window__label {
        font-size: 16px;
        color: $black;
        display: block;
        margin-bottom: 5px;
      }

      .content-window__input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        color: $black;
        border-radius: 4px;
        font-size: 16px;
      }
    }
  }
}

.signUp__buttons {
  display: flex;
  justify-content: space-between;

  .login-button {
    background-color: $orange;
    color: #fff;
    font-size: 18px;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #e64a19;
      border-radius: 8px;
    }
  }
}
</style>
