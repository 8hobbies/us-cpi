#!/bin/sh

mkdir -p static && cp ../data.json static/
mkdir -p content && awk -f readme-in-static-site/riss.awk ../README.md > content/_index.md && hugo "$@"
