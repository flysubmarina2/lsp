<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import albumArt from "@/assets/albums/One_More_City.jpg";
import AlbumHero from "@/components/album/AlbumHero.vue";
import AlbumPlayer from "@/components/album/AlbumPlayer.vue";
import AlbumTrackList from "@/components/album/AlbumTrackList.vue";
import { oneMoreCityTracks } from "@/data/oneMoreCity";
import { usePlaylist } from "@/composables/usePlaylist";

const { playlist, toggleTrack } = usePlaylist();

const audio = ref<HTMLAudioElement | null>(null);
const currentTrackIndex = ref(0);
const isPlaying = ref(false);
const currentTime = ref(0);
const audioDuration = ref(0);
const playbackMessage = ref("");
const isPlayerVisible = ref(false);
const usingPlaceholder = ref(false);
const shouldResumePlayback = ref(false);

const currentTrack = computed(() => oneMoreCityTracks[currentTrackIndex.value]);
const currentSource = computed(() =>
  usingPlaceholder.value
    ? "/audio/one-more-city/placeholder.mp3"
    : `/audio/one-more-city/${currentTrack.value.file}`
);

const play = async () => {
  if (!audio.value) return;
  shouldResumePlayback.value = true;
  playbackMessage.value = "";
  try {
    await audio.value.play();
  } catch {
    isPlaying.value = false;
    playbackMessage.value = "Не удалось открыть MP3-файл.";
  }
};

const loadCurrentTrack = () => {
  currentTime.value = 0;
  audioDuration.value = 0;
  playbackMessage.value = "";
  usingPlaceholder.value = false;
  void nextTick().then(() => {
    audio.value?.load();
    void play();
  });
};

const togglePlayback = () => {
  if (!audio.value) return;
  if (isPlaying.value) {
    shouldResumePlayback.value = false;
    audio.value.pause();
  } else void play();
};

const closePlayer = () => {
  shouldResumePlayback.value = false;
  audio.value?.pause();
  isPlayerVisible.value = false;
};

const selectTrack = (index: number) => {
  isPlayerVisible.value = true;
  if (currentTrackIndex.value === index) {
    togglePlayback();
    return;
  }
  currentTrackIndex.value = index;
  loadCurrentTrack();
};

const playNext = () => {
  currentTrackIndex.value =
    (currentTrackIndex.value + 1) % oneMoreCityTracks.length;
  loadCurrentTrack();
};

const playPrevious = () => {
  if (audio.value && audio.value.currentTime > 3) {
    audio.value.currentTime = 0;
    return;
  }
  currentTrackIndex.value =
    (currentTrackIndex.value - 1 + oneMoreCityTracks.length) %
    oneMoreCityTracks.length;
  loadCurrentTrack();
};

const seek = (time: number) => {
  if (!audio.value) return;
  audio.value.currentTime = time;
  currentTime.value = time;
};

const handleAudioError = () => {
  if (usingPlaceholder.value) {
    playbackMessage.value = "Не удалось открыть аудиозаглушку.";
    return;
  }
  usingPlaceholder.value = true;
  playbackMessage.value = "Файл трека не найден — играет демо-заглушка.";
  void nextTick().then(() => {
    audio.value?.load();
    if (shouldResumePlayback.value) void play();
  });
};
</script>

<template>
  <section class="px-6 pb-24 pt-10 sm:px-10 lg:px-16 lg:pt-16">
    <div class="mx-auto max-w-7xl">
      <RouterLink
        to="/"
        class="text-xs font-bold uppercase tracking-widest text-black/55 transition hover:text-black"
      >
        ← Назад к дискографии
      </RouterLink>
      <AlbumHero :art="albumArt" @play="selectTrack(0)" />
      <AlbumTrackList
        :tracks="oneMoreCityTracks"
        :art="albumArt"
        :current-track-index="currentTrackIndex"
        :is-playing="isPlaying"
        :saved-track-files="playlist.map((track) => track.file)"
        @select="selectTrack"
        @toggle-save="toggleTrack"
      />
    </div>

    <AlbumPlayer
      v-if="isPlayerVisible"
      :track="currentTrack"
      :art="albumArt"
      :is-playing="isPlaying"
      :current-time="currentTime"
      :duration="audioDuration"
      :using-placeholder="usingPlaceholder"
      :message="playbackMessage"
      :is-saved="playlist.some((track) => track.file === currentTrack.file)"
      @toggle="togglePlayback"
      @previous="playPrevious"
      @next="playNext"
      @seek="seek"
      @toggle-save="toggleTrack(currentTrack)"
      @close="closePlayer"
    />

    <audio
      ref="audio"
      :src="currentSource"
      preload="metadata"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @timeupdate="currentTime = audio?.currentTime || 0"
      @loadedmetadata="audioDuration = audio?.duration || 0"
      @ended="playNext"
      @error="handleAudioError"
    />
  </section>
</template>
