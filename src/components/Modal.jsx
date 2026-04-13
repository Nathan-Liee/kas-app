import Icon from "./Icon";

export default function Modal({ show, onClose, title, children }) {
  if (!show) return null;
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.55)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        animation: "fadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: "#1A1A2E",
          borderRadius: "24px 24px 0 0",
          width: "100%",
          maxWidth: 440,
          maxHeight: "90vh",
          overflow: "auto",
          padding: "0 0 32px 0",
          animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.4)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "20px 20px 0",
          }}
        >
          <h2
            style={{
              color: "#fff",
              fontSize: 18,
              fontFamily: "'Sora', sans-serif",
              fontWeight: 700,
              margin: 0,
            }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "none",
              borderRadius: 50,
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#aaa",
            }}
          >
            <Icon name="close" size={16} />
          </button>
        </div>
        <div style={{ padding: "16px 20px 0" }}>{children}</div>
      </div>
    </div>
  );
}
