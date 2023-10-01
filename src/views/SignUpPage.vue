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

      <div class="sign-up__buttons">
        <BaseButton text="Зареєструватись" />
        <BaseButton text="Увійти" />
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
  background-color: #f8f8f8;
  padding: 20px;
  text-align: center;

  &__title {
    color: $grey;
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
  }
}

.sign-up__buttons {
  display: flex;
  justify-content: space-between;

  // .login-button {
  //   background-color: $orange;
  //   color: #fff;
  //   font-size: 18px;
  //   border: none;
  //   border-radius: 4px;
  //   padding: 10px 20px;
  //   cursor: pointer;
  //   transition: background-color 0.3s;

  //   &:hover {
  //     background-color: #e64a19;
  //     border-radius: 8px;
  //   }
  // }
}
</style>
