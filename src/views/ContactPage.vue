<template>
  <div class="contact-page"></div>
</template>

<script lang="ts">
import BaseAccordion from "@/components/BaseAccordion.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {
    BaseAccordion,
  },
})
export default class ContactPage extends Vue {}
</script>
<style scoped lang="scss"></style>
