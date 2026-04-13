export default function Card({ children, style: sx }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 18,
        padding: 16,
        ...sx,
      }}
    >
      {children}
    </div>
  );
}
