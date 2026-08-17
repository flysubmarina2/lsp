<script setup lang="ts">
import type { AlbumTrack } from "@/types/music";

defineProps<{
  track: AlbumTrack;
  art: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  usingPlaceholder: boolean;
  message: string;
  isSaved: boolean;
}>();
defineEmits<{
  (event: "toggle"): void;
  (event: "previous"): void;
  (event: "next"): void;
  (event: "seek", time: number): void;
  (event: "toggle-save"): void;
  (event: "close"): void;
}>();

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")}`;
};
</script>

<template>
  <div
    class="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#201d1a] text-white shadow-2xl"
  >
    <div
      class="mx-auto flex max-w-7xl items-center gap-4 px-5 py-3 sm:gap-6 sm:px-10"
    >
      <img :src="art" alt="" class="h-12 w-12 rounded-lg object-cover" />
      <div class="min-w-0 flex-1 sm:max-w-xs">
        <p class="truncate text-sm font-bold">{{ track.title }}</p>
        <p class="text-xs text-white/50">
          {{
            usingPlaceholder
              ? "Демонстрационная заглушка"
              : "ЛСП · One More City"
          }}
        </p>
      </div>
      <div class="flex items-center gap-2 sm:gap-4">
        <button
          type="button"
          class="p-2 text-white/70 transition hover:text-white"
          aria-label="Предыдущий трек"
          @click="$emit('previous')"
        >
          ◀
        </button>
        <button
          type="button"
          class="grid h-11 w-11 place-items-center rounded-full bg-white text-lg text-black transition hover:scale-105"
          :aria-label="isPlaying ? 'Пауза' : 'Воспроизвести'"
          @click="$emit('toggle')"
        >
          {{ isPlaying ? "❚❚" : "▶" }}
        </button>
        <button
          type="button"
          class="p-2 text-white/70 transition hover:text-white"
          aria-label="Следующий трек"
          @click="$emit('next')"
        >
          ▶
        </button>
      </div>
      <div class="hidden min-w-0 flex-1 items-center gap-3 md:flex">
        <span class="w-10 text-right text-xs tabular-nums text-white/50">{{
          formatTime(currentTime)
        }}</span>
        <input
          class="h-1 flex-1 cursor-pointer accent-white"
          type="range"
          min="0"
          :max="duration || 0"
          step="0.1"
          :value="currentTime"
          aria-label="Позиция воспроизведения"
          @input="
            $emit('seek', Number(($event.target as HTMLInputElement).value))
          "
        />
        <span class="w-10 text-xs tabular-nums text-white/50">{{
          formatTime(duration)
        }}</span>
      </div>
      <button
        type="button"
        class="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border border-white/30 text-lg font-bold text-white transition hover:scale-110 hover:border-white hover:bg-white hover:text-[#201d1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        :aria-label="
          isSaved ? 'Удалить трек из плейлиста' : 'Добавить трек в плейлист'
        "
        :title="isSaved ? 'Удалить из плейлиста' : 'Добавить в плейлист'"
        @click="$emit('toggle-save')"
      >
        {{ isSaved ? "✓" : "+" }}
      </button>
      <button
        type="button"
        class="h-10 shrink-0 cursor-pointer rounded-full bg-white px-4 text-xs font-bold uppercase tracking-wider text-[#201d1a] shadow-lg ring-1 ring-white/30 transition hover:bg-red-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Закрыть проигрыватель"
        title="Закрыть"
        @click="$emit('close')"
      >
        Закрыть
      </button>
    </div>
    <p
      v-if="message"
      class="bg-amber-950 px-5 py-1 text-center text-xs text-amber-100"
    >
      {{ message }}
    </p>
  </div>
</template>
