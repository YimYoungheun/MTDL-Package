export default function ChevronsDownIcon({ size = 32, color = "#222" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} fill="none"
      strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"
      style={{ display: "block" }}>
      <path d="M7 6l5 5 5-5" />
      <path d="M7 13l5 5 5-5" />
    </svg>
  );
} 