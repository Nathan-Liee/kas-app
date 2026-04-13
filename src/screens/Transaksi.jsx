import { useState } from "react";
import Card from "../components/Card";
import TransaksiRow from "../components/TransaksiRow";

export default function TransaksiScreen({ data, today, setModal, setHapusIdx }) {
  const [filter, setFilter] = useState("semua");

  const semua = data[today]?.transaksi ?? [];
  const filtered = filter === "semua" ? semua
    : filter === "masuk" ? semua.filter(t => t.type === "masuk")
    : semua.filter(t => t.type === "keluar");

  const tabs = [
    { key: "semua",  label: "Semua" },
    { key: "masuk",  label: "Pemasukan" },
    { key: "keluar", label: "Pengeluaran" },
  ];

  return (
    <div style={{ padding: "0 16px 100px" }}>
      <div style={{ paddingTop: 60, paddingBottom: 16, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h2 style={{ color: "#fff", fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 22, margin: 0 }}>
          Transaksi
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setModal("hapus")}
            style={{ background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, padding: "8px 12px", cursor: "pointer", color: "#EF4444", fontSize: 12, fontWeight: 600 }}>
            Hapus
          </button>
          <button onClick={() => setModal("reset")}
            style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 10, padding: "8px 12px", cursor: "pointer", color: "#F59E0B", fontSize: 12, fontWeight: 600 }}>
            Reset
          </button>
        </div>
      </div>

      {/* Tab Filter */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            style={{
              padding: "10px", borderRadius: 12, border: `1.5px solid ${filter === t.key ? "#6366F1" : "rgba(255,255,255,0.1)"}`,
              background: filter === t.key ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
              color: filter === t.key ? "#6366F1" : "#aaa",
              fontWeight: 700, fontSize: 13, cursor: "pointer",
              fontFamily: "'Sora',sans-serif",
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card>
          <p style={{ color: "#555577", textAlign: "center", margin: "24px 0", fontSize: 14 }}>
            Belum ada transaksi
          </p>
        </Card>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((t, i) => (
            <TransaksiRow
              key={i}
              t={t}
              idx={semua.indexOf(t)}
              onDelete={(idx) => {
                setHapusIdx(idx);
                setModal("konfirmHapus");
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}