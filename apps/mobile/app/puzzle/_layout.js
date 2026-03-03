import { Stack } from "expo-router";
import { COLORS } from "@chesslet/game-logic";

export default function PuzzleLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.background },
        animation: "slide_from_right",
      }}
    />
  );
}
