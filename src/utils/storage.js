import { supabase } from './supabase'

export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export async function loadData() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return {};

    const { data: kasHarian } = await supabase
      .from('uang_awal')
      .select('*')
      .eq('user_id', user.id)

    const { data: transaksi } = await supabase
      .from('transaksi')
      .select('*')
      .eq('user_id', user.id)
      .order('urutan', { ascending: true })

    const result = {}
    kasHarian?.forEach(k => {
      result[k.tanggal] = {
        uang_awal: k.uang_awal,
        transaksi: transaksi
          ?.filter(t => t.tanggal === k.tanggal)
          .map(t => ({
            type: t.type,
            jumlah: t.jumlah,
            metode: t.metode,
            kategori: t.kategori,
            catatan: t.catatan,
          })) || []
      }
    })
    return result
  } catch {
    return {}
  }
}

export async function saveHarian(tanggal, uang_awal) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from('uang_awal')
    .upsert({ tanggal, uang_awal, user_id: user.id }, { onConflict: 'tanggal,user_id' })
}

export async function saveTransaksi(tanggal, transaksiList) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  // Hapus yang lama
  await supabase
    .from('transaksi')
    .delete()
    .eq('tanggal', tanggal)
    .eq('user_id', user.id);

  // Insert baru hanya kalau ada isinya
  if (transaksiList.length === 0) return;

  const { error } = await supabase
    .from('transaksi')
    .insert(
      transaksiList.map((t, i) => ({
        tanggal,
        type: t.type,
        jumlah: t.jumlah,
        metode: t.metode || null,
        kategori: t.kategori || null,
        catatan: t.catatan || null,
        urutan: i,
        user_id: user.id,
      }))
    );

  if (error) {
    console.error('Gagal simpan transaksi:', error.message);
    throw error; // Lempar error agar App.jsx bisa tangkap
  }
}

export async function loadProfile() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    return { ...data, email: user.email };
  } catch {
    return null;
  }
}

export async function updateProfile(username) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from('profiles')
    .update({ username })
    .eq('id', user.id);
}

export async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) throw error;
}
export async function getEmailByUsername(username) {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', username)
      .single();
    
    if (error || !data) return null;

    const { data: { user } } = await supabase.auth.admin.getUserById(data.id);
    return user?.email || null;
  } catch {
    return null;
  }
}