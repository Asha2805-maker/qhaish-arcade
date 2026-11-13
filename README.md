# Q Arcade — website source

A responsive Construct 3 student showcase with a Q level-up logo, scrolling pixel art, game filters, game-detail dialogs, and a music video.

## Open it
Extract the ZIP first. Keep all files together, then open `index.html` in Chrome, Edge, or Firefox. No build or installation is needed. For editing, open the folder in Visual Studio Code. You can also use VS Code's Live Server extension if you already have it.

## Files
- `index.html`: page content, profile, logo references, video and motion controls.
- `style.css`: colours, responsive layout, arcade illustration, and background animations.
- `app.js`: game data, illustrated game cards, filters, dialogs, video and scroll effects.
- `q-logo.svg`: editable vector Q with speed lines and a level-up arrow; also the favicon.
- `pixel-world.svg`, `pixel-stars.svg`: repeating pixel-art background tiles.

## Make it yours
- Text/profile: edit `index.html`.
- Game titles/descriptions: edit the `games` array at the beginning of `app.js`.
- Colours: edit `:root` at the beginning of `style.css`.
- Background speed: find `world-drift` (100 seconds) and `star-drift` (65 seconds) in `style.css`. A larger duration scrolls more slowly.
- Photo: replace `qhaish-profile.jpeg` and update the image dimensions and alt text in `index.html`.

The six completed games need Construct 3 web exports or hosted links to be playable on the site. Tilemap Adventure is the only project in progress. The illustrations are custom placeholders, not screenshots. This source package includes Qhaish’s profile photo. The playable student games can be added when their web exports are ready.

The Motion button pauses the background; the site also respects the visitor's device setting for reduced motion. The website layout is responsive; eventual phone play also depends on touch controls in the actual Construct 3 games.

The Google Fonts request is optional: the site uses fallback fonts without internet access. All graphics are included locally. This standalone code contains no hosting credentials or account configuration. Sharing the source ZIP does not change who can access the hosted website.

## Music and video controls
Use the Music button in the header to toggle the looping arcade soundtrack. Opening the music video pauses the soundtrack.

Watch “Alone” by Marshmello from its cover card. The video opens in a dialog and stops when closed. Adjust sound with your device’s volume controls. The YouTube embed requires internet access. Open the site over HTTP or use the YouTube link below the player.

## Interactive cabinet mini demo
The hero cabinet includes a Bunny Carrot Hop mini demo. Tilt the joystick left or right and press A to jump. Click the screen to use Left/Right or A/D to move, Space to jump, and R to reset. Collect three carrots across the platforms. On touchscreens, hold the joystick with one finger and tap Jump with another.
The implementation is in arcade-game.js, with cabinet markup in index.html and styling in style.css.

## Full-circle controls and artwork update
The joystick tilts in a circular range. The horizontal tilt sets movement speed and direction. Release or loss of focus recenters the stick.

Favourites include locally bundled Minecraft and Roblox logos plus original SVG treehouse and block-avatar/boat illustrations. Marshmello cover artwork was supplied by the user and is bundled without alteration.
Logo sources:
- https://commons.wikimedia.org/wiki/File:Minecraft_Logo-en.svg (Mojang Studios)
- https://commons.wikimedia.org/wiki/File:Roblox_Corporation_2025_logo.svg (Roblox Corporation)

## Game card artwork and gameplay previews

The seven game cards use illustrated pixel art from `game-previews/`. The Ocean Maze and Starfish Collector details show the original screenshots. To add a gameplay preview, put a short MP4 or WebM file in `game-previews/` and add `previewVideo: 'game-previews/filename.mp4'` to the matching game in `app.js`. Hovering over the artwork plays the clip muted and leaving the artwork restores the poster. The Motion toggle also controls hover previews.
