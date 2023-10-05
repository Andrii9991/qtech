<template>
  <div class="sign-up-page">
    <h2 class="sign-up-page__title">Реєстрація</h2>

    <div class="content">
      <BaseInput
        class="content__input"
        v-model="name"
        label="Ім'я"
        placeholder="Введіть ім'я"
      />
      <BaseInput
        class="content__input"
        v-model="email"
        label="Email"
        placeholder="Введіть email"
        type="email"
      />
      <BaseInput
        class="content__input"
        v-model="password"
        label="Пароль"
        placeholder="Введіть пароль"
        type="password"
      />

      <div class="content__buttons">
        <BaseButton class="signUp-button" text="Зареєструватись" />
        <BaseButton styleButton="true" text="Увійти" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";

@Component({
  components: {
    BaseButton,
    BaseInput,
  },
})
export default class SignUpPage extends Vue {
  set name(value: string) {
    this.$store.commit("user/setName", value);
  }
  get name(): string {
    return this.$store.state.user.name;
  }
  set email(value: string) {
    this.$store.commit("user/setEmail", value);
  }
  get email(): string {
    return this.$store.state.user.email;
  }
  set password(value: string) {
    this.$store.commit("user/setPassword", value);
  }
  get password(): string {
    return this.$store.state.user.password;
  }
}
</script>

<style scoped lang="scss">
.sign-up-page {
  background-color: $white;
  padding: 20px;
  text-align: center;

  &__title {
    color: $black;
    font-size: 24px;
    margin-bottom: 20px;
  }
  .content {
    background-color: $white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    text-align: left;
    max-width: 400px;
    margin: 0 auto;

    &__input {
      margin-bottom: 16px;
    }

    &__buttons {
      display: flex;
      min-height: 32px;
      justify-content: space-between;
    }
  }
}
</style>
