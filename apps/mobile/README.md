# Chesslet — Mobile

The React Native mobile app for Chesslet, built with Expo. Game logic is imported from the shared `@chesslet/game-logic` package.

## Tech Stack

- **Framework:** React Native 0.81 / Expo SDK 54
- **Navigation:** Expo Router
- **Animations:** react-native-reanimated
- **Gestures:** react-native-gesture-handler
- **Piece rendering:** react-native-svg
- **Persistence:** AsyncStorage
- **Haptics:** expo-haptics
- **Fonts:** DM Sans, Crimson Pro (via expo-google-fonts)

## Development

From the monorepo root:

```bash
pnpm --filter mobile start      # Start Expo dev server
pnpm --filter mobile ios        # Run on iOS simulator
pnpm --filter mobile android    # Run on Android emulator
```

Or from this directory:

```bash
pnpm start
pnpm ios
pnpm android
```

Press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

## Screens

| Screen | File | Description |
|--------|------|-------------|
| Home | `app/index.js` | Mode selection menu |
| Campaign | `app/campaign.js` | 100 levels with AsyncStorage progress |
| Random | `app/random.js` | Random puzzles with solution viewer |
| Timed | `app/timed.js` | 60-second challenge with high score |
| Designer | `app/designer.js` | Create puzzles with drag-and-drop + sharing |
| Puzzle | `app/puzzle/[fen].js` | Deep-linked puzzle via FEN |

## Project Structure

```
app/                    # Expo Router screens
components/
  Board.js              # Gesture-based chess board with animations
  ChessPieces.js        # SVG piece rendering
  DesignerBoard.js      # Puzzle designer with drag-and-drop
  GameHeader.js         # Screen header with back/help buttons
  Modals.js             # Congrats, level select, instructions modals
  Overlays.js           # Win celebration with confetti
  Toast.js              # Animated toast notifications
lib/
  useGame.js            # React game state hook (useRef init pattern)
  storage.js            # AsyncStorage persistence (progress + high scores)
assets/                 # App icons, splash screen, adaptive icon
```

## Mobile-Specific Details

- **Piece rendering** uses inline SVG via `react-native-svg` (no image assets)
- **Board interaction** uses gesture-based drag-and-drop with spring animations
- **Haptic feedback** on piece selection and captures
- **Campaign progress** and timed mode high scores persist via AsyncStorage
- **Puzzle sharing** uses deep links via `expo-linking` (`chesslet://puzzle/[fen]`)
- **Metro config** (`metro.config.js`) is configured with `watchFolders` to resolve the shared `@chesslet/game-logic` package from the monorepo root

## Building for Production

```bash
# Local native builds
pnpm ios
pnpm android

# EAS Build (cloud)
npx eas build --platform ios
npx eas build --platform android
```
