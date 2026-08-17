export interface Track {
  number: string;
  title: string;
  album: string;
  time: string;
}

export interface Album {
  title: string;
  year: string;
  art: string;
  link?: string;
}

export interface AlbumTrack {
  title: string;
  duration: string;
  file: string;
}
