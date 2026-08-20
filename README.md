# LSP City Collection

A responsive music website dedicated to LSP's *City* album trilogy: *Magic City*, *Tragic City*, and *One More City*. The project provides album pages, track listings, a custom audio player, and a personal playlist stored in the browser.

## Features

- Discography page with album artwork and release years
- Dedicated pages for all three *City* albums
- Complete track listings with durations and album covers
- Responsive audio player with play, pause, seek, previous, and next controls
- Automatic playback of the next track
- Add or remove tracks from a personal playlist
- Persistent playlist storage using `localStorage`
- Playlist playback on the `/playlist` page
- Demo audio fallback when a track file is unavailable
- Responsive layouts and mobile navigation
- Keyboard-accessible controls and descriptive ARIA labels

## Technology

- Vue 3
- Vue Router
- TypeScript
- Tailwind CSS
- Vue CLI

## Getting Started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run serve
```

Create a production build:

```bash
npm run build
```

Run the linter:

```bash
npm run lint
```

## Audio Files

Audio files are not included with the project. Add legally obtained MP3 files to the matching album directory:

```text
public/audio/
├── magic-city/
├── tragic-city/
└── one-more-city/
```

The expected filenames are defined in:

- `src/data/magicCity.ts`
- `src/data/tragicCity.ts`
- `src/data/oneMoreCity.ts`

If an expected MP3 file is missing, the player automatically uses the included public-domain demo audio placeholder.

## Main Routes

| Route | Page |
| --- | --- |
| `/` | Discography and artist overview |
| `/albums/magic-city` | *Magic City* album |
| `/albums/tragic-city` | *Tragic City* album |
| `/albums/one-more-city` | *One More City* album |
| `/playlist` | Saved tracks and playlist player |

## Disclaimer

This is an unofficial fan project created for educational purposes. Album names, artwork, and artist-related materials belong to their respective rights holders. Only use audio files that you are legally permitted to use.
