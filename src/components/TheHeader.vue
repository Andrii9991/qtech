<template>
  <header class="header">
    <nav class="navigation">
      <router-link class="navigation__link" :to="{ name: 'HomePage' }"
        ><img class="logo" src="@/design/images/logo.png" alt="logo"
      /></router-link>

      <router-link class="navigation__link" :to="{ name: 'CatalogPage' }"
        ><div class="navigation__link__icon-wrapper">
          <img
            class="catalog-icon"
            src="@/design/images/catalogIcon.png"
            alt=""
          />
          <p>Catalog</p>
        </div>
      </router-link>

      <router-link class="navigation__link" :to="{ name: 'ContactPage' }"
        >Contact</router-link
      >
    </nav>

    <BaseButton
      class="header__button"
      @click.native="login"
      size="small"
      text="Sign up"
    />
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
  login(): void {
    this.$router.push({
      name: "SignUpPage",
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
  padding: 16px 44px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-height: 56px;

  .navigation {
    display: flex;

    &__link {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: $white;

      .logo {
        width: 77px;
        height: 27px;
      }

      &__icon-wrapper {
        display: flex;
        padding: 6px;
        border-radius: 8px;
        transition: 0.8s;

        .catalog-icon {
          width: 24px;
          height: 20px;
          margin-right: 10px;
        }
        &:hover {
          background-color: $black;
          color: $white;
          border-radius: 40px;
          padding: 6px 20px;
        }
      }
    }

    .navigation__link:not(:last-child) {
      padding-right: 24px;
    }
  }
}
</style>
