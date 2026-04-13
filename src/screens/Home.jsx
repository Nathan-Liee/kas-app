import Card from "../components/Card";
import Icon from "../components/Icon";
import { formatHari, formatUang } from "../utils/format";
import TransaksiRow from "../components/TransaksiRow";

export default function HomeScreen({ data, today, todayCalc, setModal, setTab, profile }) {
  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg,#7C3AED 0%,#4F46E5 60%,#2563EB 100%)",
        borderRadius: "0 0 32px 32px",
        padding: "48px 20px 32px",
        marginBottom: 20,
      }}>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", margin: "0 0 4px" }}>
          Halo, {profile?.username || "User"}
        </p>
        <h1 style={{ color: "#fff", fontSize: 28, fontFamily: "'Sora', sans-serif", fontWeight: 800, margin: "0 0 4px" }}>
          {formatUang(todayCalc.saldoCash ?? 0)}
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: "0 0 20px" }}>
          {formatHari(today)}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
          {[
            { label: "Cash Masuk", val: todayCalc.totalCash ?? 0,   color: "#10B981" },
            { label: "QRIS Masuk", val: todayCalc.totalQris ?? 0,   color: "#06B6D4" },
            { label: "Keluar",     val: todayCalc.totalKeluar ?? 0, color: "#F59E0B" },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ background: "rgba(255,255,255,0.12)", borderRadius: 14, padding: "10px 12px" }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 10, fontWeight: 600, margin: "0 0 4px", letterSpacing: 0.5 }}>{label}</p>
              <p style={{ color, fontSize: 13, fontWeight: 700, margin: 0 }}>{formatUang(val)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Saldo Cards */}
      <div style={{ padding: "0 16px" }}>
        <p style={{ color: "#6366F1", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
          Ringkasan Saldo
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
          {[
            { label: "Cash Fisik",   val: todayCalc.saldoCash ?? 0,      color: "#10B981" },
            { label: "Total Sistem", val: todayCalc.saldoTotal ?? 0,     color: "#6366F1" },
            { label: "Tanpa Gaji",   val: todayCalc.saldoTanpaGaji ?? 0, color: "#F59E0B" },
          ].map(({ label, val, color }) => (
            <Card key={label}>
              <p style={{ color: "#6b6b88", fontSize: 11, fontWeight: 600, margin: "0 0 6px", letterSpacing: 0.5 }}>{label}</p>
              <p style={{ color, fontSize: 15, fontWeight: 700, margin: 0 }}>{formatUang(val)}</p>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <p style={{ color: "#6366F1", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
          Aksi Cepat
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
          <button onClick={() => setModal("masuk")} style={{ background: "linear-gradient(135deg,#059669,#047857)", border: "none", borderRadius: 16, padding: "16px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, color: "#fff" }}>
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, padding: 8 }}><Icon name="plus" size={18} /></div>
            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 14 }}>Pemasukan</span>
          </button>
          <button onClick={() => setModal("keluar")} style={{ background: "linear-gradient(135deg,#DC2626,#B91C1C)", border: "none", borderRadius: 16, padding: "16px 12px", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, color: "#fff" }}>
            <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 10, padding: 8 }}><Icon name="minus" size={18} /></div>
            <span style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 14 }}>Pengeluaran</span>
          </button>
        </div>

        {/* Transaksi Hari Ini */}
        <p style={{ color: "#6366F1", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
          Transaksi Hari Ini
        </p>
        {(data[today]?.transaksi?.length ?? 0) === 0 ? (
          <Card>
            <p style={{ color: "#555577", textAlign: "center", margin: "16px 0", fontSize: 14 }}>Belum ada transaksi</p>
          </Card>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[...data[today].transaksi].reverse().slice(0, 5).map((t, i) => (
              <TransaksiRow key={i} t={t} />
            ))}
            {data[today].transaksi.length > 5 && (
              <button onClick={() => setTab("riwayat")} style={{ background: "none", border: "1px solid rgba(99,102,241,0.4)", borderRadius: 12, color: "#6366F1", padding: "10px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                Lihat semua ({data[today].transaksi.length} transaksi)
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}