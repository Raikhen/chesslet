import GameLayout from "@/components/GameLayout";

export const metadata = {
  title: "Privacy Policy - Chesslet",
  description: "Privacy policy for the Chesslet chess puzzle game",
};

export default function PrivacyPage() {
  return (
    <GameLayout>
      <div className="instructions-card" style={{ padding: "2rem" }}>
        <h1
          style={{
            fontSize: "1.75rem",
            marginTop: 0,
            marginBottom: "0.5rem",
          }}
        >
          Privacy Policy
        </h1>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--surface-500)",
            marginTop: 0,
            marginBottom: "1.5rem",
          }}
        >
          Effective: February 2026
        </p>

        <h2
          style={{
            fontSize: "1.125rem",
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
          }}
        >
          Overview
        </h2>
        <p className="instructions-text">
          Chesslet is a chess puzzle game that respects your privacy. We do not
          collect, store, or transmit any personal data. The game runs entirely
          on your device.
        </p>

        <h2
          style={{
            fontSize: "1.125rem",
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
          }}
        >
          Data Collection
        </h2>
        <p className="instructions-text">
          Chesslet does not collect any personal information. There are no
          accounts, no sign-ups, and no server-side storage of any kind.
        </p>

        <h2
          style={{
            fontSize: "1.125rem",
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
          }}
        >
          Local Storage
        </h2>
        <p className="instructions-text">
          Game progress and high scores are stored locally on your device using
          your browser&apos;s local storage (web) or AsyncStorage (mobile app).
          This data never leaves your device and is not accessible to us or any
          third party.
        </p>

        <h2
          style={{
            fontSize: "1.125rem",
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
          }}
        >
          Shared Puzzles
        </h2>
        <p className="instructions-text">
          When you share a puzzle, the board state is encoded directly in the
          URL. No data is sent to or stored on any server.
        </p>

        <h2
          style={{
            fontSize: "1.125rem",
            marginTop: "1.5rem",
            marginBottom: "0.5rem",
          }}
        >
          Analytics &amp; Tracking
        </h2>
        <p className="instructions-text">
          Chesslet does not use any analytics, advertising, or third-party
          tracking services.
        </p>

        <p
          className="instructions-text"
          style={{ marginTop: "1.5rem", fontSize: "0.8125rem" }}
        >
          &copy; 2026 Raikhen LLC
        </p>
      </div>
    </GameLayout>
  );
}
