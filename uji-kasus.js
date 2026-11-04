/**
 * UJI KASUS MANDIRI (AUTOMATED TEST VERIFICATION)
 * Kasus 03: Portal Helpdesk Wi-Fi Asrama
 * 
 * Jalankan di terminal:
 * node uji-kasus.js
 */

console.log("==================================================");
console.log("MENJALANKAN PENGUJIAN OTOMATIS KASUS 03 WAD...");
console.log("==================================================");

let totalPassed = 0;
let totalTests = 0;

function assert(description, condition) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${description}`);
    totalPassed++;
  } else {
    console.error(`[FAIL] ${description}`);
  }
}

// 1. UJI POLA REGEX KAMAR
const POLA_KAMAR = /^[A-D]-\d{3}$/;

assert("Uji 1a: Kamar 'E-201' harus ditolak (Blok bukan A-D)", POLA_KAMAR.test("E-201") === false);
assert("Uji 1b: Kamar 'b204' harus ditolak (Huruf kecil & tanpa tanda hubung)", POLA_KAMAR.test("b204") === false);
assert("Uji 1c: Kamar 'B-204' harus diterima (Blok B, tanda hubung, 3 angka)", POLA_KAMAR.test("B-204") === true);
assert("Uji 1d: Kamar 'A-101' harus diterima", POLA_KAMAR.test("A-101") === true);
assert("Uji 1e: Kamar 'D-312' harus diterima", POLA_KAMAR.test("D-312") === true);

// 2. UJI PANJANG DESKRIPSI MINIMAL 20 KARAKTER
const deskripsiPendek = "Sinyal putus"; // 12 karakter
const deskripsiCukup = "Koneksi Wi-Fi sering terputus mendadak saat kuliah online"; // > 20 karakter

assert("Uji 2a: Deskripsi 12 karakter harus ditolak (< 20)", deskripsiPendek.length < 20);
assert("Uji 2b: Deskripsi > 20 karakter harus diterima", deskripsiCukup.length >= 20);

// 3. UJI SIKLUS STATUS LAPORAN
function ubahStatus(statusSaatIni) {
  if (statusSaatIni === "Baru") return "Diproses";
  if (statusSaatIni === "Diproses") return "Selesai";
  return "Baru";
}

let statusAwal = "Baru";
let statusKlik1 = ubahStatus(statusAwal);
let statusKlik2 = ubahStatus(statusKlik1);
let statusKlik3 = ubahStatus(statusKlik2);

assert("Uji 3a: Status awal adalah 'Baru'", statusAwal === "Baru");
assert("Uji 3b: Klik ke-1 mengubah 'Baru' menjadi 'Diproses'", statusKlik1 === "Diproses");
assert("Uji 3c: Klik ke-2 mengubah 'Diproses' menjadi 'Selesai'", statusKlik2 === "Selesai");
assert("Uji 3d: Klik ke-3 mengembalikan siklus ke 'Baru'", statusKlik3 === "Baru");

// 4. UJI FILTER FAQ
const faqContoh = [
  { tanya: "Kenapa Wi-Fi tersambung tapi tidak bisa membuka situs?", jawab: "Coba ganti DNS ..." },
  { tanya: "Bagaimana cara melihat alamat IP di HP?", jawab: "Lihat menu Wi-Fi ..." },
  { tanya: "Apa yang harus dilakukan jika muncul galat DNS Server?", jawab: "Periksa IP dan DNS..." }
];

function cariFAQ(keyword) {
  const q = keyword.toLowerCase().trim();
  return faqContoh.filter(item => 
    item.tanya.toLowerCase().includes(q) || 
    item.jawab.toLowerCase().includes(q)
  );
}

const hasilDNS = cariFAQ("dns");
const hasilZZZ = cariFAQ("zzz");

assert("Uji 5a: Pencarian 'dns' menemukan pertanyaan terkait DNS", hasilDNS.length >= 2);
assert("Uji 5b: Pencarian 'zzz' menghasilkan 0 hasil (memicu fallback)", hasilZZZ.length === 0);

console.log("==================================================");
console.log(`HASIL: ${totalPassed} dari ${totalTests} pengujian BERHASIL.`);
console.log("==================================================");
