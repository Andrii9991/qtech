<template>
  <div class="sign-up-page">
    <h2 class="sign-up-page__title">Create an account</h2>

    <div class="content">
      <BaseInput
        class="content__input"
        v-model="name"
        label="Name"
        placeholder="Enter name"
      />
      <BaseInput
        class="content__input"
        v-model="email"
        label="Email"
        placeholder="Enter email"
        type="email"
      />
      <BaseInput
        class="content__input"
        v-model="password"
        label="Password (minimum 8 symbols)"
        placeholder="Enter password"
        type="password"
      />

      <div class="content__buttons">
        <BaseButton class="sign-up-button" styleButton="black" text="Sign Up" />

        <router-link class="sign-in-link" :to="{ name: 'LoginPage' }">
          I have an account
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
    color: $white;
    width: 100%;
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
      justify-content: space-between;
      width: 100%;

      .sign-up-button {
        width: 100%;
        margin-bottom: 10px;
      }

      .sign-in-link {
        text-align: center;
        color: $black;
        text-decoration: none;
      }
    }
  }
}
</style>
