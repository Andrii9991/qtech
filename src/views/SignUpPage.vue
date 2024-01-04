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
        label="Password (minimum 8 symbols)"
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

        <router-link class="sign-in-link" :to="{ name: 'LoginPage' }">
          I have an account
        </router-link>
      </div>
    </div>
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
import { registration } from "@/api/mainRequests";
import InformationPopUp from "@/components/InformationPopUp.vue";

@Component({
  components: {
    BaseButton,
    BaseInput,
    InformationPopUp,
  },
})
export default class SignUpPage extends Vue {
  isPopUpVisible = false;
  popUpText = "";
  popUpVisualStyle = ""; // в залежності який responseType такий буде і колір

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
    if (responseType !== "succses") {
      this.popUpVisualStyle = "red";
    } else {
      this.popUpVisualStyle = "green";
    }
    //якщо саксес то пусті. або червоний колір
    this.popUpText = message as string;
    this.isPopUpVisible = !this.isPopUpVisible;

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
