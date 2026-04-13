import Icon from "./Icon";

const variants = {
  primary: { background: "linear-gradient(135deg,#7C3AED,#4F46E5)", color: "#fff" },
  danger:  { background: "linear-gradient(135deg,#DC2626,#B91C1C)", color: "#fff" },
  ghost:   { background: "rgba(255,255,255,0.06)", color: "#ccc", border: "1px solid rgba(255,255,255,0.1)" },
  success: { background: "linear-gradient(135deg,#059669,#047857)", color: "#fff" },
  warning: { background: "linear-gradient(135deg,#D97706,#B45309)", color: "#fff" },
};

export default function Btn({ children, onClick, variant = "primary", icon, disabled, style: sx }) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        ...variants[variant],
        borderRadius: 14,
        padding: "15px 18px",
        minHeight: 56,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: 14,
        fontFamily: "'Sora', sans-serif",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        transition: "all 0.15s",
        opacity: disabled ? 0.5 : 1,
        width: "100%",
        letterSpacing: 0.3,
        ...sx,
      }}
    >
      {icon && <Icon name={icon} size={16} />}
      {children}
    </button>
  );
}
