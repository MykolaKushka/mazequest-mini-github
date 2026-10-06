# MazeQuest Mini

MazeQuest Mini is a responsive top-down browser puzzle game built as a first-release vibe-coding project.

## Play

Open `dist/index.html` through a static web server. The game has no build step and requires no API keys.

## Controls

- Arrow keys or WASD
- Clickable/touch D-pad
- Click adjacent doors, levers, and chests to interact

## First-release features

- One complete maze level with a clear start and exit
- Blue-key and locked-door puzzle
- Floor-switch and bridge puzzle
- Lever and spike-trap puzzle
- Three optional crystals and one Golden Star chest
- Three-heart health system, failure screen, pause, restart, and completion screen
- Responsive start menu and game interface

## Project files

- `PRD.md` — full product requirements and acceptance criteria
- `mockups/mazequest-ui-reference.png` — visual reference
- `dist/` — deployable game
- `tests/logic.test.mjs` — core game-logic verification

## Test

```bash
node tests/logic.test.mjs
```

