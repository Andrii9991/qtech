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

@Component({
  components: {
    TheHeader,
  },
})
export default class App extends Vue {
  async mounted() {
    console.log(await getAllProducts());
  }
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background-color: $gray;
  font-family: $font-family-default;
  font-style: normal;
  font-weight: 400;
}
</style>
