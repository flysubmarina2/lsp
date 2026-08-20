<script setup lang="ts">
import { computed, nextTick, ref, watch } from "vue";
import AlbumHero from "@/components/album/AlbumHero.vue";
import AlbumPlayer from "@/components/album/AlbumPlayer.vue";
import AlbumTrackList from "@/components/album/AlbumTrackList.vue";
import { albumPages } from "@/data/albumPages";
import { usePlaylist } from "@/composables/usePlaylist";
import type { AlbumTrack } from "@/types/music";

const props = defineProps<{ albumSlug: string }>();
const { playlist, isSaved, toggleTrack } = usePlaylist();
const album = computed(() => albumPages[props.albumSlug]);

const audio = ref<HTMLAudioElement | null>(null);
const currentTrackIndex = ref(0);
const isPlaying = ref(false);
const currentTime = ref(0);
const audioDuration = ref(0);
const playbackMessage = ref("");
const isPlayerVisible = ref(false);
const usingPlaceholder = ref(false);
const shouldResumePlayback = ref(false);

const currentTrack = computed(
  () => album.value.tracks[currentTrackIndex.value]
);
const playlistTrack = computed(() => ({
  ...currentTrack.value,
  albumSlug: album.value.slug,
  albumTitle: album.value.title,
  art: album.value.art,
}));
const savedTrackFiles = computed(() =>
  playlist.value
    .filter(
      (track) => (track.albumSlug || "one-more-city") === album.value.slug
    )
    .map((track) => track.file)
);
const currentSource = computed(() =>
  usingPlaceholder.value
    ? "/audio/one-more-city/placeholder.mp3"
    : `/audio/${album.value.slug}/${currentTrack.value.file}`
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
    (currentTrackIndex.value + 1) % album.value.tracks.length;
  loadCurrentTrack();
};

const playPrevious = () => {
  if (audio.value && audio.value.currentTime > 3) {
    audio.value.currentTime = 0;
    return;
  }
  currentTrackIndex.value =
    (currentTrackIndex.value - 1 + album.value.tracks.length) %
    album.value.tracks.length;
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

const togglePlaylistTrack = (track: AlbumTrack) => {
  toggleTrack({
    ...track,
    albumSlug: album.value.slug,
    albumTitle: album.value.title,
    art: album.value.art,
  });
};

watch(
  () => props.albumSlug,
  () => {
    audio.value?.pause();
    currentTrackIndex.value = 0;
    isPlayerVisible.value = false;
    usingPlaceholder.value = false;
  }
);
</script>

<template>
  <section class="px-6 pb-48 pt-10 sm:px-10 md:pb-24 lg:px-16 lg:pt-16">
    <div class="mx-auto max-w-7xl">
      <RouterLink
        to="/"
        class="text-xs font-bold uppercase tracking-widest text-black/55 transition hover:text-black"
      >
        ← Назад к дискографии
      </RouterLink>
      <AlbumHero
        :art="album.art"
        :title="album.title"
        :year="album.year"
        :description="album.description"
        @play="selectTrack(0)"
      />
      <AlbumTrackList
        :tracks="album.tracks"
        :art="album.art"
        :title="album.title"
        :current-track-index="currentTrackIndex"
        :is-playing="isPlaying"
        :saved-track-files="savedTrackFiles"
        @select="selectTrack"
        @toggle-save="togglePlaylistTrack"
      />
    </div>

    <AlbumPlayer
      v-if="isPlayerVisible"
      :track="currentTrack"
      :art="album.art"
      :album-title="album.title"
      :is-playing="isPlaying"
      :current-time="currentTime"
      :duration="audioDuration"
      :using-placeholder="usingPlaceholder"
      :message="playbackMessage"
      :is-saved="isSaved(playlistTrack)"
      @toggle="togglePlayback"
      @previous="playPrevious"
      @next="playNext"
      @seek="seek"
      @toggle-save="togglePlaylistTrack(currentTrack)"
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
