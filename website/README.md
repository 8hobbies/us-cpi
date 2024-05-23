# Website

This directory contains files necessary for building the website.

## Prerequisite

- [Hugo](https://gohugo.io)
- [AWK](https://en.wikipedia.org/wiki/AWK), typically installed on a [POSIX][] system
- A POSIX shell, typically installed on a [POSIX][] system

## Build the Website

To build the website, run `./build-website.sh`, followed by any [Hugo CLI options](https:
//gohugo.io/commands/hugo/), such as:

    ./build-website.sh  # for production build

or

    ./build-website.sh server  # for local development

[POSIX]: https://en.wikipedia.org/wiki/POSIX
