<template>
  <component :is="album.link ? RouterLink : 'div'" :to="album.link">
    <article class="group cursor-pointer">
      <div
        class="relative aspect-square overflow-hidden rounded-2xl p-6 shadow-lg transition duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl"
      >
        <div
          class="absolute inset-[12%] rounded-full border-[18px] border-black/80"
        ></div>
        <img
          class="absolute inset-0 h-full w-full object-cover"
          :src="album.art"
          :alt="`Обложка альбома ${album.title}`"
        />
      </div>
      <div class="mt-4 flex items-center justify-between">
        <h3 class="text-xl font-bold">{{ album.title }}</h3>
        <span class="text-sm text-black/45">{{ album.year }}</span>
      </div>
    </article>
  </component>
</template>
<script setup lang="ts">
import { RouterLink } from "vue-router";
import type { Album } from "@/types/music";
/* eslint-disable no-undef */
defineProps<{ album: Album }>();
</script>
