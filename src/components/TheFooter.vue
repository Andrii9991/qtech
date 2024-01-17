<template>
  <div class="footer">
    <div class="footer__wrappper"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TheFooter extends Vue {}
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: $grey;
  padding: 0 16px;
  height: 200px;

  &__wrappper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1240px;
  }
}
</style>
