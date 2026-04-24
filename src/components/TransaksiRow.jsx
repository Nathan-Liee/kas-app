import Icon from "./Icon";

export default function TransaksiRow({ t, onDelete, onEdit, idx }) {
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: t.type === "masuk" ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)", flexShrink: 0 }}>
        <Icon name={t.type === "masuk" ? t.metode === "qris" ? "qris" : "cash" : "minus"} size={18} color={t.type === "masuk" ? "#10B981" : "#EF4444"} />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, color: "#ddd", fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {t.type === "masuk" ? `Customer (${t.metode?.toUpperCase()})` : t.kategori}
        </p>
        {t.type === "keluar" && t.catatan !== "-" && (
          <p style={{ margin: 0, color: "#666688", fontSize: 11 }}>{t.catatan}</p>
        )}
      </div>

      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ margin: 0, color: t.type === "masuk" ? "#10B981" : "#EF4444", fontWeight: 700, fontSize: 14 }}>
          {t.type === "masuk" ? "+" : "-"}{`Rp ${Number(t.jumlah).toLocaleString("id-ID")}`}
        </p>
      </div>

      {onEdit && (
        <button onClick={() => onEdit(idx)}
          style={{ background: "rgba(99,102,241,0.1)", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "#6366F1", flexShrink: 0 }}>
          <Icon name="edit" size={14} />
        </button>
      )}

      {onDelete && (
        <button onClick={() => onDelete(idx)}
          style={{ background: "rgba(239,68,68,0.1)", border: "none", borderRadius: 8, padding: "6px 8px", cursor: "pointer", color: "#EF4444", flexShrink: 0 }}>
          <Icon name="trash" size={14} />
        </button>
      )}
    </div>
  );
}