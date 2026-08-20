import { ref } from "vue";
import type { AlbumTrack } from "@/types/music";

const STORAGE_KEY = "lsp-playlist";

const readPlaylist = (): AlbumTrack[] => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
};

const playlist = ref<AlbumTrack[]>(readPlaylist());

const savePlaylist = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(playlist.value));
};

export const usePlaylist = () => {
  const trackKey = (track: AlbumTrack) =>
    `${track.albumSlug || "one-more-city"}:${track.file}`;

  const isSaved = (track: AlbumTrack) =>
    playlist.value.some((item) => trackKey(item) === trackKey(track));

  const toggleTrack = (track: AlbumTrack) => {
    const index = playlist.value.findIndex(
      (item) => trackKey(item) === trackKey(track)
    );
    if (index === -1) playlist.value.push(track);
    else playlist.value.splice(index, 1);
    savePlaylist();
  };

  const removeTrack = (track: AlbumTrack) => {
    playlist.value = playlist.value.filter(
      (item) => trackKey(item) !== trackKey(track)
    );
    savePlaylist();
  };

  return { playlist, isSaved, toggleTrack, removeTrack };
};
