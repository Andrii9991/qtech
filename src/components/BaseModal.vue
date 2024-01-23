<template>
  <div class="base-modal">
    <div class="base-modal__header">
      <h2>{{ title }}</h2>
      <p class="close-modal" @click="closeModal">X</p>
    </div>
    <div class="base-modal__content">
      <slot name="content"></slot>
    </div>
    <div class="base-modal__action">
      <!-- <BaseButton text="Add to cart"></BaseButton>
      <BaseButton text="Close"></BaseButton> -->
    </div>
  </div>
</template>

<script lang="ts">
import BaseAccordion from "@/components/BaseAccordion.vue";
import { Component, Vue, Prop } from "vue-property-decorator";
import BaseButton from "./BaseButton.vue";

@Component({
  components: {
    BaseAccordion,
    BaseButton,
  },
})
export default class BaseModal extends Vue {
  @Prop({ default: "" }) title!: string;

  closeModal() {
    this.$emit("closeModal");
  }
}
</script>
<style scoped lang="scss">
.base-modal {
  display: flex;
  flex-direction: column;
  padding: 16px;
  position: fixed;
  border-radius: 16px;
  z-index: 5;
  box-shadow: 0 0 8px 0 $black;

  &__header,
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .close-modal {
      &:hover {
        cursor: pointer;
      }
    }
  }

  &__content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
