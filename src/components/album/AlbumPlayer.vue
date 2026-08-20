<script setup lang="ts">
import type { AlbumTrack } from "@/types/music";

defineProps<{
  track: AlbumTrack;
  art: string;
  albumTitle: string;
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
      class="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-3 px-4 py-3 sm:px-6 md:flex-nowrap md:gap-5 md:px-10"
    >
      <img
        :src="art"
        alt=""
        class="order-1 h-12 w-12 shrink-0 rounded-lg object-cover"
      />
      <div class="order-2 min-w-0 flex-1 md:max-w-xs">
        <p class="truncate text-sm font-bold">{{ track.title }}</p>
        <p class="text-xs text-white/50">
          {{
            usingPlaceholder
              ? "Демонстрационная заглушка"
              : `ЛСП · ${albumTitle}`
          }}
        </p>
      </div>
      <div
        class="order-5 flex basis-full items-center justify-center gap-5 md:order-3 md:basis-auto md:gap-3"
      >
        <button
          type="button"
          class="cursor-pointer p-2 text-white/70 transition hover:text-white"
          aria-label="Предыдущий трек"
          @click="$emit('previous')"
        >
          ◀
        </button>
        <button
          type="button"
          class="cursor-pointer grid h-11 w-11 place-items-center rounded-full bg-white text-lg text-black transition hover:scale-105"
          :aria-label="isPlaying ? 'Пауза' : 'Воспроизвести'"
          @click="$emit('toggle')"
        >
          {{ isPlaying ? "❚❚" : "▶" }}
        </button>
        <button
          type="button"
          class="cursor-pointer p-2 text-white/70 transition hover:text-white"
          aria-label="Следующий трек"
          @click="$emit('next')"
        >
          ▶
        </button>
      </div>
      <div
        class="order-6 flex min-w-0 basis-full items-center gap-2 md:order-4 md:flex-1 md:basis-auto md:gap-3"
      >
        <span class="w-9 text-right text-[11px] tabular-nums text-white/50">{{
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
        <span class="w-9 text-[11px] tabular-nums text-white/50">{{
          formatTime(duration)
        }}</span>
      </div>
      <button
        type="button"
        class="order-3 grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-full border border-white/30 text-base font-bold text-white transition hover:scale-110 hover:border-white hover:bg-white hover:text-[#201d1a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:order-5 md:h-10 md:w-10 md:text-lg"
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
        class="order-4 h-9 shrink-0 cursor-pointer rounded-full bg-white px-3 text-[10px] font-bold uppercase tracking-wide text-[#201d1a] shadow-lg ring-1 ring-white/30 transition hover:bg-red-500 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white md:order-6 md:h-10 md:px-4 md:text-xs md:tracking-wider"
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
