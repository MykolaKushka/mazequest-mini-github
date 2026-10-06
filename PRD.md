# MazeQuest Mini — Product Requirements Document

**Version:** 1.0  
**Release:** First playable release  
**Platform:** Desktop and mobile web browser  
**Product type:** Mini top-down puzzle adventure

## 1. Product overview

MazeQuest Mini is a short, colorful top-down puzzle adventure. The player guides one explorer through a compact maze, solves three different environmental puzzles, collects optional crystals, and reaches the exit portal.

The first release should provide one complete level that can be started, played, completed, restarted, and understood without additional instructions.

## 2. Product goals

- Deliver one polished, playable maze level lasting approximately 3–7 minutes.
- Make movement and interaction immediately understandable.
- Include at least three puzzles or obstacles with clear visual feedback.
- Reward exploration with optional collectibles.
- Maintain a consistent colorful cartoon-fantasy style.
- Keep the implementation flexible enough to add more levels later.

## 3. Target user

- Casual players and students testing a small browser game.
- Players should not need previous puzzle-game experience.
- The game should be understandable from short on-screen instructions.

## 4. Core gameplay loop

1. Open the start menu.
2. Select **Start Adventure**.
3. Move through the maze using the keyboard or clickable direction controls.
4. Explore side paths and collect crystals.
5. Solve three puzzles that unlock the route to the exit.
6. Reach the exit portal.
7. View the completion screen with the number of collected crystals and an option to play again.

## 5. First-release scope

### 5.1 Level design

Create one compact top-down maze with:

- a clearly marked starting tile;
- a visible but initially inaccessible exit portal;
- connected corridors and several optional side paths;
- walls that the player cannot cross;
- three required puzzles or obstacles;
- three optional collectible crystals;
- one final reward chest near the exit.

The exit should be visible early enough to establish the player's goal, but the player must complete all required puzzles before reaching it.

### 5.2 Required puzzles and obstacles

#### Puzzle 1 — Key and locked door

- A blue door blocks the main route.
- The player must explore a side corridor to collect a blue key.
- Walking into the key adds it to the inventory.
- Approaching the door with the key opens the door.
- Approaching without the key shows a short message: **“Find the blue key.”**

#### Puzzle 2 — Floor switch and bridge

- A gap or water channel blocks the next route.
- Stepping on a floor switch activates a bridge.
- The switch and bridge must visibly change state.
- After activation, the bridge remains available for the rest of the level.

#### Puzzle 3 — Trap control switch

- A corridor contains active spike traps.
- Touching an active trap removes one heart and returns the character to the last safe tile.
- A nearby wall lever disables the traps.
- The lever can be activated by movement interaction or a click when the player is standing next to it.
- Disabled traps must look visually safe.

### 5.3 Collectibles and rewards

- Place three crystals in optional or slightly hidden paths.
- Walking into a crystal collects it and updates the counter.
- Collected crystals disappear from the maze.
- Opening the final chest awards a visible **Golden Star**.
- Collecting every crystal is optional and must not block level completion.

### 5.4 Player character

- One friendly cartoon explorer viewed from above.
- The character occupies one maze tile.
- Movement directions: up, down, left, and right.
- Keyboard controls: Arrow keys and WASD.
- Clickable on-screen direction buttons must also be available.
- The character cannot move diagonally or pass through walls, closed doors, or inactive bridge tiles.
- A short step animation or directional visual feedback is desirable but not required.

### 5.5 Health and failure state

- The player starts with three hearts.
- Active traps remove one heart.
- At zero hearts, show a **Try Again** screen.
- Restarting restores the level, hearts, puzzles, inventory, and collectibles.

## 6. Interface requirements

### 6.1 Start menu

The first screen must include:

- game title: **MazeQuest Mini**;
- short description;
- character preview;
- **Start Adventure** button;
- **How to Play** button or expandable instruction panel.

### 6.2 Level interface

Display:

- three-heart health indicator;
- crystal counter, for example **1/3**;
- key inventory indicator;
- level objective or contextual message;
- clickable directional controls;
- **Pause** and **Restart** controls.

The maze should remain the primary visual focus.

### 6.3 Completion screen

Display:

- **Level Complete** message;
- crystals collected out of three;
- Golden Star status;
- **Play Again** button.

## 7. Interaction and feedback

Every player action should have visible feedback:

- key disappears and inventory updates;
- locked door changes to an open state;
- switch changes color or position;
- bridge visibly appears or activates;
- lever visibly moves;
- traps change from active to disabled;
- crystal counter updates immediately;
- contextual messages appear briefly and do not cover the maze;
- exit portal clearly indicates whether it is locked or ready.

## 8. Visual direction

- Bright cartoon-fantasy aesthetic.
- Clear top-down tile-based maze.
- Saturated but readable colors: blue, turquoise, green, gold, and warm orange accents.
- Walls, doors, hazards, interactive objects, and walkable paths must be visually distinct.
- Player, puzzle objects, and collectibles must not be represented by plain colored squares in the finished release.
- Text must maintain strong contrast and fit inside all UI boxes on desktop and mobile.
- Avoid large dark overlays that mute the game colors.

## 9. Responsive and accessibility requirements

- The complete interface must work without horizontal scrolling.
- On narrow screens, the game and controls may stack vertically.
- Clickable controls must be large enough for touch use.
- Essential information must not rely on color alone; use icons or labels as well.
- Buttons must have visible hover, focus, pressed, and disabled states.
- The game should remain playable using only the keyboard.

## 10. Technical and privacy considerations

- The first release should run entirely in the browser.
- No login, database, external AI API, or personal-data collection is required.
- Game state may remain in memory and reset when the page reloads.
- Level objects should be represented as reusable data or components so additional levels can be added later.
- External copyrighted game characters or artwork must not be used.

## 11. Out of scope for the first release

- Multiple levels or worlds.
- Procedural or AI-generated levels.
- Multiplayer.
- User accounts or saved progress.
- Combat system.
- Dialogue system or complex story.
- Sound settings, achievements, leaderboards, and online sharing.
- A button for generating AI level ideas.

## 12. First-release acceptance criteria

The first release is complete when:

1. The start menu and its buttons work.
2. The player can move in four directions using keyboard and clickable controls.
3. Collision prevents movement through maze walls and blocked objects.
4. The maze has a clear start and exit.
5. The blue key opens the locked blue door.
6. The floor switch activates the bridge.
7. The lever disables the spike traps.
8. Active traps remove hearts and can trigger the failure screen.
9. Three crystals can be collected and counted.
10. The reward chest grants the Golden Star.
11. The level can be completed only after the three required puzzles are solved.
12. Restart and Play Again fully reset the game state.
13. The UI is readable and usable on desktop and mobile.
14. All finished visual elements follow one colorful cartoon style.
15. No first-release feature produces a console-blocking error.

## 13. Recommended initial vibe-coding prompt

> Based on the attached PRD, create the complete first playable release of MazeQuest Mini as a responsive browser game. Implement only the features included in the first-release scope. The result must include a working start menu, one top-down maze, four-direction movement with keyboard and clickable controls, wall collision, three required puzzles, three collectible crystals, health and failure states, a reward chest, an exit condition, and a completion screen. Use a bright, consistent cartoon-fantasy style and keep all text readable. Do not add features listed as out of scope. After implementation, provide a checklist showing which acceptance criteria were completed.

