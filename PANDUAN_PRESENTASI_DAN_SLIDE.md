# PANDUAN LENGKAP BAHAN PRESENTASI (5 SLIDE) & DEMO KASUS 03
**Mata Kuliah:** Web Application Development (WAD)  
**Kasus:** 03 — Portal Helpdesk Wi-Fi Asrama dengan Lapor Gangguan dan FAQ  
**Dosen Pengampu:** Eko Bagus Cahyo Purnomo, S.Kom., M.SEI.  

---

## 🎯 Pembagian Waktu 8 Menit Presentasi & Demo
- **Menit 0–3:** Slide 1–4 (Klien, Struktur Semantik, Alur HTTP, Logika 2 Interaksi).
- **Menit 3–7:** Peragaan program di browser HP/Laptop (Jalankan Kasus Uji Wajib 1–6).
- **Menit 7–8:** Slide 5 (Jejak AI & Pertanggungjawaban Kode).
- **Menit 8–12:** Tanya jawab individual dengan dosen (Maksimal 4 menit).

---

## 📊 Rincian Isi Wajib 5 Slide

### SLIDE 1: Klien dan Kebutuhannya
- **Judul Slide:** Portal Helpdesk Wi-Fi Mandiri — Unit TI Asrama Mahasiswa
- **Nama & NIM Mahasiswa:** (Tuliskan Nama & NIM Anda di pojok atas)
- **Klien:** Unit TI Asrama Mahasiswa Politeknik (Rekaan).
- **Masalah Utama:** Penghuni asrama melapor kendala Wi-Fi lewat grup WhatsApp, mengakibatkan laporan tertimbun obrolan, duplikasi keluhan, dan tidak adanya kejelasan status penanganan oleh teknisi.
- **Solusi / Fitur yang Dibangun:**
  1. *Status Jaringan Real-Time:* Menampilkan kondisi operasional Access Point (AP) di tiap blok hunian (Blok A, B, C, D).
  2. *Panduan Koneksi Mandiri Bergambar:* Edukasi SSID, login SSO captive portal, dan alokasi DHCP IP & DNS.
  3. *Solusi Mandiri (FAQ Filter):* 8 FAQ interaktif dengan pencarian instan (menyebut DNS & IP).
  4. *Formulir Lapor & Pelacakan Status:* Validasi nomor kamar otomatis, live character counter, dan status tiket berbasis `localStorage`.
- **Tautan Tayang & Repositori:**
  - Situs Tayang: `https://kyyyag.github.io/uts-web/` (atau URL Netlify Anda)
  - Repositori GitHub: `https://github.com/kyyyag/uts-web`

---

### SLIDE 2: Struktur dan Tampilan (Responsif Mobile-First)
- **Judul Slide:** Struktur Semantik HTML5 & Desain Tanggap Layar
- **Kerangka Elemen Semantik:**
  - `<header>` & `<nav>`: Judul sistem dan navigasi tautan jangkar (`#status`, `#panduan`, `#faq`, `#lapor`, `#daftar-laporan`).
  - `<main>`: Membungkus 5 elemen `<section>` bertingkat dengan hirarki judul runtut: tepat 1 `<h1>` di brand, diikuti `<h2>` di tiap section, dan `<h3>` pada kartu sub-fitur.
  - `<article>`: Membungkus tiap kartu status blok dan kartu panduan bergambar.
  - `<details>` & `<summary>`: Accordion FAQ standar HTML5 (ringan tanpa framework).
  - `<footer>`: Hak cipta dan atribusi instansi.
- **Tampilan Tanggap Layar (Sertakan 2 Tangkapan Layar Berdampingan):**
  - *Tampilan HP (Mobile):* 1 kolom vertikal, tombol menu mudah dijangkau jempol, formulir responsif 100% lebar layar.
  - *Tampilan Laptop/Desktop:* Grid otomatis beralih menjadi 2 hingga 4 kolom (pada status blok & panduan), serta navigasi header horizontal.

---

### SLIDE 3: Alur Permintaan HTTP & Tab Network
- **Judul Slide:** Alur Permintaan HTTP: Dari Pengetikan URL hingga Peramban Merender
- **Diagram Alur 5 Tahap:**
  1. **DNS Resolution (Sistem Nama Domain):** Peramban memeriksa cache lokal/DNS resolver untuk menerjemahkan domain (misal: `kyyyag.github.io`) menjadi alamat IP server hosting.
  2. **Koneksi Jaringan (TCP Three-Way Handshake & TLS):** Terjadi pertukaran paket SYN &rarr; SYN-ACK &rarr; ACK serta negosiasi enkripsi HTTPS (TLS Handshake) untuk mengamankan data.
  3. **HTTP GET Request:** Peramban mengirim permintaan `GET /uts-web/ HTTP/2` ke server web.
  4. **Respons Server (Status 200 OK):** Server mengirim berkas HTML pertama dengan kode status `200 OK`.
  5. **Rendering Peramban (DOM & CSSOM):** Parser membaca HTML (membangun DOM tree), mengunduh `style.css` (membangun CSSOM), menggabungkan menjadi Render Tree, melakukan Layouting, dan melukis (Paint) elemen ke layar peramban.
- **Tangkapan Layar Tab Network:**
  - Tampilkan screenshot DevTools Tab Network saat status `200 OK` (index.html, style.css, script.js).

---

### SLIDE 4: Logika Dua Interaksi JavaScript & Aksesibilitas
- **Judul Slide:** Logika Dua Interaksi Utama & Kepatuhan Aksesibilitas
- **Interaksi 1 — Formulir Lapor & Siklus Tiket:**
  - *Validasi Regex:* `const POLA_KAMAR = /^[A-D]-\d{3}$/;` memastikan nomor kamar selalu blok A–D dan 3 digit (cth: `B-204`).
  - *Live Character Counter:* Event listener `input` pada textarea memantau panjang karakter real-time (`${panjang} / 20 karakter`).
  - *Penyimpanan & Siklus Status:* Disimpan ke `localStorage`. Saat tombol diklik: `Baru` &rarr; `Diproses` &rarr; `Selesai` &rarr; `Baru`, serta mengupdate angka laporan belum selesai secara dinamis.
- **Interaksi 2 — Pencarian FAQ:**
  - Event `input` pada kolom pencarian membaca `kataKunci.toLowerCase()`.
  - Menggunakan fungsi array `faq.filter()` mencocokkan teks `tanya` atau `jawab`.
  - Jika hasil filter kosong (`items.length === 0`), menyembunyikan list dan memunculkan kotak notifikasi fallback dengan tombol tautan `#lapor`.
- **Skor Aksesibilitas Lighthouse:**
  - Tampilkan tangkapan layar skor Lighthouse Aksesibilitas (&ge; 80 / skor tinggi) dengan kontras warna WCAG AA, navigasi keyboard `:focus-visible`, atribut `alt` pada semua gambar, dan atribut ARIA (`aria-live`, `aria-label`).

---

### SLIDE 5: Jejak AI (PRODUK & PERTANGGUNGJAWABAN MANDIRI)
*Bagian ini wajib dibawakan di menit ke-7. Dosen akan menguji apakah Anda benar-benar memahami kode yang dihasilkan AI.*

#### Format Tabel Wajib Slide 5:
| No | Prompt Asli (Apa Adanya) | Tujuan & Kode yang Dihasilkan | Apa yang Saya Periksa & Ubah Sendiri |
|:--:|:---|:---|:---|
| **1** | *"buat validasi form lapor gangguan wifi kamar asrama regex blok A sampai D strip 3 angka sama hitung karakter deskripsi min 20 js"* | **Tujuan:** Membuat logika validasi input kamar dan counter karakter.<br>**Hasil AI:** Regex `/^[A-D]-\d{3}$/`, event listener input textarea, dan pesan galat. | **Pemeriksaan & Perubahan:**<br>1. AI awalnya menggunakan `alert()` browser yang mengganggu; saya ubah menjadi elemen teks `<span class="error-msg">` di bawah input.<br>2. Saya tambahkan styling CSS `.is-invalid` dan indikator hijau pada counter saat mencapai &ge; 20 karakter. |
| **2** | *"bikin fungsi javascript simpan data lapor ke localstorage status awal Baru lalu kalau status diklik ganti jadi Diproses terus Selesai dan hitung yang belum selesai"* | **Tujuan:** Membuat alur manajemen tiket di browser dan indikator badge pending.<br>**Hasil AI:** Fungsi `simpanLaporanKeStorage()`, `ubahStatusLaporan()`, dan `perbaruiJumlahBelumSelesai()`. | **Pemeriksaan & Perubahan:**<br>1. Logika AI sebelumnya hanya satu arah dan macet di 'Selesai'. Saya tambahkan siklus agar dari 'Selesai' bisa di-reset kembali ke 'Baru'.<br>2. Saya perbaiki selektor `data-id` agar ID numerik `Date.now()` di-parse dengan `Number()` sehingga tidak terjadi bug pencarian array. |
| **3** | *"tuliskan 8 faq wifi asrama pakai details summary ada kata dns minimal 2 dan ip minimal 1 terus fungsi search js filter tidak sensitif huruf besar kecil"* | **Tujuan:** Menyediakan konten FAQ semantik dan interaksi penyaringan pencarian.<br>**Hasil AI:** Objek data `const faq = [...]` dan fungsi filter `faqSearchInput.addEventListener('input', ...)`. | **Pemeriksaan & Perubahan:**<br>1. Saya memvalidasi bahwa minimal 2 FAQ memuat kata "DNS" dan 1 FAQ memuat kata "IP" sesuai ketentuan Kasus 03.<br>2. AI belum menyediakan tampilan saat pencarian tidak cocok; saya tambahkan elemen `#faq-empty` beserta tautan CTA ke formulir lapor (`#lapor`). |

---

## 🎤 Catatan Pembicara & Simulasi Tanya Jawab Dosen (Slide 5)

### 1. Jika Dosen Meminta Anda Menjelaskan Regex Baris demi Baris:
> **Dosen:** *"Coba jelaskan arti dari regex `/^[A-D]-\d{3}$/`!"*  
> **Jawaban Anda:**  
> - `^` : Menandai awal dari string (input harus dimulai dari sini).  
> - `[A-D]` : Hanya menerima satu karakter huruf kapital antara A, B, C, atau D (sesuai 4 blok asrama).  
> - `-` : Wajib ada satu karakter tanda hubung (strip).  
> - `\d{3}` : `\d` berarti digit angka (0–9), dan `{3}` berarti tepat 3 digit angka berturut-turut.  
> - `$` : Menandai akhir dari string (tidak boleh ada karakter tambahan di belakangnya).  
> - *Contoh valid:* `B-204` &rarr; Blok B, tanda hubung, 3 angka 204.  
> - *Contoh gagal:* `E-201` (huruf E di luar jangkauan A-D) dan `b204` (huruf kecil dan tanpa tanda hubung).

### 2. Jika Dosen Meminta Melakukan Perubahan Langsung di Depan Kelas:
> **Dosen:** *"Bagaimana jika asrama menambah Blok E dan nomor kamar menjadi 4 digit (misal: E-1001)?"*  
> **Langkah Anda:**  
> Buka `script.js` baris ke-49, ubah regex menjadi:  
> `const POLA_KAMAR = /^[A-E]-\d{4}$/;`  
> Simpan, lalu demonstrasikan di browser dengan input `E-1001` &rarr; Valid!

> **Dosen:** *"Bagaimana jika minimal deskripsi diubah dari 20 menjadi 30 karakter?"*  
> **Langkah Anda:**  
> Di `index.html` ubah teks hint menjadi 30 karakter, dan di `script.js`:  
> Ubah kondisi: `if (nilaiDeskripsi.length < 30)` dan di event listener textarea ganti batas menjadi 30.

### 3. Jika Dosen Menanyakan Alur LocalStorage:
> **Dosen:** *"Mengapa saat halaman di-refresh, data laporannya tidak hilang?"*  
> **Jawaban Anda:**  
> *"Karena data disimpan dalam `window.localStorage` peramban menggunakan format string JSON melalui `localStorage.setItem()`. Ketika halaman dimuat ulang, event `DOMContentLoaded` memanggil fungsi `ambilDaftarLaporan()` yang menguraikan kembali string tersebut dengan `JSON.parse()`, lalu merender baris-baris tabel secara dinamis."*

---

## 📋 Panduan Peragaan Kasus Uji Wajib (Menit 3–7)

Jalankan urutan ini dengan tenang di browser:

1. **Uji 1 — Kamar:**
   - Ketik `E-201` &rarr; Klik Submit &rarr; Tunjukkan error *"Format kamar salah! Wajib blok A-D..."*.
   - Ganti jadi `b204` &rarr; Klik Submit &rarr; Masih muncul error.
   - Ganti jadi `B-204` &rarr; Error hilang, input menjadi valid.
2. **Uji 2 — Deskripsi:**
   - Ketik `Koneksi mati` (12 karakter) &rarr; Tunjukkan counter bertuliskan `12 / 20 karakter` berwarna abu-abu & pesan error minimal 20 karakter.
   - Tambahkan kalimat: `di kamar B-204 sejak pagi hari` (total > 20 karakter) &rarr; Counter berubah menjadi hijau valid.
3. **Uji 3 — Kirim & Ubah Status 2x:**
   - Pilih jenis gangguan: `Putus-putus` &rarr; Klik tombol *Kirim Laporan Gangguan*.
   - Halaman otomatis scroll ke tabel, laporan muncul dengan status `● Baru`.
   - Klik lencana status 1x &rarr; Berubah menjadi `● Diproses` (warna kuning).
   - Klik lencana status 2x &rarr; Berubah menjadi `● Selesai` (warna hijau).
4. **Uji 4 — Refresh Halaman:**
   - Tekan tombol Refresh / F5 di peramban.
   - Tunjukkan bahwa data laporan tadi masih tetap ada di tabel dan badge `Laporan Belum Selesai` berkurang sesuai jumlah tiket yang selesai.
5. **Uji 5 — Pencarian FAQ:**
   - Pada kolom cari FAQ, ketik `dns` &rarr; Daftar FAQ otomatis tersaring hanya menampilkan pertanyaan seputar DNS.
   - Hapus teks, lalu ketik `zzz` &rarr; FAQ menghilang dan muncul pesan *"Pertanyaan atau kata kunci tidak ditemukan"* lengkap dengan tombol link ke formulir lapor.
6. **Uji 6 — Tab Network:**
   - Tekan `F12` buka Developer Tools &rarr; Tab Network &rarr; Refresh.
   - Tunjukkan status `200 OK` pada `index.html`, `style.css`, dan `script.js`.
   - Ubah sementara nama `<link rel="stylesheet" href="style-salah.css">` di inspect/kode &rarr; Refresh &rarr; Tunjukkan status error `404 Not Found`. Kembalikan ke normal.

