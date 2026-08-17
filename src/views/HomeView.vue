<script setup lang="ts">
import ArtistHero from "../components/ArtistHero.vue";
import DiscographySection from "../components/DiscographySection.vue";
import { albums } from "../data/music";
</script>

<template>
  <ArtistHero />
  <DiscographySection :albums="albums" />
</template>
