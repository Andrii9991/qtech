<template>
  <div class="login-page">
    <h2 class="login-page__title">Login</h2>

    <div class="content">
      <BaseInput
        v-model="name"
        class="content__input"
        @checkField="checkField('name')"
        :isError="nameError"
        label="Name"
        placeholder="Enter name"
        errorMsg="The name must be more than 2 characters"
      />

      <BaseInput
        v-model="password"
        class="content__input"
        @checkField="checkField('password')"
        :isError="passwordError"
        label="Password"
        placeholder="Enter password"
        type="password"
        errorMsg="The password must be more than 2 characters"
      />

      <div class="content__buttons">
        <BaseButton
          class="login-button"
          :isDisebled="isLoginButtonDisabled"
          styleButton="black"
          text="Login"
        />
        <router-link class="login-link" :to="{ name: 'SignUpPage' }">
          Sign up now
        </router-link>
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
export default class LoginPage extends Vue {
  nameError = false;
  passwordError = false;

  set name(value: string) {
    this.$store.commit("user/setName", value);
  }
  get name(): string {
    return this.$store.state.user.name;
  }

  set password(value: string) {
    this.$store.commit("user/setPassword", value);
  }
  get password(): string {
    return this.$store.state.user.password;
  }

  get isLoginButtonDisabled(): boolean {
    return this.name.length <= 2 || this.password.length <= 2;
  }

  checkField(field: string): void {
    if (field === "name") this.nameError = this.name.length <= 2;
    else if (field === "password")
      this.passwordError = this.password.length <= 2;
  }
}
</script>

<style scoped lang="scss">
.login-page {
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
      flex-direction: column;
      min-height: 32px;

      .login-button {
        width: 100%;
      }
      .login-link {
        color: $black;
        text-decoration: none;
        text-align: center;
        margin-top: 10px;
      }
    }
  }
}
</style>
