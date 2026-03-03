export { BOARD_SIZE, PIECES, createEmptyBoard, DIFFICULTY_COLORS, COLORS } from "./constants.js";
export {
  boardToFen,
  fenToBoard,
  fenToUrl,
  urlToFen,
  countPieces,
  getPiecePositions,
  cloneBoard,
  isValidFen,
} from "./fen.js";
export {
  getValidCaptures,
  isValidCapture,
  executeCapture,
  getAllValidMoves,
  isSolved,
  isStuck,
} from "./engine.js";
export {
  solvePuzzle,
  isSolvable,
  getHint,
  moveKeepsSolvable,
  analyzeMoves,
  calculateWeightedDifficulty,
  getPuzzleMetrics,
} from "./solver.js";
export {
  DIFFICULTY,
  getDifficultyLevel,
  generatePuzzle,
  generatePuzzleSet,
  evaluatePuzzle,
  STARTER_PUZZLES,
  getStarterPuzzle,
} from "./generator.js";
export {
  LEVELS,
  TOTAL_LEVELS,
  getLevel,
  getDifficultyFromScore,
} from "./levels.js";
