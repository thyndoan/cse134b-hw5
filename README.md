# Thy Doan -cse134b-hw5

## Part 1:

- [Github deploy - portfolio](https://thyndoan.github.io/cse134b-hw5/)
- [Cloudflare deploy - generated sites](https://cse134b-hw5.tndoan.workers.dev/)

I chose **option A**: theme picker.

The issue was the flash of incorrect theme. This happens because the browser paints the page using CSS default (system) theme as soon as the HTML/CSS is ready and before the script runs. When the deferred script run, if it finds the theme inside localStorage different, it will apply that theme, which cause the "flash" switching from the system theme to the saved override.

To solve this, I added a small inline `<script>` inside `<head>`, this will make sure it read the `<localStorage>` and set `<data-theme>` immediately; this happens the same time the html/css load, so that the first paint already reflects the actual theme. Therefore, there wouldn't be a "flash".

## Part 2

**Injection Risk**: Because the cat image URLs come from an outside API, there is no guarantee that the data it returns will not be malicious or malformed. If we use `innerHTML`, that bad data could inject anything (HTML, scripts) into our page. By cloning a `<template>` and setting the `<img>` and `src`, we can guarantee that the data being processed is a URL value, so nothing from the response can execute as markup or script.

## Documentation

### Theme Picker (Option A)

External module: `js/index.js`. Adds `.js-enabled` to `<html>` (showing the
picker), listens for radio `change` events, sets/removes `data-theme` on
`<html>`, and saves the choice to `sessionStorage`/`localStorage`. Syncs the
checked radio to the stored theme on load. All storage access is wrapped in
try/catch.

### Web Component Reference

**Tag:** `<cat-widget>`

**Attribute:** `count` — number of cat images to show. Default: `3`.

**Endpoint:** `https://api.thecatapi.com/v1/images/search?limit={count}`

**Usage:**

```html
<cat-widget count="3"></cat-widget>
```

### For CloudFlare local setup

1. Install dependencies:

```bash
npm install
```

2. Run a local dev server (rebuilds on change):

```bash
npm run start
```

3. Build the static site:

```bash
npm run build
```

Put input inside `src/`. Output is generated into `_site/`.

## Reflection on SSG

Personally, I think it's quite hard to use SSG. I chose to use eleventy to generate 3 project sites and a 404 site from a single base layout and a data file. The conversion remove the repeated boilerplate - same header, footer, base layout with all the meta tag, so we don't need to copy paste it to every pages. It's good to use if we have multiple pages with the same layout. I would not use this if I need to build only 1 page, and if my page is rarely have any data update.
