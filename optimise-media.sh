#!/usr/bin/env bash
#
# optimise-media.sh — Bustard Consulting website
# ------------------------------------------------
# Re-encodes the project videos for web delivery:
#   • H.264 / MP4 (yuv420p, baseline-compatible high profile)
#   • audio stripped (background/autoplay clips need none)
#   • capped at 1920px on the long edge
#   • +faststart so playback can begin before the file finishes loading
#
# Requires ffmpeg  ->  https://ffmpeg.org/download.html
#   macOS:  brew install ffmpeg
#   Ubuntu: sudo apt install ffmpeg
#
# Run it once from the project root BEFORE committing/deploying:
#   bash optimise-media.sh
#
# Originals are backed up to assets/experience/videos/_originals/.
# Review the results, then delete _originals/ before committing.

set -euo pipefail
cd "$(dirname "$0")/assets/experience/videos"

mkdir -p _originals
shopt -s nullglob

for f in *.mp4; do
  echo "→ optimising $f"
  mv "$f" "_originals/$f"
  ffmpeg -hide_banner -loglevel error -y -i "_originals/$f" \
    -an \
    -vf "scale='min(1920,iw)':-2" \
    -c:v libx264 -profile:v high -preset slow -crf 25 \
    -pix_fmt yuv420p -movflags +faststart \
    "$f"
  printf '   %s  ->  %s\n' \
    "$(du -h "_originals/$f" | cut -f1)" \
    "$(du -h "$f" | cut -f1)"
done

echo
echo "Done. Originals are in assets/experience/videos/_originals/"
echo "Most clips should now sit well under 20MB. Delete _originals/ once happy."
