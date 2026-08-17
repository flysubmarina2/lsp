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
  const isSaved = (track: AlbumTrack) =>
    playlist.value.some((item) => item.file === track.file);

  const toggleTrack = (track: AlbumTrack) => {
    const index = playlist.value.findIndex((item) => item.file === track.file);
    if (index === -1) playlist.value.push(track);
    else playlist.value.splice(index, 1);
    savePlaylist();
  };

  const removeTrack = (track: AlbumTrack) => {
    playlist.value = playlist.value.filter((item) => item.file !== track.file);
    savePlaylist();
  };

  return { playlist, isSaved, toggleTrack, removeTrack };
};
