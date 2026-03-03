import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <span>
        Made by <strong>Dylan Fridman</strong>
      </span>
      <span style={{ margin: "0 0.5rem" }}>·</span>
      <Link href="/privacy">Privacy</Link>
    </footer>
  );
}
