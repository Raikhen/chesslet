# Chesslet — Web

The Next.js web frontend for Chesslet. Game logic is imported from the shared `@chesslet/game-logic` package.

Play at [chesslet.xyz](https://www.chesslet.xyz/)

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + styled-jsx
- **Testing:** Jest + React Testing Library
- **Fonts:** DM Sans, Crimson Pro (via Google Fonts)

## Development

From the monorepo root:

```bash
pnpm --filter web dev          # Start dev server (localhost:3000)
pnpm --filter web build        # Production build
pnpm --filter web test         # Run all tests
pnpm --filter web test:watch   # Run tests in watch mode
```

Or from this directory:

```bash
pnpm dev
pnpm build
pnpm test
```

## Routes

| Route | File | Description |
|-------|------|-------------|
| `/` | `app/page.js` | Campaign mode — 100 levels with localStorage progress |
| `/random` | `app/random/page.js` | Random puzzles with difficulty selection |
| `/puzzle/[fen]` | `app/puzzle/[fen]/page.js` | Shareable puzzle via URL-encoded FEN |
| `/designer` | `app/designer/page.js` | Puzzle designer with solvability analysis |
| `/timed` | `app/timed/page.js` | 60-second timed challenge |

## Project Structure

```
app/                    # Next.js App Router pages
components/             # React components
  Board.js              # Chess board with drag-and-drop + click-to-move
  GamePage.js           # Unified game page used by all modes
  DesignerBoard.js      # Puzzle designer board
  Piece.js              # Piece rendering with SVG images
  Header.js             # App header with mode selector
  Modal.js              # Congrats and level complete modals
lib/
  useGame.js            # React game state hook ("use client")
  constants.js          # Web-specific PIECE_IMAGES + re-exports from shared package
scripts/
  generate-levels.js    # Regenerate 100 campaign levels
__tests__/              # Jest test suites (6 suites, 190 tests)
public/pieces/          # SVG chess piece images
```

## Web-Specific Details

- **Piece rendering** uses SVG images via `PIECE_IMAGES` in `lib/constants.js`
- **Puzzle sharing** encodes FEN in the URL path (`/puzzle/KN2-4-4-PP2`)
- **Campaign progress** persists in `localStorage`
- **Board interaction** supports both drag-and-drop and click-to-move

## Level Generation

```bash
node scripts/generate-levels.js
```

Generates 100 campaign levels with weighted piece selection and hill climbing optimization. Output goes to `../../packages/game-logic/levels.js`.
