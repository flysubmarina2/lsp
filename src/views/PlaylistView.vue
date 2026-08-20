<script setup lang="ts">
import { computed, nextTick, ref } from "vue";
import albumArt from "@/assets/albums/One_More_City.jpg";
import AlbumPlayer from "@/components/album/AlbumPlayer.vue";
import AlbumTrackList from "@/components/album/AlbumTrackList.vue";
import { usePlaylist } from "@/composables/usePlaylist";
import type { AlbumTrack } from "@/types/music";

const { playlist, removeTrack } = usePlaylist();
const audio = ref<HTMLAudioElement | null>(null);
const currentTrackIndex = ref(0);
const isPlayerVisible = ref(false);
const isPlaying = ref(false);
const currentTime = ref(0);
const audioDuration = ref(0);
const playbackMessage = ref("");
const usingPlaceholder = ref(false);
const shouldResumePlayback = ref(false);

const currentTrack = computed(() => playlist.value[currentTrackIndex.value]);
const currentSource = computed(() => {
  if (!currentTrack.value) return "";
  return usingPlaceholder.value
    ? "/audio/one-more-city/placeholder.mp3"
    : `/audio/${currentTrack.value.albumSlug || "one-more-city"}/${
        currentTrack.value.file
      }`;
});

const play = async () => {
  if (!audio.value || !currentTrack.value) return;
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
  if (isPlaying.value) {
    shouldResumePlayback.value = false;
    audio.value?.pause();
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
  if (!playlist.value.length) return;
  currentTrackIndex.value =
    (currentTrackIndex.value + 1) % playlist.value.length;
  loadCurrentTrack();
};

const playPrevious = () => {
  if (!playlist.value.length) return;
  if (audio.value && audio.value.currentTime > 3) {
    audio.value.currentTime = 0;
    return;
  }
  currentTrackIndex.value =
    (currentTrackIndex.value - 1 + playlist.value.length) %
    playlist.value.length;
  loadCurrentTrack();
};

const seek = (time: number) => {
  if (!audio.value) return;
  audio.value.currentTime = time;
  currentTime.value = time;
};

const removeSavedTrack = (track: AlbumTrack) => {
  const removedIndex = playlist.value.findIndex(
    (item) =>
      item.file === track.file &&
      (item.albumSlug || "one-more-city") ===
        (track.albumSlug || "one-more-city")
  );
  removeTrack(track);
  if (!playlist.value.length) {
    audio.value?.pause();
    isPlayerVisible.value = false;
    currentTrackIndex.value = 0;
  } else if (removedIndex <= currentTrackIndex.value) {
    currentTrackIndex.value = Math.max(0, currentTrackIndex.value - 1);
    if (isPlayerVisible.value) loadCurrentTrack();
  }
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
  <section
    class="mx-auto min-h-[70vh] max-w-7xl px-6 py-16 pb-48 sm:px-10 md:pb-28 lg:px-16"
  >
    <h1 class="text-4xl font-black uppercase tracking-tight sm:text-6xl">
      Мой плейлист
    </h1>

    <div
      v-if="!playlist.length"
      class="mt-12 rounded-3xl border border-dashed border-black/25 p-10 text-center"
    >
      <p class="text-lg font-bold">Плейлист пока пуст</p>
      <p class="mt-2 text-black/55">Добавьте треки со страницы альбома.</p>
      <RouterLink
        to="/albums/one-more-city"
        class="mt-6 inline-block rounded-full bg-[#201d1a] px-6 py-3 text-xs font-bold uppercase tracking-widest text-white"
      >
        Перейти к альбому
      </RouterLink>
    </div>

    <AlbumTrackList
      v-else
      :tracks="playlist"
      :art="albumArt"
      title="Сохранённые треки"
      :current-track-index="currentTrackIndex"
      :is-playing="isPlaying"
      :saved-track-files="playlist.map((track) => track.file)"
      @select="selectTrack"
      @toggle-save="removeSavedTrack"
    />

    <AlbumPlayer
      v-if="isPlayerVisible && currentTrack"
      :track="currentTrack"
      :art="currentTrack.art || albumArt"
      :album-title="currentTrack.albumTitle || 'One More City'"
      :is-playing="isPlaying"
      :current-time="currentTime"
      :duration="audioDuration"
      :using-placeholder="usingPlaceholder"
      :message="playbackMessage"
      :is-saved="true"
      @toggle="togglePlayback"
      @previous="playPrevious"
      @next="playNext"
      @seek="seek"
      @toggle-save="removeSavedTrack(currentTrack)"
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
