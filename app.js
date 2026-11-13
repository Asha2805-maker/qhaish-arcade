const games=[{title:'Paddle & Blocks',type:'brick-breaker',genre:'BRICK BREAKER · PRECISION',description:'A paddle, a bouncing ball, and a wall of blocks. Keep the ball in play and aim for every brick.',status:'Complete',art:'pong'},{title:'Jungle Blast',type:'shooter',genre:'SHOOTER · ADVENTURE',description:'Boxes, dynamite, and a red-ball cannon. An explosive adventure deep in the jungle.',status:'Complete',art:'jungle'},{title:'Space Defender',type:'shooter',genre:'SHOOTER · SPACE',description:'Take your adventure beyond the stars in my very own space shooter.',status:'Complete',art:'space'},{
  title: 'Bunny & Carrots',
  type: 'platform',
  genre: 'PLATFORMER · EXPLORATION',
  description: 'Hop onto platforms and collect carrots in Qhaish’s finished bunny game.',
  status: 'Complete',
  art: 'bunny'
}, {
  title: 'Tilemap Adventure',
  type: 'platform',
  genre: 'PLATFORMER · TWO LEVELS',
  description: 'Collect gems and keys, unlock doors, and make it through two levels before you run out of lives.',
  status: 'In progress',
  art: 'tilemap'
}, {
  title: 'Ocean Maze',
  type: 'maze',
  genre: 'MAZE · UNDERWATER',
  description: 'Guide the fish to the finish through an underwater maze with jellyfish, sea urchins, seaweed, and a worm.',
  status: 'Complete',
  art: 'maze',
  screenshot: 'ocean-maze.png',
  screenshotAlt: 'Ocean Maze screenshot showing blue walls, jellyfish, sea urchins, seaweed, and a confetti finish marker'
}, {
  title: 'Starfish Collector',
  type: 'collecting',
  genre: 'COLLECTING · UNDERWATER',
  description: 'Guide a sea turtle around rocks and collect starfish.',
  status: 'Complete',
  art: 'starfish',
  screenshot: 'starfish-collector.png',
  screenshotWidth: 921,
  screenshotHeight: 521,
  screenshotAlt: 'Construct 3 layout with a sea turtle, starfish, and rocks on a blue water background',
  challenges: [
    ['Making items spin', 'Add the Rotate behaviour to a starfish and run the layout. Watch what happens, then increase Speed and compare the spin.'],
    ['Smooth movement', 'Add the Sine behaviour. Try Vertical movement, reduce the Period, and increase the Magnitude. Compare the direction, time per cycle, and distance travelled.'],
    ['Item variations', 'Make starfish spin fast, medium, and slow. Leave some still, make a medium-speed starfish spin while moving left and right, and make the fastest one spin while moving up and down.'],
    ['Grand Master Challenge', 'Set Rotate Speed to 90, Sine Movement to Vertical, Period to 8, and Magnitude to 100. Adjust its starting position so it stays inside the layout and clears the rocks.']
  ]
}];
const grid = document.querySelector('#grid');

function posterPath(game) {
  return `game-previews/${game.art}.png`;
}

function art(game, details = false) {
  if (details && game.screenshot) {
    return `<div class="game-art game-screenshot"><img src="${game.screenshot}" alt="${game.screenshotAlt}" width="${game.screenshotWidth ?? 2048}" height="${game.screenshotHeight ?? 1210}" loading="lazy"></div>`;
  }
  const clip = !details && game.previewVideo
    ? `<video class="game-preview-video" data-src="${game.previewVideo}" preload="none" muted loop playsinline aria-hidden="true"></video>`
    : '';
  return `<div class="game-art game-poster">
    <img src="${posterPath(game)}" alt="" width="640" height="360" loading="lazy">
    ${clip}
  </div>`;
}

function stopGamePreviews() {
  for (const video of grid.querySelectorAll('.game-preview-video')) video.pause();
}

function setupGamePreviews() {
  for (const video of grid.querySelectorAll('.game-preview-video')) {
    const preview = video.parentElement;
    preview.addEventListener('pointerenter', async (event) => {
      if (event.pointerType === 'touch' || !motionEnabled || document.hidden) return;
      video.src ||= video.dataset.src;
      video.muted = true;
      try {
        await video.play();
      } catch {
        // Keep the illustrated poster visible when a clip cannot play.
      }
    });
    preview.addEventListener('pointerleave', () => video.pause());
    video.addEventListener('playing', () => preview.classList.add('is-playing'));
    video.addEventListener('pause', () => preview.classList.remove('is-playing'));
    video.addEventListener('error', () => preview.classList.remove('is-playing'));
  }
}

function render(filter = 'all') {
  stopGamePreviews();
  grid.innerHTML = games.map((game, index) => ({game, index}))
    .filter(({game}) => filter === 'all' || game.type === filter)
    .map(({game, index}) => `<article class="card">${art(game)}
      <div class="card-body">
        <div class="genre">${game.genre}</div>
        <h3>${game.title}</h3>
        <p>${game.description}</p>
        <button data-game="${index}" aria-label="View ${game.title} details">${game.status}<span>↗</span></button>
      </div>
    </article>`).join('');
  setupGamePreviews();
}
render();

const filters = document.querySelectorAll('[data-filter]');
for (const button of filters) {
  button.addEventListener('click', () => {
    for (const filter of filters) {
      const selected = filter === button;
      filter.classList.toggle('selected', selected);
      filter.setAttribute('aria-pressed', String(selected));
    }
    render(button.dataset.filter);
  });
}

const dialog=document.querySelector('#details');document.querySelector('#grid').addEventListener('click',e=>{const b=e.target.closest('[data-game]');if(!b)return;const g=games[Number(b.dataset.game)];stopGamePreviews();document.querySelector('#detail-art').innerHTML=art(g,true);document.querySelector('#detail-tag').textContent=g.genre;document.querySelector('#detail-title').textContent=g.title;document.querySelector('#detail-description').textContent=g.description;const status = document.querySelector('#detail-status');
status.textContent = g.status;
const help = document.querySelector('#detail-help');
const challengeList = document.querySelector('#detail-challenges');
challengeList.replaceChildren();
challengeList.hidden = !g.challenges;
if (g.challenges) {
  for (const [title, instructions] of g.challenges) {
    const heading = document.createElement('dt');
    heading.textContent = title;
    const description = document.createElement('dd');
    description.textContent = instructions;
    challengeList.append(heading, description);
  }
  help.textContent = 'Experiment with how each starfish spins and moves.';
} else if (g.status === 'In progress') {
  help.textContent = 'Jump onto a button to open the laser gate. Collect the laser gun behind it, then use it to shoot the enemy. Bugs Bunny and Marvin the Martian are possible characters.';
} else {
  help.textContent = 'The game will be playable here once its Construct 3 web export or hosted link is added.';
}
dialog.showModal();document.body.classList.add('modal-open')});const close=()=>dialog.close();document.querySelector('#close').onclick=close;document.querySelector('#back').onclick=close;dialog.addEventListener('close',()=>document.body.classList.remove('modal-open'));dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close()}});

// Background animation respects the device preference and the visitor's toggle.
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('#motion');
let motionEnabled = !motionPreference.matches;
let scrollFramePending = false;
function updateParallax() {
  scrollFramePending = false;
  if (!motionEnabled || motionPreference.matches) return;
  const progress = Math.min(1, window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight));
  document.body.style.setProperty('--world-scroll', `${-60 * progress}px`);
  document.body.style.setProperty('--star-scroll', `${-100 * progress}px`);
}
function setMotion(enabled) {
  motionEnabled = enabled && !motionPreference.matches;
  if (!motionEnabled) stopGamePreviews();
  document.body.classList.toggle('motion-paused', !motionEnabled);
  motionButton.setAttribute('aria-pressed', String(motionEnabled));
  motionButton.setAttribute('aria-label', motionEnabled ? 'Pause scrolling background' : 'Resume scrolling background');
  motionButton.innerHTML = `${motionEnabled ? 'II' : '▶'} <span>Motion</span>`;
  motionButton.disabled = motionPreference.matches;
  motionButton.title = motionPreference.matches ? 'Reduced motion is enabled on your device' : 'Toggle scrolling pixel art';
  updateParallax();
}
motionButton.addEventListener('click', () => setMotion(!motionEnabled));
motionPreference.addEventListener('change', () => setMotion(!motionPreference.matches));
window.addEventListener('scroll', () => {
  if (!scrollFramePending && motionEnabled) {
    scrollFramePending = true;
    requestAnimationFrame(updateParallax);
  }
}, { passive: true });
setMotion(motionEnabled);

const soundtrack = document.querySelector('#arcade-soundtrack');
const musicButton = document.querySelector('#music');
const musicState = document.querySelector('#music-state');

function updateMusicState() {
  const isPlaying = !soundtrack.paused;
  musicButton.setAttribute('aria-pressed', String(isPlaying));
  musicState.textContent = isPlaying ? 'Music on' : 'Music off';
}

soundtrack.addEventListener('playing', updateMusicState);
soundtrack.addEventListener('pause', updateMusicState);
musicButton.addEventListener('click', async () => {
  if (!soundtrack.paused) {
    soundtrack.pause();
    return;
  }
  try {
    await soundtrack.play();
  } catch (error) {
    updateMusicState();
    if (error.name !== 'AbortError') musicState.textContent = 'Retry music';
  }
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    soundtrack.pause();
    stopGamePreviews();
  }
});

const videoDialog = document.querySelector('#music-video-dialog');
const videoContainer = document.querySelector('#video-container');

// A fresh iframe on each opening stops the video completely when closed.
document.querySelector('#open-video').addEventListener('click', () => {
  soundtrack.pause();
  const iframe = document.createElement('iframe');
  iframe.src = 'https://www.youtube.com/embed/ALZHF5UqnU4?playsinline=1&rel=0';
  iframe.title = 'Marshmello — Alone (Official Music Video)';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
  iframe.allowFullscreen = true;
  iframe.referrerPolicy = 'strict-origin-when-cross-origin';
  videoContainer.replaceChildren(iframe);
  videoDialog.showModal();
  document.body.classList.add('modal-open');
});
document.querySelector('#close-video').addEventListener('click', () => videoDialog.close());
videoDialog.addEventListener('close', () => {
  videoContainer.replaceChildren();
  document.body.classList.remove('modal-open');
});
