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
  albumSlug?: string;
  albumTitle?: string;
  art?: string;
}

export interface AlbumPage {
  slug: string;
  title: string;
  year: string;
  art: string;
  description: string;
  tracks: AlbumTrack[];
}
