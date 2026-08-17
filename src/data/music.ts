import type { Album } from "@/types/music";
import magicCityArt from "@/assets/albums/Magic_City.jpg";
import oneMoreCityArt from "@/assets/albums/One_More_City.jpg";
import tragicCityArt from "@/assets/albums/Tragic_City.jpg";

export const albums: Album[] = [
  {
    title: "One more city",
    year: "2020",
    art: oneMoreCityArt,
    link: "/albums/one-more-city",
  },
  {
    title: "Tragic city",
    year: "2017",
    art: tragicCityArt,
    link: "/albums/one-more-city",
  },
  {
    title: "Magic city",
    year: "2015",
    art: magicCityArt,
    link: "/albums/one-more-city",
  },
];
