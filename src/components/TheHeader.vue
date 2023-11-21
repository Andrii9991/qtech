<template>
  <header class="header">
    <nav class="navigation">
      <router-link
        class="navigation__link"
        active-class="active-link"
        :to="{ name: 'HomePage' }"
      >
        <img class="logo" src="@/design/images/logo.svg" alt="logo" />
      </router-link>

      <router-link
        v-for="link in linksList"
        :key="link.name"
        class="navigation__link"
        :to="{ name: link.name }"
        active-class="active-link"
      >
        <div class="icon-wrapper">
          <img
            class="icon-wrapper__image"
            :src="require(`@/design/images/${link.img}.svg`)"
            alt=""
          />
          <p>{{ link.title }}</p>
        </div>
      </router-link>
    </nav>
    <div class="actions">
      <BaseButton
        class="header__button"
        @click.native="authAction"
        size="small"
        :text="authButtonText"
      />

      <router-link
        class="navigation__link"
        active-class="active-link"
        :to="{ name: 'CartPage' }"
      >
        <img
          class="counter-logo"
          src="@/design/images/cartIcon.svg"
          alt="logo"
        />
        <h6 class="counter" v-if="countCart > 0">
          {{ countCart }}
        </h6>
      </router-link>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BaseButton from "@/components/BaseButton.vue";

@Component({
  components: {
    BaseButton,
  },
})
export default class TheHeader extends Vue {
  linksList = [
    {
      name: "CatalogPage",
      title: "Catalog",
      img: "catalogIcon",
    },
    {
      name: "ContactPage",
      title: "Contact",
      img: "contactIcon",
    },
  ];

  get authButtonText() {
    return this.$store.state.user.isAuthenticated ? "Profile" : "Sign Up";
  }

  get countCart() {
    return this.$store.getters["cart/getCartCount"];
  }

  authAction(): void {
    if (this.$route.name === "LoginPage") return;
    this.$router.push({
      name: `${
        this.$store.state.user.isAuthenticated ? "AccountPage" : "LoginPage"
      }`,
    });
  }
}
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $grey;
  padding: 0 16px;
  height: 56px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  .navigation {
    display: flex;

    &__link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: $white;
      padding: 4px 8px;
      transition-duration: 0.5s;

      &:hover:not(:first-child) {
        background-color: $black;
        color: $white;
        border-radius: 40px;
      }

      .logo {
        width: 77px;
        height: 27px;
      }

      .icon-wrapper {
        display: flex;
        align-items: center;
        padding: 6px;
        border-radius: 8px;

        &__image {
          width: 30px;
          height: 24px;
          margin-right: 10px;
        }
      }
    }

    .navigation__link:not(:last-child) {
      margin-right: 16px;
    }

    .active-link {
      color: $blue;
    }
  }
  .actions {
    display: flex;

    .navigation__link {
      margin-left: 16px;
      position: relative;
      .counter-logo {
        width: 77px;
        height: 27px;
      }

      .counter {
        background-color: $red;
        border-radius: 50px;
        padding: 0 6px;
        // min-width: 12px;
        position: absolute;
        right: 20px;
        top: 0px;
      }
    }
  }
}
</style>
