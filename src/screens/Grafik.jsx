import { useState } from "react";
import { formatUang } from "../utils/format";

export default function GrafikScreen({ data, today }) {
  const [period, setPeriod] = useState("hari");

  const periods = [
    { key: "hari", label: "Hari Ini" },
    { key: "minggu", label: "Minggu Ini" },
    { key: "bulan", label: "Bulan Ini" },
    { key: "tahun", label: "Tahun Ini" },
  ];

  // Hitung data transaksi berdasarkan periode
  const getChartData = () => {
    const now = new Date(today + "T00:00:00");
    let dates = [];

    if (period === "hari") {
      // Per transaksi hari ini
      const transaksi = data[today]?.transaksi ?? [];
      return {
        labels: transaksi.map((_, i) => `T${i + 1}`),
        masuk: transaksi.map(t => (t.type === "masuk" ? t.jumlah : 0)),
        keluar: transaksi.map(t => (t.type === "keluar" ? t.jumlah : 0)),
        transaksi: transaksi,
      };
    } else if (period === "minggu") {
      // 7 hari terakhir (minggu ini)
      const allDates = Object.keys(data).sort();
      dates = allDates.slice(-7);
    } else if (period === "bulan") {
      // Semua hari di bulan ini
      const bulan = today.substring(0, 7);
      dates = Object.keys(data).filter(d => d.startsWith(bulan)).sort();
    } else if (period === "tahun") {
      // Per bulan di tahun ini
      const tahun = today.substring(0, 4);
      const bulanData = {};
      Object.keys(data).forEach(tgl => {
        if (tgl.startsWith(tahun)) {
          const m = tgl.substring(5, 7);
          if (!bulanData[m]) bulanData[m] = [];
          bulanData[m].push(tgl);
        }
      });
      return {
        labels: Object.keys(bulanData).map(m => `Bln ${m}`),
        masuk: Object.values(bulanData).map(dates =>
          dates.reduce((s, tgl) => {
            const t = data[tgl]?.transaksi ?? [];
            return s + t.filter(x => x.type === "masuk").reduce((ss, x) => ss + x.jumlah, 0);
          }, 0)
        ),
        keluar: Object.values(bulanData).map(dates =>
          dates.reduce((s, tgl) => {
            const t = data[tgl]?.transaksi ?? [];
            return s + t.filter(x => x.type === "keluar").reduce((ss, x) => ss + x.jumlah, 0);
          }, 0)
        ),
      };
    }

    // Untuk minggu & bulan
    return {
      labels: dates.map(d => {
        const date = new Date(d + "T00:00:00");
        return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
      }),
      masuk: dates.map(tgl => {
        const t = data[tgl]?.transaksi ?? [];
        return t.filter(x => x.type === "masuk").reduce((s, x) => s + x.jumlah, 0);
      }),
      keluar: dates.map(tgl => {
        const t = data[tgl]?.transaksi ?? [];
        return t.filter(x => x.type === "keluar").reduce((s, x) => s + x.jumlah, 0);
      }),
      dates: dates,
    };
  };

  const chartData = getChartData();
  const maxVal = Math.max(...chartData.masuk, ...chartData.keluar, 1);
  const H = 240;
  const W = 320;
  const pointSpacing = Math.floor((W - 40) / (chartData.labels.length - 1 || 1));

  // Hitung koordinat untuk SVG line chart
  const getPoints = (data) => {
    const points = data.map((val, i) => {
      const x = 20 + i * pointSpacing;
      const y = H - 40 - (val / maxVal) * (H - 80);
      return [x, y];
    });
    return points;
  };

  const masuklPoints = getPoints(chartData.masuk);
  const keluarPoints = getPoints(chartData.keluar);

  const pathMasuk = masuklPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
    .join(" ");
  const pathKeluar = keluarPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`)
    .join(" ");

  return (
    <div style={{ padding: "0 16px 100px" }}>
      <div style={{ paddingTop: 60, paddingBottom: 16 }}>
        <h2 style={{ color: "#fff", fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 22, margin: 0 }}>
          Grafik
        </h2>
      </div>

      {/* Period Tabs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
        {periods.map(p => (
          <button key={p.key} onClick={() => setPeriod(p.key)}
            style={{
              padding: "10px 8px",
              borderRadius: 12,
              border: `1.5px solid ${period === p.key ? "#6366F1" : "rgba(255,255,255,0.1)"}`,
              background: period === p.key ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.04)",
              color: period === p.key ? "#6366F1" : "#aaa",
              fontWeight: 700,
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Sora',sans-serif",
            }}>
            {p.label}
          </button>
        ))}
      </div>

      {/* Statistik */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
        <div style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 14, padding: 14 }}>
          <p style={{ color: "rgba(16,185,129,0.8)", fontSize: 11, fontWeight: 600, margin: "0 0 4px", textTransform: "uppercase" }}>Total Masuk</p>
          <p style={{ color: "#10B981", fontSize: 16, fontWeight: 700, margin: 0 }}>
            {formatUang(chartData.masuk.reduce((a, b) => a + b, 0))}
          </p>
        </div>
        <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 14, padding: 14 }}>
          <p style={{ color: "rgba(239,68,68,0.8)", fontSize: 11, fontWeight: 600, margin: "0 0 4px", textTransform: "uppercase" }}>Total Keluar</p>
          <p style={{ color: "#EF4444", fontSize: 16, fontWeight: 700, margin: 0 }}>
            {formatUang(chartData.keluar.reduce((a, b) => a + b, 0))}
          </p>
        </div>
      </div>

      {/* Line Chart */}
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 16, marginBottom: 20, overflowX: "auto" }}>
        <svg width={W} height={H} style={{ minWidth: W }}>
          {/* Grid */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct, i) => {
            const y = H - 40 - pct * (H - 80);
            return (
              <g key={i}>
                <line x1="20" y1={y} x2={W - 20} y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" strokeDasharray="4" />
                <text x="10" y={y + 4} fontSize="10" fill="rgba(255,255,255,0.3)" textAnchor="end">
                  {formatUang(pct * maxVal)}
                </text>
              </g>
            );
          })}

          {/* Lines */}
          <path d={pathKeluar} stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <path d={pathMasuk} stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

          {/* Points */}
          {masuklPoints.map((p, i) => (
            <circle key={`m${i}`} cx={p[0]} cy={p[1]} r="3" fill="#10B981" stroke="#0D0D1A" strokeWidth="1.5" />
          ))}
          {keluarPoints.map((p, i) => (
            <circle key={`k${i}`} cx={p[0]} cy={p[1]} r="3" fill="#EF4444" stroke="#0D0D1A" strokeWidth="1.5" />
          ))}

          {/* X Labels */}
          <g>
            {chartData.labels.map((label, i) => {
              const x = 20 + i * pointSpacing;
              return (
                <text key={label} x={x} y={H - 10} fontSize="10" fill="rgba(255,255,255,0.5)" textAnchor="middle">
                  {label}
                </text>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "#10B981" }} />
          <span style={{ color: "#aaa", fontSize: 12 }}>Pemasukan</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: 2, background: "#EF4444" }} />
          <span style={{ color: "#aaa", fontSize: 12 }}>Pengeluaran</span>
        </div>
      </div>

      {/* Detail Transaksi (hanya saat hari ini) */}
      {period === "hari" && chartData.transaksi && chartData.transaksi.length > 0 && (
        <>
          <p style={{ color: "#6366F1", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
            Detail Transaksi Hari Ini
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {chartData.transaksi.map((t, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#aaa", fontSize: 12 }}>{t.kategori || t.metode?.toUpperCase() || "Transfer"}</span>
                <span style={{ color: t.type === "masuk" ? "#10B981" : "#EF4444", fontWeight: 700, fontSize: 12 }}>
                  {t.type === "masuk" ? "+" : "-"}{formatUang(t.jumlah)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}