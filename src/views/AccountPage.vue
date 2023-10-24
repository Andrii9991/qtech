<template>
  <div class="account-page">
    <div class="account-page__container">
      <div class="user-navigation">
        <img class="user-navigation__image" :src="user.image" alt="" />
        <h3>{{ user.firstName }} {{ user.lastName }}</h3>
      </div>
      <div class="user-information">
        <h3>Username: {{ user.username }}</h3>
        <h3>Gender: {{ user.gender }}</h3>
        <h3>Email: {{ user.email }}</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AccountPage extends Vue {
  get user() {
    return this.$store.state.user;
  }
}
</script>
<style scoped lang="scss">
.account-page {
  display: flex;
  justify-content: center;
  margin-top: 16px;
  color: $white;
  min-height: 100vh;
  .account-page__container {
    display: flex;
    justify-content: space-around;
    max-width: 900px;
    width: 100%;
    background-color: $grey-lite;
    border-radius: 20px;
    box-shadow: 0 5px 15px 0 $grey-lite;

    .user-navigation {
      display: flex;
      flex-direction: column;
      align-items: center;

      &__image {
        max-width: 200px;
        height: 200px;
        border-radius: 20px;
        box-shadow: 0 0 0 4px $black;
        margin: 16px;
        padding: 8px;
      }
    }
    .user-information {
    }
  }
}
</style>
