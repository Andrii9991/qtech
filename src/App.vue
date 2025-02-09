<template>
  <div id="app">
    <TheHeader />
    <div class="page">
      <div class="page__wrapper">
        <router-view />
      </div>
    </div>
    <TheFooter />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import { getAllProducts, getAllComments } from "@/api/mainRequests";

@Component({
  components: {
    TheHeader,
    TheFooter,
  },
})
export default class App extends Vue {
  unSubscribe!: () => void;

  synchronizeStateAndStore() {
    this.unSubscribe = this.$store.subscribe((mutation, state) => {
      localStorage.setItem("store", JSON.stringify({ ...state }));
    });
  }

  async mounted() {
    await getAllProducts();
    await getAllComments();
    this.synchronizeStateAndStore();
  }

  destroyed() {
    this.unSubscribe();
  }
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background-color: $black;
  font-family: $font-family-default;
  font-style: normal;
  font-weight: 400;
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 1240px;
  }
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background-color: #ebebeb;
  -webkit-border-radius: 20px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #626466;
}
</style>
