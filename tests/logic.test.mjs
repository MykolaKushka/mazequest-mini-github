import assert from 'node:assert/strict';
import { createInitialState, move, interact, tileAt, allPuzzlesSolved } from '../dist/logic.mjs';

let state = createInitialState();
assert.equal(state.hearts, 3);
assert.equal(state.crystals.size, 0);
assert.equal(tileAt(0, 0, state), 'wall');

// Collision with the outer wall.
state = move(state, -1, 0);
assert.deepEqual(state.player, { x: 1, y: 11 });

// Door cannot open before finding the key.
state.player = { x: 5, y: 7 };
state.lastSafe = { x: 5, y: 7 };
state = move(state, 1, 0);
assert.equal(state.doorOpen, false);
assert.deepEqual(state.player, { x: 5, y: 7 });

// Key opens the door.
state.hasKey = true;
state = move(state, 1, 0);
assert.equal(state.doorOpen, true);
assert.deepEqual(state.player, { x: 6, y: 7 });

// Switch activates the bridge.
state.player = { x: 8, y: 8 };
state.lastSafe = { x: 8, y: 8 };
state = move(state, 0, 1);
assert.equal(state.bridgeActive, true);
assert.equal(tileAt(10, 5, state), 'bridge');

// Adjacent lever click disables traps.
state.player = { x: 11, y: 8 };
state.lastSafe = { x: 11, y: 8 };
state = interact(state, 12, 8);
assert.equal(state.trapsDisabled, true);
assert.equal(allPuzzlesSolved(state), true);

// Crystal collection increments once.
state.player = { x: 1, y: 5 };
state.lastSafe = { x: 1, y: 5 };
state = move(state, 0, -1);
assert.equal(state.crystals.size, 1);
state = move(state, 0, 1);
state = move(state, 0, -1);
assert.equal(state.crystals.size, 1);

// Chest grants the star.
state.player = { x: 11, y: 3 };
state.lastSafe = { x: 11, y: 3 };
state = move(state, 0, -1);
assert.equal(state.star, true);

// Exit completes only after required puzzles.
state.player = { x: 15, y: 2 };
state.lastSafe = { x: 15, y: 2 };
state = move(state, 0, -1);
assert.equal(state.status, 'complete');

// Active trap damages and resets; three hits fail.
let danger = createInitialState();
danger.player = { x: 13, y: 5 };
danger.lastSafe = { x: 13, y: 5 };
danger = move(danger, 0, -1);
danger = move(danger, 0, -1);
danger = move(danger, 0, -1);
assert.equal(danger.hearts, 0);
assert.equal(danger.status, 'failed');

console.log('MazeQuest game logic tests passed.');
