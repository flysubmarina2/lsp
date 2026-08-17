<script setup lang="ts">
/* eslint-disable no-undef */
import type { Album } from "@/types/music";
import DiscographyAlbum from "./DiscographyAlbum.vue";
defineProps<{ albums: Album[] }>();
</script>
<template>
  <section class="px-6 pb-24 sm:px-10 lg:px-16">
    <div class="mx-auto max-w-7xl">
      <div class="mb-8 flex items-end justify-between">
        <h2 class="text-3xl font-black uppercase tracking-tight sm:text-5xl">
          Дискография
        </h2>
        <a
          href="#"
          class="text-xs font-bold uppercase tracking-widest underline decoration-gray-500 decoration-2 underline-offset-8"
          >Смотреть все</a
        >
      </div>
      <div class="grid gap-8 sm:grid-cols-3">
        <DiscographyAlbum
          v-for="album in albums"
          :album="album"
          :key="album.title"
        />
      </div>
    </div>
  </section>
</template>
