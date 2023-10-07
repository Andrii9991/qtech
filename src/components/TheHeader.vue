<template>
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

    <h1 class="header__title">QTech</h1>

    <BaseButton
      class="header__button"
      @click.native="login"
      size="small"
      text="Зареєструватись"
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
  padding: 16px 32px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-height: 40px;
  min-width: 1200px;

  .navigation {
    &__link {
      padding-right: 10px;
      text-decoration: none;
    }
  }

  &__title {
    display: flex;
    justify-content: center;
    color: $cream;
    padding: 10px;
  }

  &__button {
    padding: 10px;
  }
}
</style>
