<template>
  <div v-if="isPopUpVisible" :class="['information-popup', visualStyle]">
    <p>{{ text }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class InformationPopUp extends Vue {
  @Prop({ default: "" }) text!: string;
  @Prop({ default: "" }) visualStyle!: string;
  @Prop({ default: false }) isPopUpVisible!: boolean;

  created(): void {
    setTimeout(() => {
      this.$emit("update:isPopUpVisible", false);
    }, 3000);
  }
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

.green {
  background-color: $green;
}
</style>
