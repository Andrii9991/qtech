<template>
  <div class="login-page">
    <h2 class="login-page__title">Login</h2>

    <div class="content">
      <BaseInput
        v-model="username"
        class="content__input"
        @checkField="checkField('username')"
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
      title="You can't use created account. Use these credentials instead"
    >
      <template #description>
        <ul
          class="user-credentials"
          v-for="user in usersList"
          :key="user.username"
        >
          <h5>User №{{ user.id }}</h5>
          <li>Username: {{ user.username }}</li>
          <li>Password: {{ user.password }}</li>
        </ul>
      </template>
    </BaseAccordion>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseAccordion from "@/components/BaseAccordion.vue";
import { login, getAllUsers } from "@/api/mainRequests";
import { IUser } from "@/interfaces/users";

@Component({
  components: {
    BaseButton,
    BaseInput,
    BaseAccordion,
  },
})
export default class LoginPage extends Vue {
  nameError = false;
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

  set password(value: string) {
    this.$store.commit("user/setPassword", value);
  }
  get password(): string {
    return this.$store.state.user.password;
  }

  get isLoginButtonDisabled(): boolean {
    return this.username.length <= 2 || this.password.length <= 2;
  }

  checkField(field: string): void {
    if (field === "username") this.nameError = this.username.length <= 2;
    else if (field === "password")
      this.passwordError = this.password.length <= 2;
  }

  async loginAction(): Promise<void> {
    await login();

    this.$router.push({
      name: "AccountPage",
    });
  }

  created(): void {
    getAllUsers();
  }
}
</script>

<style scoped lang="scss">
.login-page {
  padding: 20px;
  text-align: center;
  color: $white;
  min-height: 100vh;

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
      display: flex;
      column-gap: 16px;
      margin: 10px 0;
    }

    li {
      list-style-type: none;
    }
  }
}
</style>
