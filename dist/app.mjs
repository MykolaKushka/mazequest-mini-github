import { WIDTH, HEIGHT, OBJECTS, createInitialState, tileAt, move, interact, allPuzzlesSolved } from './logic.mjs';

let state = createInitialState();
let paused = false;
let screen = 'start';
let messageTimer;

const $ = (selector) => document.querySelector(selector);
const screens = {
  start: $('#start-screen'),
  game: $('#game-screen')
};

const tileIcons = {
  key: '🔑',
  switch: '●',
  lever: '↕',
  trap: '▲▲',
  safeTrap: '△△',
  crystal: '◆',
  chest: '▣',
  openChest: '★',
  exit: '◉',
  start: '✦'
};

const tileLabels = {
  key: 'Blue key', switch: 'Bridge switch', lever: 'Trap lever', trap: 'Active spike trap',
  safeTrap: 'Disabled spike trap', crystal: 'Crystal', chest: 'Golden Star chest',
  openChest: 'Opened chest', exit: 'Exit portal', start: 'Starting tile', door: 'Locked blue door',
  bridge: 'Raised bridge', water: 'Deep water', wall: 'Stone wall', floor: 'Floor'
};

function showScreen(name) {
  screen = name;
  Object.entries(screens).forEach(([key, el]) => el.hidden = key !== name);
  if (name === 'game') setTimeout(() => $('#maze').focus(), 0);
}

function resetGame() {
  state = createInitialState();
  paused = false;
  $('#pause-overlay').hidden = true;
  $('#result-overlay').hidden = true;
  $('#pause-button').textContent = 'Pause';
  render();
}

function startGame() {
  resetGame();
  showScreen('game');
}

function tileClass(tile) {
  return `tile tile-${tile}`;
}

function renderMaze() {
  const maze = $('#maze');
  maze.innerHTML = '';
  maze.style.setProperty('--cols', WIDTH);
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const tile = tileAt(x, y, state);
      const cell = document.createElement('div');
      cell.className = tileClass(tile);
      cell.dataset.x = x;
      cell.dataset.y = y;
      cell.setAttribute('role', 'gridcell');
      cell.setAttribute('aria-label', tileLabels[tile]);
      if (tileIcons[tile]) {
        const icon = document.createElement('span');
        icon.className = 'tile-icon';
        icon.textContent = tileIcons[tile];
        cell.append(icon);
      }
      if (state.player.x === x && state.player.y === y) {
        const player = document.createElement('span');
        player.className = 'player';
        player.textContent = '🧑‍🎒';
        player.setAttribute('aria-label', 'Explorer');
        cell.append(player);
      }
      if (['lever', 'door', 'chest', 'openChest'].includes(tile)) {
        cell.classList.add('clickable');
        cell.addEventListener('click', () => {
          if (paused) return;
          state = interact(state, x, y);
          render();
        });
      }
      maze.append(cell);
    }
  }
}

function render() {
  renderMaze();
  $('#heart-value').textContent = '♥'.repeat(Math.max(0, state.hearts)) + '♡'.repeat(Math.max(0, 3 - state.hearts));
  $('#crystal-value').textContent = `${state.crystals.size}/3`;
  $('#key-value').textContent = state.hasKey ? 'Key found' : 'No key';
  $('#key-value').classList.toggle('active', state.hasKey);
  $('#star-value').textContent = state.star ? '★ Found' : '☆ Hidden';
  $('#star-value').classList.toggle('active', state.star);
  $('#message').textContent = state.message;
  const solved = [state.doorOpen, state.bridgeActive, state.trapsDisabled].filter(Boolean).length;
  $('#progress-fill').style.width = `${(solved / 3) * 100}%`;
  $('#progress-label').textContent = `${solved}/3 puzzles`;
  $('#portal-status').textContent = allPuzzlesSolved(state) ? 'Portal ready' : 'Portal sealed';
  if (state.status === 'failed') showResult(false);
  if (state.status === 'complete') showResult(true);
}

function showResult(won) {
  const overlay = $('#result-overlay');
  $('#result-icon').textContent = won ? '🏆' : '💔';
  $('#result-title').textContent = won ? 'Level Complete!' : 'Try Again';
  $('#result-copy').textContent = won
    ? `You solved the maze and collected ${state.crystals.size}/3 crystals${state.star ? ' plus the Golden Star.' : '.'}`
    : 'The traps took your last heart. The maze has reset clues waiting for you.';
  $('#result-action').textContent = won ? 'Play Again' : 'Restart Level';
  overlay.hidden = false;
}

function step(dx, dy) {
  if (screen !== 'game' || paused || state.status !== 'playing') return;
  state = move(state, dx, dy);
  render();
  clearTimeout(messageTimer);
  messageTimer = setTimeout(() => {
    if (state.status === 'playing' && state.message.includes('wall')) {
      state = { ...state, message: allPuzzlesSolved(state) ? 'Reach the glowing portal.' : 'Explore the maze and solve all three puzzles.' };
      render();
    }
  }, 1200);
}

$('#start-button').addEventListener('click', startGame);
$('#how-button').addEventListener('click', () => $('#how-dialog').showModal());
$('#close-how').addEventListener('click', () => $('#how-dialog').close());
$('#restart-button').addEventListener('click', resetGame);
$('#result-action').addEventListener('click', resetGame);
$('#back-menu').addEventListener('click', () => { resetGame(); showScreen('start'); });
$('#pause-button').addEventListener('click', () => {
  paused = !paused;
  $('#pause-overlay').hidden = !paused;
  $('#pause-button').textContent = paused ? 'Resume' : 'Pause';
});
$('#resume-button').addEventListener('click', () => {
  paused = false;
  $('#pause-overlay').hidden = true;
  $('#pause-button').textContent = 'Pause';
  $('#maze').focus();
});

document.querySelectorAll('[data-move]').forEach(button => {
  button.addEventListener('click', () => {
    const [dx, dy] = button.dataset.move.split(',').map(Number);
    step(dx, dy);
  });
});

window.addEventListener('keydown', event => {
  if (screen !== 'game') return;
  const moves = {
    ArrowUp: [0, -1], KeyW: [0, -1], ArrowDown: [0, 1], KeyS: [0, 1],
    ArrowLeft: [-1, 0], KeyA: [-1, 0], ArrowRight: [1, 0], KeyD: [1, 0]
  };
  if (event.code === 'Escape' && state.status === 'playing') {
    event.preventDefault();
    $('#pause-button').click();
  }
  if (moves[event.code]) {
    event.preventDefault();
    step(...moves[event.code]);
  }
});

render();
showScreen('start');
