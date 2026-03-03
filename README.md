# Chesslet

A minimalist chess puzzle game with a twist: **every move must be a capture**. Reduce the board to a single piece to win.

Play at [chesslet.xyz](https://www.chesslet.xyz/)

## The Rules

1. **4x4 Board** — A compact battlefield with white pieces only
2. **Capture Only** — You can only move by capturing another piece
3. **One Piece Wins** — Keep capturing until only one piece remains

## Game Modes

| Mode | Description |
|------|-------------|
| **Campaign** | 100 curated levels with progressive difficulty |
| **Random** | Generate endless puzzles with difficulty selection |
| **Puzzle** | Play a specific puzzle via shareable link |
| **Designer** | Create custom puzzles with real-time solvability analysis |
| **Timed** | 60-second challenge with high score tracking |

## Monorepo Structure

This is a pnpm workspace monorepo with shared game logic and two app frontends.

```
chesslet/
├── packages/
│   └── game-logic/        # @chesslet/game-logic — shared pure-JS engine
├── apps/
│   ├── web/               # @chesslet/web — Next.js 15 web app
│   └── mobile/            # @chesslet/mobile — Expo SDK 54 React Native app
├── pnpm-workspace.yaml
└── package.json
```

### `packages/game-logic/`

Shared pure-JavaScript game logic with zero framework dependencies:

- **engine.js** — Move validation and capture mechanics
- **solver.js** — DFS-based puzzle solver with difficulty metrics
- **generator.js** — Random puzzle generation with difficulty targeting
- **fen.js** — Custom 4x4 FEN encoding/decoding
- **levels.js** — 100 pre-generated campaign levels
- **constants.js** — Board size, piece definitions, color palette

### `apps/web/`

Next.js 15 web app with Tailwind CSS, drag-and-drop board, and URL-based puzzle sharing. See [apps/web/README.md](apps/web/README.md).

### `apps/mobile/`

Expo SDK 54 React Native app with gesture-based interaction, haptic feedback, and deep linking. See [apps/mobile/README.md](apps/mobile/README.md).

## Getting Started

### Prerequisites

- Node.js 18+
- [pnpm](https://pnpm.io/) 9+

### Installation

```bash
git clone https://github.com/yourusername/chesslet.git
cd chesslet
pnpm install
```

### Development

```bash
# Web
pnpm --filter web dev

# Mobile
pnpm --filter mobile start
```

### Testing

```bash
pnpm --filter web test
```

## Custom FEN Format

Chesslet uses a custom 4x4 FEN notation:

```
KN2/4/4/PP2
```

- **Pieces:** K (King), Q (Queen), R (Rook), B (Bishop), N (Knight), P (Pawn)
- **Empty squares:** Numbers 1-4
- **Rows:** Separated by `/` (or `-` in URLs)

## License

MIT
