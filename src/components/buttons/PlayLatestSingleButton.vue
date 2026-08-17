<template>
  <button
    @click="$emit('click')"
    class="metallic-shimmer group flex w-fit items-center gap-4 rounded-full border border-white/25 py-2 pl-2 pr-6 font-bold text-white shadow-lg shadow-slate-900/30 transition hover:scale-105 hover:cursor-pointer hover:brightness-110"
  >
    <span
      class="grid h-11 w-11 place-items-center rounded-full bg-white text-gray-500"
      ><svg
        class="ml-0.5 h-4 w-4 fill-current"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M8 5v14l11-7z" /></svg></span
    >Слушать
  </button>
</template>

<style scoped>
.metallic-shimmer {
  background: linear-gradient(
    110deg,
    #626970 0%,
    #8e949a 24%,
    #d6d9dc 42%,
    #7b8288 58%,
    #a5abb0 78%,
    #626970 100%
  );
  background-size: 250% 100%;
  animation: metallic-shimmer 3s ease-in-out infinite;
}

@keyframes metallic-shimmer {
  0%,
  100% {
    background-position: 100% 50%;
  }

  50% {
    background-position: 0% 50%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .metallic-shimmer {
    animation: none;
  }
}
</style>
