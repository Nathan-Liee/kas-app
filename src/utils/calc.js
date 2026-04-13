export function calcHarian(dayData) {
  if (!dayData) return {};

  const { uang_awal, transaksi } = dayData;

  const totalCash = transaksi
    .filter((t) => t.type === "masuk" && t.metode === "cash")
    .reduce((s, t) => s + t.jumlah, 0);

  const totalQris = transaksi
    .filter((t) => t.type === "masuk" && t.metode === "qris")
    .reduce((s, t) => s + t.jumlah, 0);

  const totalMasuk = totalCash + totalQris;

  const gaji = transaksi
    .filter((t) => t.type === "keluar" && t.kategori?.toLowerCase().includes("gaji"))
    .reduce((s, t) => s + t.jumlah, 0);

  const nonGaji = transaksi
    .filter((t) => t.type === "keluar" && !t.kategori?.toLowerCase().includes("gaji"))
    .reduce((s, t) => s + t.jumlah, 0);

  const totalKeluar = gaji + nonGaji;
  const saldoCash = uang_awal + totalCash - totalKeluar;
  const saldoTotal = saldoCash + totalQris;
  const saldoTanpaGaji = uang_awal + totalCash - nonGaji;

  const kategoriMap = {};
  transaksi
    .filter((t) => t.type === "keluar")
    .forEach((t) => {
      kategoriMap[t.kategori] = (kategoriMap[t.kategori] || 0) + t.jumlah;
    });

  return {
    uang_awal,
    totalCash,
    totalQris,
    totalMasuk,
    gaji,
    nonGaji,
    totalKeluar,
    saldoCash,
    saldoTotal,
    saldoTanpaGaji,
    transaksi,
    kategoriMap,
  };
}
