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
        placeholder="Enter email"
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
        errorMsg="The password must be more than 2 characters"
      />

      <div class="content__buttons">
        <BaseButton
          class="login-button"
          @click.native="loginAction"
          :isDisebled="isLoginButtonDisabled"
          styleButton="black"
          text="Login"
        />
        <router-link class="login-link" :to="{ name: 'SignUpPage' }">
          Sign up now
        </router-link>
      </div>
    </div>

    <BaseAccordion
      class="login-page__accordion"
      title="You can use this credentials to log in!"
    >
      <template #description>
        <ul
          class="user-credentials"
          v-for="(user, index) in usersList"
          :key="user.username"
        >
          <p class="user-index">{{ index + 1 }}.</p>
          <li>Email: {{ user.email }}</li>
          <li>Password: {{ user.password }}</li>
        </ul>
      </template>
    </BaseAccordion>

    <InformationPopUp
      :isPopUpVisible.sync="isPopUpVisible"
      :visualStyle="popUpVisualStyle"
      :text="popUpText"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseAccordion from "@/components/BaseAccordion.vue";
import { login, getAllUsers } from "@/api/mainRequests";
import { IUser } from "@/interfaces/users";
import InformationPopUp from "@/components/InformationPopUp.vue";

@Component({
  components: {
    BaseButton,
    BaseInput,
    BaseAccordion,
    InformationPopUp,
  },
})
export default class LoginPage extends Vue {
  isActive = false;
  isPopUpVisible = false;
  popUpVisualStyle = "";
  popUpText = "";
  emailError = false;
  passwordError = false;
  timeOut: undefined | number = undefined;

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

    if (responseType === "success") {
      this.popUpVisualStyle = "green";
    } else {
      this.popUpVisualStyle = "red";
    }

    this.popUpText = message as string;
    this.isPopUpVisible = !this.isPopUpVisible;

    this.timeOut = setTimeout(() => {
      this.$router.push({
        name: "AccountPage",
      });
    }, 1500);
  }

  async created(): Promise<void> {
    const result = await getAllUsers();
    if (result.message) {
      this.popUpText = result.message as string;
      this.isPopUpVisible = !this.isPopUpVisible;
    }
  }

  beforeDestroy() {
    clearTimeout(this.timeOut);
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
        list-style-type: none;
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
