# Thy Doan -cse134b-hw5

## Part 1:

I chose **option A**: theme picker.

The issue was the flash of incorrect theme. This happens because the browser paints the page using CSS default (system) theme as soon as the HTML/CSS is ready and before the script runs. When the deferred script run, if it finds the theme inside localStorage different, it will apply that theme, which cause the "flash" switching from the system theme to the saved override.

To solve this, I added a small inline `<script>` inside `<head>`, this will make sure it read the `<localStorage>` and set `<data-theme>` immediately; this happens the same time the html/css load, so that the first paint already reflects the actual theme. Therefore, there wouldn't be a "flash".
