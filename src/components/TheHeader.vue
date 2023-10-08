<template>
  <header class="header">
    <nav class="navigation">
      <router-link
        class="navigation__link"
        active-class="active-link"
        :to="{ name: 'HomePage' }"
      >
        <img class="logo" src="@/design/images/logo.png" alt="logo" />
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
            :src="require(`@/design/images/${link.img}.png`)"
            alt=""
          />
          <p>{{ link.title }}</p>
        </div>
      </router-link>
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
  linksList = [
    {
      name: "CatalogPage",
      title: "Catalog",
      img: "catalogIcon",
    },
    {
      name: "ContactPage",
      title: "Contact",
      img: "catalogIcon",
    },
  ];

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

      &:hover {
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
        padding: 6px;
        border-radius: 8px;

        &__image {
          width: 24px;
          height: 20px;
          margin-right: 10px;
        }
      }
    }

    .navigation__link:not(:last-child) {
      margin-right: 16px;
    }

    .active-link {
      color: $red;
    }
  }
}
</style>
