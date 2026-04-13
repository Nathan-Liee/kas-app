const colors = { success: "#10B981", error: "#EF4444", info: "#6366F1" };

export default function Toast({ msg, type }) {
  if (!msg) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 60,
        left: "50%",
        transform: "translateX(-50%)",
        background: colors[type] || "#333",
        color: "#fff",
        borderRadius: 14,
        padding: "10px 20px",
        fontSize: 13,
        fontWeight: 600,
        zIndex: 2000,
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        animation: "fadeIn 0.2s ease",
        whiteSpace: "nowrap",
        fontFamily: "'Sora', sans-serif",
      }}
    >
      {msg}
    </div>
  );
}
