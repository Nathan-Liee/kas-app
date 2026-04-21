import { formatAngka } from './format';

export const validateTransactionAmount = (value) => {
  if (value === undefined || value === null || value === '') {
    return 'Jumlah harus diisi';
  }

  const cleaned = formatAngka(value);
  const n = parseInt(cleaned);

  if (isNaN(n) || n <= 0) {
    return 'Jumlah harus lebih dari 0';
  }

  if (n > 1000000000) {
    return 'Jumlah maksimal Rp 1,000,000,000';
  }

  return null;
};

export const sanitizeTransactionData = (data) => {
  return {
    ...data,
    jumlah: data.jumlah ? formatAngka(data.jumlah) : '',
    kategori: data.kategori ? sanitizeInput(data.kategori) : '',
    catatan: data.catatan ? sanitizeInput(data.catatan) : '',
  };
};

const sanitizeInput = (input) => {
  if (!input) return '';
  return input.toString().trim().replace(/[<>"']/g, '');
};

export const validateTransaction = (type, data) => {
  const errors = [];

  const amountError = validateTransactionAmount(data.jumlah);
  if (amountError) errors.push(amountError);

  if (type === 'keluar') {
    if (!data.kategori || data.kategori.trim() === '') {
      errors.push('Kategori wajib diisi');
    }
    if (!data.catatan || data.catatan.trim() === '') {
      errors.push('Catatan wajib diisi');
    }
  }

  return errors;
};

export const validateSetupAmount = (value) => {
  const cleaned = formatAngka(value);
  const n = parseInt(cleaned);

  if (isNaN(n) || n < 0) {
    return 'Masukkan angka yang valid (>= 0)';
  }

  if (n > 1000000000) {
    return 'Uang awal maksimal Rp 1,000,000,000';
  }

  return null;
};

export const validateUsername = (username) => {
  if (!username || username.trim().length < 3) {
    return 'Username minimal 3 karakter';
  }
  if (username.length > 50) {
    return 'Username maksimal 50 karakter';
  }
  return null;
};

// Debounce helper to prevent rapid submissions
export const debounce = (fn, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};