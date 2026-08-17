<script setup lang="ts">
import PlayLatestSingleButton from "./buttons/PlayLatestSingleButton.vue";
</script>

<template>
  <section class="relative min-h-[92vh] px-6 pb-14 sm:px-10 lg:px-16">
    <div
      class="relative z-10 mx-auto grid max-w-7xl items-center gap-10 pt-12 lg:grid-cols-[1.05fr_0.95fr] lg:pt-16"
    >
      <div class="mx-auto w-full max-w-lg lg:mr-auto">
        <div
          class="relative aspect-[4/5] -rotate-3 overflow-hidden rounded-[2.5rem] border border-slate-600/50 bg-[linear-gradient(135deg,#b8bdc2_0%,#8e949a_34%,#626970_70%,#a5abb0_100%)] p-3 pb-16 shadow-2xl shadow-slate-700/40"
        >
          <div class="relative h-full overflow-hidden rounded-[2rem]">
            <img
              class="h-full w-full object-cover"
              src="@/assets/avatar.jpg"
              alt="Олег Савченко"
            />
            <div
              class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"
            ></div>
            <div class="absolute bottom-8 left-7 right-7 pt-4 text-white">
              <p class="text-xs font-bold uppercase tracking-[0.3em]">Артист</p>
              <h2 class="mt-1 text-4xl font-black uppercase tracking-tight">
                Олег Савченко
              </h2>
              <div class="mt-5">
                <PlayLatestSingleButton
                  @click="$router.push('/albums/one-more-city')"
                />
              </div>
            </div>
          </div>
          <button
            class="absolute bottom-3 left-1/2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-white/70 bg-slate-500/45 shadow-inner transition hover:bg-slate-600/70"
            type="button"
            aria-label="Кнопка плеера артиста"
          >
            <span
              class="h-3.5 w-3.5 rounded-[3px] border border-white/80"
            ></span>
          </button>
        </div>
      </div>
      <div class="relative mx-auto w-full max-w-lg lg:ml-auto">
        <div
          class="relative aspect-[4/5] rotate-3 overflow-hidden rounded-[2.5rem] bg-[#26221f] p-3 pb-16 shadow-2xl shadow-black/20"
        >
          <div class="relative h-full overflow-hidden rounded-[2rem]">
            <img
              class="h-full w-full object-cover"
              src="@/assets/albums/One_More_City.jpg"
              alt="Обложка альбома One More City"
            />
            <div
              class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent"
            ></div>
            <div
              class="absolute bottom-8 left-7 right-7 border-t border-white/40 pt-4 text-white"
            >
              <p class="text-xs font-bold uppercase tracking-[0.3em]">
                Новый альбом
              </p>
              <p class="mt-1 text-4xl font-black uppercase tracking-tight">
                One more city
              </p>
            </div>
          </div>
          <button
            class="absolute bottom-3 left-1/2 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-white/25 bg-black/30 shadow-inner transition hover:bg-black/60"
            type="button"
            aria-label="Кнопка плеера альбома"
          >
            <span
              class="h-3.5 w-3.5 rounded-[3px] border border-white/50"
            ></span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
