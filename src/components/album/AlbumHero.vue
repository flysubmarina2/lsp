<script setup lang="ts">
defineProps<{
  art: string;
  title: string;
  year: string;
  description: string;
}>();
defineEmits<{ (event: "play"): void }>();
</script>

<template>
  <div
    class="mt-10 grid gap-12 lg:grid-cols-[minmax(280px,440px)_1fr] lg:gap-20"
  >
    <img
      :src="art"
      :alt="`Обложка альбома ${title}`"
      class="aspect-square w-full rounded-[2rem] object-cover shadow-2xl shadow-black/25"
    />
    <div class="flex flex-col justify-center">
      <p class="text-xs font-bold uppercase tracking-[0.3em] text-black/50">
        Альбом · {{ year }}
      </p>
      <h1 class="mt-3 text-5xl font-black uppercase tracking-tight sm:text-7xl">
        {{ title }}
      </h1>
      <p class="mt-6 max-w-2xl text-base leading-7 text-black/65">
        {{ description }}
      </p>
      <button
        type="button"
        class="mt-8 w-fit cursor-pointer rounded-full bg-[#201d1a] px-7 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:-translate-y-0.5 hover:bg-gray-600"
        @click="$emit('play')"
      >
        ▶ Слушать альбом
      </button>
    </div>
  </div>
</template>
