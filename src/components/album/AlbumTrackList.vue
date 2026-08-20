<script setup lang="ts">
import type { AlbumTrack } from "@/types/music";

defineProps<{
  tracks: AlbumTrack[];
  art: string;
  title: string;
  currentTrackIndex: number;
  isPlaying: boolean;
  savedTrackFiles?: string[];
}>();
defineEmits<{
  (event: "select", index: number): void;
  (event: "toggle-save", track: AlbumTrack): void;
}>();
</script>

<template>
  <div class="mt-20">
    <!-- <h2 class="text-3xl font-black uppercase tracking-tight sm:text-5xl">
      {{ title }}
    </h2> -->
    <ol class="mt-8 border-t border-black/20">
      <li
        v-for="(track, index) in tracks"
        :key="track.file"
        class="group grid cursor-pointer grid-cols-[3rem_minmax(0,1fr)_3.5rem_3rem] items-center gap-4 border-b border-black/20 pr-1"
        :class="{ 'bg-black/[0.04]': currentTrackIndex === index }"
      >
        <button
          type="button"
          class="col-span-2 grid cursor-pointer grid-cols-[3rem_3.5rem_minmax(0,1fr)] items-center gap-4 py-4 text-left"
          :aria-label="`${
            currentTrackIndex === index && isPlaying
              ? 'Поставить на паузу'
              : 'Воспроизвести'
          }: ${track.title}`"
          @click="$emit('select', index)"
        >
          <span class="text-sm tabular-nums text-black/40 ml-4">{{
            currentTrackIndex === index && isPlaying
              ? "❚❚"
              : String(index + 1).padStart(2, "0")
          }}</span>
          <img
            :src="track.art || art"
            alt=""
            class="h-14 w-14 rounded-lg object-cover shadow-sm"
          />
          <span class="font-bold transition group-hover:translate-x-1">{{
            track.title
          }}</span>
        </button>
        <span class="text-right text-sm tabular-nums text-black/45">{{
          track.duration
        }}</span>
        <button
          v-if="savedTrackFiles"
          type="button"
          class="grid h-10 w-10 place-items-center justify-self-end rounded-full border border-black/20 text-sm transition hover:border-black hover:bg-black hover:text-white cursor-pointer"
          :aria-label="`${
            savedTrackFiles.includes(track.file)
              ? 'Удалить из плейлиста'
              : 'Добавить в плейлист'
          }: ${track.title}`"
          :title="
            savedTrackFiles.includes(track.file)
              ? 'Удалить из плейлиста'
              : 'Добавить в плейлист'
          "
          @click="$emit('toggle-save', track)"
        >
          {{ savedTrackFiles.includes(track.file) ? "✓" : "+" }}
        </button>
      </li>
    </ol>
  </div>
</template>
