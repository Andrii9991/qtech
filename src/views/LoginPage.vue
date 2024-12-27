<template>
  <div class="login-page">
    <h2 class="login-page__title">Login</h2>

    <div class="content">
      <BaseInput
        v-model="email"
        class="content__input"
        @checkField="checkField('email')"
        :isError="emailError"
        label="Email"
        placeholder="Example@email.com"
        errorMsg="The email must be more than 6 characters"
      />

      <BaseInput
        v-model="password"
        class="content__input"
        @checkField="checkField('password')"
        :isError="passwordError"
        label="Password"
        placeholder="Enter password"
        type="password"
        errorMsg="The password must be more than 6 characters"
      />

      <div class="content__buttons">
        <BaseButton
          class="login-button"
          @click.native="loginAction"
          :isDisebled="isLoginButtonDisabled"
          styleButton="black"
          text="Login"
        />
        <div class="divider">
          <div class="line"></div>
          <span class="helper-logic">or </span>
          <div class="line"></div>
        </div>

        <BaseButton
          class="googleLogin-button"
          @click.native="googleLoginAction"
          styleButton="light-blue"
          text="Login with Google"
          :iconVisible="true"
        >
        </BaseButton>
      </div>
      <div class="sign-up_route">
        <span class="title_sign-in">Not registered?</span>
        <router-link class="login-link" :to="{ name: 'SignUpPage' }">
          Sign up now
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { login, googleAuth } from "@/api/mainRequests";
import { IUser } from "@/interfaces/users";
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseAccordion from "@/components/BaseAccordion.vue";
import "primeicons/primeicons.css";

@Component({
  components: {
    BaseButton,
    BaseInput,
    BaseAccordion,
  },
})
export default class LoginPage extends Vue {
  isActive = false;
  emailError = false;
  passwordError = false;

  get usersList(): IUser[] {
    return this.$store.state.user.usersList;
  }

  set username(value: string) {
    this.$store.commit("user/setUsername", value);
  }
  get username(): string {
    return this.$store.state.user.username;
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

  get isLoginButtonDisabled(): boolean {
    return this.email.length <= 2 || this.password.length <= 2;
  }

  checkField(field: string): void {
    if (field === "email") this.emailError = this.email.length <= 2;
    else if (field === "password")
      this.passwordError = this.password.length <= 2;
  }

  async loginAction(): Promise<void> {
    const { message, responseType } = await login();

    this.$toast.open({
      message: message as string,
      type: responseType as string,
      duration: 3000,
      position: "top-right",
    });

    this.$router.push({
      name: "AccountPage",
    });
  }

  async googleLoginAction(): Promise<void> {
    const { message, responseType } = await googleAuth("login");

    this.$toast.open({
      message: message as string,
      type: responseType as string,
      duration: 3000,
      position: "top-right",
    });
    this.$router.push({
      name: "AccountPage",
    });
  }

  toggle(): void {
    this.isActive = !this.isActive;
  }
}
</script>

<style scoped lang="scss">
.login-page {
  padding: 20px;
  text-align: center;
  background-color: $black;
  color: $white;
  overflow: hidden;
  height: 100vh;

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
    min-width: 400px;
    margin: 0 auto;

    @media (max-width: 767px) {
      min-width: 340px;
    }
    @media (max-width: 480px) {
      min-width: 330px;
    }

    &__input {
      margin-bottom: 16px;
    }

    &__buttons {
      display: flex;
      flex-direction: column;
      min-height: 32px;
      margin-bottom: 16px;

      .login-button {
        width: 100%;
        font-weight: 500;
      }

      .helper-logic {
        text-align: center;
        color: $black;
        font-weight: 400;
        margin: 10px 10px;
      }

      .googleLogin-button {
        width: 100%;
        font-weight: 500;
      }
    }

    .divider {
      display: flex;
      align-items: center;
      width: 100%;

      .line {
        flex: 1;
        height: 1px;
        background-color: #cfdfe2;
      }
    }

    .sign-up_route {
      display: flex;
      justify-content: center;

      .title_sign-in {
        margin-right: 6px;
        color: $black;
      }
    }
  }
  &__accordion {
    margin-top: 32px;

    .user-credentials {
      position: relative;
      display: flex;
      justify-content: space-around;
      column-gap: 16px;
      margin: 10px 0;

      &:first-child {
        margin-top: 0;
      }
      li {
        width: 50%;
        padding: 8px;
        list-style-type: none;
        justify-content: center;
      }

      .user-index {
        position: absolute;
        left: 2px;
        top: 4px;
      }
    }
  }
}
</style>
