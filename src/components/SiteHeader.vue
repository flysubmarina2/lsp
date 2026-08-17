<script setup lang="ts">
import { ref } from "vue";

const isMenuOpen = ref(false);

const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <nav
    class="relative z-50 mx-auto flex max-w-7xl items-center justify-between pb-5"
  >
    <RouterLink to="/" aria-label="На главную" @click="closeMenu">
      <img class="w-14 sm:w-16" src="@/assets/logo.svg" alt="ЛСП" />
    </RouterLink>

    <div
      class="hidden items-center gap-6 text-sm font-bold uppercase tracking-widest md:flex"
    >
      <RouterLink
        to="/"
        class="whitespace-nowrap underline-offset-4 transition hover:text-gray-600"
        exact-active-class="underline"
        >Главная</RouterLink
      >
      <RouterLink
        to="/albums/one-more-city"
        class="whitespace-nowrap underline-offset-4 transition hover:text-gray-600"
        exact-active-class="underline"
        >Новое</RouterLink
      >
      <RouterLink
        to="/playlist"
        class="whitespace-nowrap underline-offset-4 transition hover:text-gray-600"
        exact-active-class="underline"
        >Мой плейлист</RouterLink
      >
    </div>

    <RouterLink
      to="/albums/one-more-city"
      class="hidden rounded-full bg-[#201d1a] px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white transition hover:-translate-y-0.5 hover:bg-gray-600 md:block"
      >Слушать</RouterLink
    >

    <button
      type="button"
      class="grid h-11 w-11 cursor-pointer place-items-center rounded-full border border-black/20 transition hover:bg-black/5 md:hidden"
      :aria-expanded="isMenuOpen"
      aria-controls="mobile-navigation"
      :aria-label="isMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
      @click="isMenuOpen = !isMenuOpen"
    >
      <svg
        v-if="!isMenuOpen"
        class="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg
        v-else
        class="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      leave-active-class="transition duration-150 ease-in"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <div
        v-if="isMenuOpen"
        id="mobile-navigation"
        class="absolute inset-x-0 top-full overflow-hidden rounded-2xl border border-black/10 bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden"
      >
        <div class="flex flex-col text-sm font-bold uppercase tracking-widest">
          <RouterLink
            to="/"
            class="rounded-xl px-4 py-3 transition hover:bg-black/5"
            exact-active-class="bg-black/5"
            @click="closeMenu"
            >Главная</RouterLink
          >
          <RouterLink
            to="/albums/one-more-city"
            class="rounded-xl px-4 py-3 transition hover:bg-black/5"
            exact-active-class="bg-black/5"
            @click="closeMenu"
            >Новое</RouterLink
          >
          <RouterLink
            to="/playlist"
            class="rounded-xl px-4 py-3 transition hover:bg-black/5"
            exact-active-class="bg-black/5"
            @click="closeMenu"
            >Мой плейлист</RouterLink
          >
          <RouterLink
            to="/albums/one-more-city"
            class="mt-2 rounded-xl bg-[#201d1a] px-4 py-3 text-center text-xs text-white"
            @click="closeMenu"
            >Слушать</RouterLink
          >
        </div>
      </div>
    </Transition>
  </nav>
</template>
