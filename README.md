# videotogif

A browser-based video converter that runs entirely client-side using ffmpeg.wasm. Drop in videos and convert them to animated WebP, GIF, or trimmed video clips — no uploads, no server processing, no account required.

## Features

- **Three output formats** — animated WebP, GIF (two-pass palette optimization for quality), or trimmed video
- **Visual timeline trimmer** — drag start/end handles or click to set in/out points; playback preview with a live playhead
- **Per-video settings** — FPS (5–30), output width, and quality controls per card
- **Estimated output size** — live size estimate before you convert
- **Auto-convert on drop** — instantly convert and download without clicking anything (skips clips over 60s)
- **Auto-trim to 12s** — automatically caps the end time on long videos when enabled
- **Batch convert** — queue up multiple videos and convert all at once
- **Dark UI, no dependencies** — vanilla JS, no framework, no build step

All conversion runs in-browser via ffmpeg.wasm. Nothing leaves your machine.

## Tech

- **ffmpeg.wasm** (`@ffmpeg/ffmpeg`, `@ffmpeg/core`) — in-browser video processing
- **Express** — local dev server (required to set `Cross-Origin-Opener-Policy` / `Cross-Origin-Embedder-Policy` headers, which SharedArrayBuffer needs)
- Vanilla JS, no framework

## Getting started

```bash
npm install
npm start
```

Open the URL printed in the terminal (defaults to `http://localhost:3000`).

On first load, ffmpeg.wasm downloads ~30MB of WebAssembly — this is cached by the browser after that.

## Usage

1. Drop one or more video files onto the page (or click to browse)
2. Trim the clip using the timeline handles
3. Choose format, FPS, width, and quality
4. Click **Convert** (or enable **Auto-convert on drop** to skip this step)
5. The file downloads automatically when done

With multiple videos loaded, **Convert All** processes them sequentially.

## Notes

- GIF uses a two-pass ffmpeg pipeline (palettegen → paletteuse with Floyd-Steinberg dithering) for much better quality than single-pass
- Video mode uses stream copy when no resize is set (fast, lossless trim); re-encodes only when a target width is chosen
- The Express server is only needed locally — the app can also be served by any static host that sets the required CORS headers
