<template>
  <div id="app">
    <TheHeader />
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheHeader from "@/components/TheHeader.vue";
import { getAllProducts } from "@/api/mainRequests";
import store from "./store";

@Component({
  components: {
    TheHeader,
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
    this.synchronizeStateAndStore();
    // localStorage.setItem("name", "Kurulo");
    // const item = localStorage.getItem("name");
    // localStorage.clear();
    // console.log(item);
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
</style>
