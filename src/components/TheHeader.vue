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
export default class TheHeader extends Vue {}
</script>

<style scoped lang="scss">
.wrapper__header {
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
  }
}
</style>
