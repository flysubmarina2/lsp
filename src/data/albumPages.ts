import type { AlbumPage } from "@/types/music";
import magicCityArt from "@/assets/albums/Magic_City.jpg";
import oneMoreCityArt from "@/assets/albums/One_More_City.jpg";
import tragicCityArt from "@/assets/albums/Tragic_City.jpg";
import { magicCityTracks } from "./magicCity";
import { oneMoreCityTracks } from "./oneMoreCity";
import { tragicCityTracks } from "./tragicCity";

const description =
  "Пятый студийный альбом белорусского музыкального проекта ЛСП, вышедший 18 сентября 2020 года. Является продолжением линейки City, в которую также входят альбомы Magic City и Tragic City.";

export const albumPages: Record<string, AlbumPage> = {
  "one-more-city": {
    slug: "one-more-city",
    title: "One More City",
    year: "2020",
    art: oneMoreCityArt,
    description,
    tracks: oneMoreCityTracks,
  },
  "tragic-city": {
    slug: "tragic-city",
    title: "Tragic City",
    year: "2017",
    art: tragicCityArt,
    description,
    tracks: tragicCityTracks,
  },
  "magic-city": {
    slug: "magic-city",
    title: "Magic City",
    year: "2015",
    art: magicCityArt,
    description,
    tracks: magicCityTracks,
  },
};
