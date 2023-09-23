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

    <h1 class="header__title">Техно-Люкс</h1>

    <BaseButton @click.native="login" text="Зареєструватися" />
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
    console.log("s");
  }
}
</script>

<style scoped lang="scss">
.header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 36px;
  color: $orange;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  .navigation {
    &__link {
      padding: 10px;
      text-decoration: none;
    }
  }

  &__title {
    position: absolute;
    left: 40%;
    color: $cream;
  }

  &__search {
    border-radius: 8px;
    padding: 8px;
    box-shadow: inset 0px 0px 0px 2px $black;
  }
}
</style>
