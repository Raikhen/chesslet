# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Project Overview

Chesslet is a chess puzzle game where every move must be a capture — the goal is to capture your own pieces until only one remains. It uses a 4x4 board with custom FEN notation.

This is a **pnpm workspace monorepo** with three packages:

```
chesslet/
├── packages/game-logic/   # @chesslet/game-logic — shared pure-JS game logic
├── apps/web/              # @chesslet/web — Next.js 15 web app
└── apps/mobile/           # @chesslet/mobile — Expo SDK 54 React Native app
```

## Development Commands

```bash
# Install all dependencies
pnpm install

# Web app
pnpm --filter web dev          # Start Next.js dev server
pnpm --filter web build        # Production build
pnpm --filter web test         # Run Jest tests
pnpm --filter web test:watch   # Run tests in watch mode

# Mobile app
pnpm --filter mobile start     # Start Expo dev server
pnpm --filter mobile ios       # Run on iOS
pnpm --filter mobile android   # Run on Android
```

## Package Structure

### `packages/game-logic/` (@chesslet/game-logic)
Shared pure-JS game logic with no framework dependencies:
- `constants.js` — BOARD_SIZE, PIECES, COLORS, DIFFICULTY_COLORS, createEmptyBoard
- `engine.js` — Move validation, capture mechanics (all moves must be captures)
- `fen.js` — Custom 4x4 FEN encoding/decoding
- `solver.js` — DFS puzzle solver with difficulty metrics
- `generator.js` — Random puzzle generation with difficulty targeting
- `levels.js` — 100 pre-generated campaign levels
- `index.js` — Barrel re-export of everything

### `apps/web/` (@chesslet/web)
Next.js 15 web app with Tailwind CSS:
- `lib/useGame.js` — React hook for game state (has `"use client"`)
- `lib/constants.js` — Web-specific `PIECE_IMAGES` + re-exports from shared package
- Routes: Campaign (`/`), Random (`/random`), Puzzle (`/puzzle/[fen]`), Designer (`/designer`), Timed (`/timed`)

### `apps/mobile/` (@chesslet/mobile)
Expo SDK 54 React Native app:
- `lib/useGame.js` — React hook for game state (uses `useRef` init pattern)
- `lib/storage.js` — AsyncStorage persistence
- Routes: Campaign, Random, Puzzle, Designer, Timed

## Key Conventions

- Game logic imports come from `@chesslet/game-logic`
- `useGame` and platform-specific code stays in each app's `lib/`
- Web uses `PIECE_IMAGES` from `@/lib/constants` (web-only SVG paths)
- Mobile uses `COLORS` directly from `@chesslet/game-logic`
- All moves must satisfy `isValidCapture()` — destination square must contain a piece
- FEN format: "row0/row1/row2/row3" with pieces K,Q,R,B,N,P and digits 1-4 for empty squares
