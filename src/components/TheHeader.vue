<template>
  <div class="wrapper__header">
    <header class="header">
      <nav class="navigation">
        <router-link class="navigation__link" :to="{ name: 'HomePage' }"
          >Home</router-link
        >
        <router-link class="navigation__link" :to="{ name: 'CatalogPage' }"
          >Catalog</router-link
        >
        <router-link class="navigation__link" :to="{ name: 'ContactPage' }"
          >Contact</router-link
        >
      </nav>

      <h1 class="header__title">Техно-Люкс</h1>

      <BaseButton
        class="login-btn"
        @click.native="login"
        text="Зареєструватися"
      />
    </header>
    <div class="header2">
      <img class="test" src="@/design/images/test.png" alt="" />

      <BaseButton class="header2__button" text="Каталог" />

      <div class="header2__search">
        <input class="header2__search" type="text" placeholder="Пошук" />
      </div>

      <div class="header2__basket">
        <a href="">У кошик</a>
      </div>
    </div>
  </div>
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
.wrapper__header {
  max-width: 1330px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 32px;
    color: $orange;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    max-height: 40px;

    .navigation {
      &__link {
        padding: 10px;
        text-decoration: none;
        min-width: 300px;
      }
    }

    &__title {
      color: $cream;
      min-width: 300px;
    }

    &__search {
      border-radius: 8px;
      padding: 8px;
      box-shadow: inset 0px 0px 0px 2px $black;
    }
  }

  .header2 {
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 1330px;
    background: #0f0f0f;

    max-height: 55px;
  }

  .test {
    max-width: 32px;
    max-height: 32px;
  }
}
</style>
