<template>
  <div class="login-page">
    <h2 class="login-page__title">Login</h2>

    <div class="content">
      <BaseInput
        v-model="name"
        class="content__input"
        :isError="true"
        label="Name"
        placeholder="Enter name"
        errorMsg="The name must be more than 2 characters"
      />

      <BaseInput
        class="content__input"
        v-model="password"
        label="Password"
        placeholder="Enter password"
        type="password"
      />

      <div class="content__buttons">
        <BaseButton
          class="login-button"
          :isDisebled="true"
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
}
</script>

<style scoped lang="scss">
.login-page {
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
