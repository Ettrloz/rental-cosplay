export function normalisasiTelepon(nomor: string): string {
  const digit = nomor.replace(/\D/g, '');

  if (!digit) return '';
  if (digit.startsWith('62')) return digit;
  if (digit.startsWith('0')) return `62${digit.slice(1)}`;
  if (digit.startsWith('8')) return `62${digit}`;

  return digit;
}

export function waLink(nomor: string | null | undefined, pesan: string): string | null {
  if (!nomor) return null;

  const tujuan = normalisasiTelepon(nomor);

  if (!tujuan) return null;

  return `https://wa.me/${tujuan}?text=${encodeURIComponent(pesan)}`;
}

export function igLink(handle: string | null | undefined): string | null {
  if (!handle) return null;

  const bersih = handle
    .replace(/^@/, '')
    .replace(/^https?:\/\/(www\.)?instagram\.com\//, '')
    .replace(/\/$/, '')
    .trim();

  if (!bersih) return null;

  return `https://instagram.com/${bersih}`;
}
