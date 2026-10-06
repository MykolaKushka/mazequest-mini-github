export const WIDTH = 17;
export const HEIGHT = 13;

const p = (x, y) => `${x},${y}`;

const walls = new Set();
for (let x = 0; x < WIDTH; x++) {
  walls.add(p(x, 0));
  walls.add(p(x, HEIGHT - 1));
}
for (let y = 0; y < HEIGHT; y++) {
  walls.add(p(0, y));
  walls.add(p(WIDTH - 1, y));
}

// Three chambers separated by a door, a water channel, and a trap barrier.
for (let y = 1; y < HEIGHT - 1; y++) {
  if (y !== 7) walls.add(p(6, y));
  if (y !== 5) walls.add(p(10, y));
}
for (let x = 11; x <= 15; x++) {
  if (x !== 13) walls.add(p(x, 4));
}

// Interior maze walls.
[
  [3, 2], [3, 3], [3, 4], [2, 6], [3, 6], [4, 6], [2, 9], [3, 9],
  [8, 5], [8, 6], [9, 8], [7, 10],
  [12, 6], [14, 6], [14, 7], [14, 8], [12, 10], [13, 10],
  [12, 2], [14, 2]
].forEach(([x, y]) => walls.add(p(x, y)));

export const OBJECTS = Object.freeze({
  start: p(1, 11),
  key: p(4, 3),
  door: p(6, 7),
  switch: p(8, 9),
  bridge: p(10, 5),
  lever: p(12, 8),
  trap: p(13, 4),
  chest: p(11, 2),
  exit: p(15, 1),
  crystals: [p(1, 4), p(9, 2), p(15, 10)]
});

export function createInitialState() {
  return {
    player: { x: 1, y: 11 },
    lastSafe: { x: 1, y: 11 },
    hearts: 3,
    hasKey: false,
    doorOpen: false,
    bridgeActive: false,
    trapsDisabled: false,
    crystals: new Set(),
    star: false,
    status: 'playing',
    message: 'Find the blue key and unlock the path.'
  };
}

export function tileAt(x, y, state) {
  const id = p(x, y);
  if (walls.has(id)) return 'wall';
  if (id === OBJECTS.door) return state.doorOpen ? 'floor' : 'door';
  if (id === OBJECTS.bridge) return state.bridgeActive ? 'bridge' : 'water';
  if (id === OBJECTS.key && !state.hasKey) return 'key';
  if (id === OBJECTS.switch) return 'switch';
  if (id === OBJECTS.lever) return 'lever';
  if (id === OBJECTS.trap) return state.trapsDisabled ? 'safeTrap' : 'trap';
  if (id === OBJECTS.chest) return state.star ? 'openChest' : 'chest';
  if (id === OBJECTS.exit) return 'exit';
  if (OBJECTS.crystals.includes(id) && !state.crystals.has(id)) return 'crystal';
  if (id === OBJECTS.start) return 'start';
  return 'floor';
}

export function allPuzzlesSolved(state) {
  return state.doorOpen && state.bridgeActive && state.trapsDisabled;
}

function copyState(state) {
  return {
    ...state,
    player: { ...state.player },
    lastSafe: { ...state.lastSafe },
    crystals: new Set(state.crystals)
  };
}

export function move(state, dx, dy) {
  if (state.status !== 'playing') return state;
  const next = copyState(state);
  const x = state.player.x + dx;
  const y = state.player.y + dy;
  const id = p(x, y);
  const tile = tileAt(x, y, next);

  if (tile === 'wall') {
    next.message = 'A stone wall blocks the way.';
    return next;
  }
  if (tile === 'water') {
    next.message = 'The water is too deep. Find a bridge switch.';
    return next;
  }
  if (tile === 'door') {
    if (!next.hasKey) {
      next.message = 'Find the blue key.';
      return next;
    }
    next.doorOpen = true;
    next.message = 'The blue door clicks open!';
  }
  if (tile === 'trap') {
    next.hearts -= 1;
    next.player = { ...next.lastSafe };
    next.message = next.hearts > 0 ? 'Ouch! Disable the spikes with the nearby lever.' : 'The maze got the better of you.';
    if (next.hearts <= 0) next.status = 'failed';
    return next;
  }

  next.player = { x, y };
  next.lastSafe = { x, y };

  if (tile === 'key') {
    next.hasKey = true;
    next.message = 'Blue key collected. The door can now be opened.';
  } else if (tile === 'switch') {
    next.bridgeActive = true;
    next.message = 'The bridge rises from the water!';
  } else if (tile === 'lever') {
    next.trapsDisabled = true;
    next.message = 'The spike traps are now disabled.';
  } else if (tile === 'crystal') {
    next.crystals.add(id);
    next.message = `Crystal collected — ${next.crystals.size}/3.`;
  } else if (tile === 'chest' || tile === 'openChest') {
    next.star = true;
    next.message = 'You found the Golden Star!';
  } else if (tile === 'exit') {
    if (allPuzzlesSolved(next)) {
      next.status = 'complete';
      next.message = 'Level complete!';
    } else {
      next.message = 'The portal is sealed. Solve all three puzzles.';
    }
  } else if (tile === 'start') {
    next.message = 'The adventure begins here.';
  }
  return next;
}

export function interact(state, x, y) {
  if (state.status !== 'playing') return state;
  const distance = Math.abs(state.player.x - x) + Math.abs(state.player.y - y);
  if (distance > 1) return { ...copyState(state), message: 'Move next to that object first.' };
  const tile = tileAt(x, y, state);
  if (tile === 'lever') {
    const next = copyState(state);
    next.trapsDisabled = true;
    next.message = 'The spike traps are now disabled.';
    return next;
  }
  if (tile === 'chest' || tile === 'openChest') {
    const next = copyState(state);
    next.star = true;
    next.message = 'You found the Golden Star!';
    return next;
  }
  if (tile === 'door') {
    return move(state, x - state.player.x, y - state.player.y);
  }
  return { ...copyState(state), message: 'Nothing happens yet.' };
}

export const WALKTHROUGH = [
  // Start -> key in chamber one.
  [1,0],[1,0],[1,0],[1,0],[0,-1],[0,-1],[0,-1],[0,-1],[0,-1],[-1,0],[-1,0],[0,-1],[-1,0],
];
