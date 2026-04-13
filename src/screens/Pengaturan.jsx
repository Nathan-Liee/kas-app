import { useState } from "react";
import Card from "../components/Card";
import Badge from "../components/Badge";
import Icon from "../components/Icon";
import Btn from "../components/Button";
import Field from "../components/Field";
import { formatUang } from "../utils/format";
import { updateProfile, updatePassword } from "../utils/storage";

export default function PengaturanScreen({
  data, today, dates,
  setUbahTarget, setFormUangAwal, setModal,
  profile, setProfile, onLogout
}) {
  const [editUsername, setEditUsername] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [editPassword, setEditPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [konfirmPassword, setKonfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [konfirmLogout, setKonfirmLogout] = useState(false);
  const [msg, setMsg] = useState("");

  const doUpdateUsername = async () => {
    if (!newUsername) return setMsg("Username tidak boleh kosong!");
    setLoading(true);
    try {
      await updateProfile(newUsername);
      setProfile({ ...profile, username: newUsername });
      setEditUsername(false);
      setNewUsername("");
      setMsg("Username berhasil diubah!");
      setTimeout(() => setMsg(""), 2000);
    } catch {
      setMsg("Gagal mengubah username!");
    } finally {
      setLoading(false);
    }
  };

  const doUpdatePassword = async () => {
    if (!newPassword) return setMsg("Password tidak boleh kosong!");
    if (newPassword.length < 6) return setMsg("Password minimal 6 karakter!");
    if (newPassword !== konfirmPassword) return setMsg("Password tidak cocok!");
    setLoading(true);
    try {
      await updatePassword(newPassword);
      setEditPassword(false);
      setNewPassword("");
      setKonfirmPassword("");
      setMsg("Password berhasil diubah!");
      setTimeout(() => setMsg(""), 2000);
    } catch {
      setMsg("Gagal mengubah password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "0 16px 100px" }}>
      <div style={{ paddingTop: 60, paddingBottom: 16 }}>
        <h2 style={{ color: "#fff", fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 22, margin: 0 }}>
          Pengaturan
        </h2>
      </div>

      {/* Akun Info */}
      <p style={{ color: "#6366F1", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
        Akun
      </p>
      <Card style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: 18, fontFamily: "'Sora',sans-serif" }}>
              {profile?.username?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
          <div>
            <p style={{ margin: "0 0 2px", color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "'Sora',sans-serif" }}>
              {profile?.username || "User"}
            </p>
            <p style={{ margin: 0, color: "#6b6b88", fontSize: 12 }}>{profile?.email || ""}</p>
          </div>
        </div>

        {msg && (
          <p style={{ color: "#10B981", fontSize: 13, margin: "0 0 12px", textAlign: "center", fontWeight: 600 }}>{msg}</p>
        )}

        {/* Edit Username */}
        {!editUsername ? (
          <button onClick={() => { setEditUsername(true); setNewUsername(profile?.username || ""); setEditPassword(false); }}
            style={{ width: "100%", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 12, padding: "12px", cursor: "pointer", color: "#6366F1", fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 13, marginBottom: 8 }}>
            Ubah Username
          </button>
        ) : (
          <div style={{ marginBottom: 8 }}>
            <Field label="Username Baru" value={newUsername} onChange={setNewUsername} placeholder="Username baru" onKeyDown={(e) => e.key === 'Enter' && doUpdateUsername()} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <Btn onClick={() => setEditUsername(false)} variant="ghost">Batal</Btn>
              <Btn onClick={doUpdateUsername} disabled={loading}>{loading ? "Menyimpan..." : "Simpan"}</Btn>
            </div>
          </div>
        )}

        {/* Edit Password */}
        {!editPassword ? (
          <button onClick={() => { setEditPassword(true); setEditUsername(false); }}
            style={{ width: "100%", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 12, padding: "12px", cursor: "pointer", color: "#6366F1", fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: 13 }}>
            Ubah Password
          </button>
        ) : (
          <div>
            <Field label="Password Baru" value={newPassword} onChange={setNewPassword} type="password" placeholder="Minimal 6 karakter" onKeyDown={(e) => e.key === 'Enter' && doUpdatePassword()} />
            <Field label="Konfirmasi Password" value={konfirmPassword} onChange={setKonfirmPassword} type="password" placeholder="Ulangi password baru" onKeyDown={(e) => e.key === 'Enter' && doUpdatePassword()} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <Btn onClick={() => setEditPassword(false)} variant="ghost">Batal</Btn>
              <Btn onClick={doUpdatePassword} disabled={loading}>{loading ? "Menyimpan..." : "Simpan"}</Btn>
            </div>
          </div>
        )}
      </Card>

      {/* Uang Awal */}
      <p style={{ color: "#6366F1", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
        Uang Awal
      </p>
      {!data[today] && (
  <button onClick={() => setModal("setup")}
    style={{ width: "100%", background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 14, padding: "14px", cursor: "pointer", color: "#6366F1", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 14, marginBottom: 16 }}>
    Setup Uang Awal Hari Ini
  </button>
)}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
        {dates.map((tgl) => (
          <div key={tgl} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <p style={{ margin: "0 0 2px", color: "#ddd", fontWeight: 600, fontSize: 14 }}>
                {tgl}{" "}{tgl === today && <Badge color="#6366F1">Hari Ini</Badge>}
              </p>
              <p style={{ margin: 0, color: "#10B981", fontSize: 13, fontWeight: 700 }}>
                {formatUang(data[tgl]?.uang_awal ?? 0)}
              </p>
            </div>
            <button onClick={() => { setUbahTarget(tgl); setFormUangAwal(String(data[tgl]?.uang_awal ?? "")); setModal("ubahAwal"); }}
              style={{ background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 10, padding: "8px 12px", cursor: "pointer", color: "#6366F1" }}>
              <Icon name="edit" size={16} />
            </button>
          </div>
        ))}
      </div>

      {/* Info App */}
      <p style={{ color: "#6366F1", fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
        Info Aplikasi
      </p>
      <Card style={{ marginBottom: 16 }}>
        <p style={{ margin: "0 0 8px", color: "#ddd", fontWeight: 700, fontSize: 15, fontFamily: "'Sora',sans-serif" }}>
          Kas App
        </p>
        <p style={{ margin: 0, color: "#6b6b88", fontSize: 13 }}>
          Manajemen kas harian dengan laporan cash, QRIS, dan pengeluaran per kategori.
        </p>
        <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Badge color="#6366F1">v1.0</Badge>
          <Badge color="#10B981">{dates.length} Hari Tersimpan</Badge>
        </div>
      </Card>

      {/* Logout */}
      {!konfirmLogout ? (
        <button onClick={() => setKonfirmLogout(true)}
          style={{ width: "100%", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 14, padding: "14px", cursor: "pointer", color: "#EF4444", fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: 14 }}>
          Keluar
        </button>
      ) : (
        <div>
          <p style={{ color: "#aaa", fontSize: 13, textAlign: "center", marginBottom: 12 }}>
            Yakin ingin keluar?
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <Btn onClick={() => setKonfirmLogout(false)} variant="ghost">Batal</Btn>
            <Btn onClick={onLogout} variant="danger">Keluar</Btn>
          </div>
        </div>
      )}
    </div>
  );
}
