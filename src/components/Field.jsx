export default function Field({ label, value, onChange, type = "text", placeholder, prefix, onKeyDown }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label
        style={{
          color: "#8888aa",
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 1,
          textTransform: "uppercase",
          display: "block",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "rgba(255,255,255,0.05)",
          border: "1.5px solid rgba(255,255,255,0.1)",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        {prefix && (
          <span
            style={{
              padding: "12px 0 12px 14px",
              color: "#8888aa",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onKeyDown?.(e);
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter' || e.keyCode === 13) onKeyDown?.(e);
          }}
          onInput={(e) => {
            if (e.nativeEvent?.inputType === 'insertLineBreak') onKeyDown?.({ key: 'Enter' });
          }}
          inputMode={type === "number" ? "numeric" : "text"}
          enterKeyHint="done"
          placeholder={placeholder}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#fff",
            fontSize: 15,
            padding: "12px 14px",
            fontFamily: "'Sora', sans-serif",
          }}
        />
      </div>
    </div>
  );
}
