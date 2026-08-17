<script setup lang="ts">
import { RouterView } from "vue-router";
import SiteFooter from "./components/SiteFooter.vue";
import SiteHeader from "./components/SiteHeader.vue";
</script>

<template>
  <main
    class="min-h-screen overflow-hidden bg-[radial-gradient(ellipse_at_58%_28%,#ffffff_0%,#e4e4e4_42%,#a8a8a8_100%)] text-[#201d1a]"
  >
    <div class="px-6 pt-6 sm:px-10 lg:px-16">
      <SiteHeader />
    </div>
    <RouterView />
    <SiteFooter />
  </main>
</template>
