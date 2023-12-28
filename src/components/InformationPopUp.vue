<template>
  <div :class="['information-popup', { visualStyle }]">
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class InformationPopUp extends Vue {
  @Prop({ default: "" }) text!: string;
  @Prop({ default: "" }) visualStyle!: string;
}
</script>

<style scoped lang="scss">
.information-popup {
  position: fixed;
  top: 24px;
  right: 24px;
  padding: 24px;
  background-color: blue;
  color: $white;
}

.red {
  background-color: $red;
}
</style>
