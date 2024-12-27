<template>
  <div class="sign-up-page">
    <h2 class="sign-up-page__title">Create an account</h2>

    <div class="content">
      <BaseInput
        class="content__input"
        v-model="username"
        label="Username"
        placeholder="Enter username"
        type="username"
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
        label="Password (minimum 6 symbols)"
        placeholder="Enter password"
        type="password"
      />

      <div class="content__buttons">
        <BaseButton
          class="sign-up-button"
          @click.native="signUp"
          styleButton="black"
          text="Sign Up"
        />
        <div class="divider">
          <div class="line"></div>
          <span class="helper-logic">or </span>
          <div class="line"></div>
        </div>

        <BaseButton
          class="googleLogin-button"
          @click.native="googleSignUpAction"
          styleButton="light-blue"
          text="Sign up with Google"
          :iconVisible="true"
        >
        </BaseButton>
        <router-link class="sign-in-link" :to="{ name: 'LoginPage' }">
          I have an account
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { registration, googleAuth } from "@/api/mainRequests";
import BaseButton from "@/components/BaseButton.vue";
import BaseInput from "@/components/BaseInput.vue";

@Component({
  components: {
    BaseButton,
    BaseInput,
  },
})
export default class SignUpPage extends Vue {
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
  async signUp(): Promise<void> {
    const { message, responseType } = await registration();

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

  async googleSignUpAction(): Promise<void> {
    const { message, responseType } = await googleAuth("signup");

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
}
</script>

<style scoped lang="scss">
.sign-up-page {
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
    min-width: 400px;
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

      .divider {
        display: flex;
        align-items: center;
        width: 100%;

        .line {
          flex: 1;
          height: 1px;
          background-color: #cfdfe2;
        }
        .helper-logic {
          text-align: center;
          color: $black;
          font-weight: 400;
          margin: 10px 10px;
        }
      }
      .sign-in-link {
        text-align: center;
        color: $black;
        text-decoration: none;
        margin-top: 20px;
      }
    }
  }
}
</style>
