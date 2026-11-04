# Portal Helpdesk Wi-Fi Asrama Mahasiswa (Kasus 03 - WAD)

> **Mata Kuliah:** Web Application Development (WAD)  
> **Program Studi:** Teknik Rekayasa Jaringan, Semester 3  
> **Politeknik Driyorejo — Ujian Tengah Semester Ganjil 2026/2027**  
> **Dosen Pengampu:** Eko Bagus Cahyo Purnomo, S.Kom., M.SEI.  

---

## 📌 Ringkasan Proyek

Portal Helpdesk Wi-Fi Asrama dibangun untuk memecahkan permasalahan pelaporan gangguan jaringan yang selama ini dilakukan melalui grup WhatsApp sehingga sering tenggelam dan status penanganannya tidak jelas. 

Aplikasi web ini menyediakan:
1. **Status Jaringan Real-Time:** Menampilkan kondisi Access Point (AP) di Blok A, B, C, dan D beserta indikator visual.
2. **Panduan Koneksi Bergambar:** 3 langkah mudah koneksi ke SSID kampus, autentikasi captive portal SSO, dan konfigurasi IP & DNS otomatis (DHCP). Seluruh gambar memiliki atribut `alt` yang bermakna.
3. **Pencarian Solusi FAQ (Interaksi 2):** Minimal 8 pertanyaan (sedikitnya 2 menyebut DNS dan 1 menyebut IP). Dilengkapi filter real-time tidak peka huruf besar-kecil (`input` event) dan pesan ramah bila kata kunci tidak ditemukan beserta tautan lapor gangguan.
4. **Formulir Lapor Gangguan & Manajemen Tiket (Interaksi 1):** Validasi nomor kamar sesuai format pola `^[A-D]-\d{3}$`, dropdown jenis gangguan, dan deskripsi minimal 20 karakter dengan live character counter. Laporan tersimpan di `localStorage` dengan siklus status interaktif (`Baru` &rarr; `Diproses` &rarr; `Selesai`) serta indikator jumlah tiket belum selesai.

---

## 🛠️ Arsitektur & Teknologi

- **HTML5 Semantik:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, dengan hirarki judul yang runtut (`h1`, `h2`, `h3`).
- **CSS3 Tanggap Layar (Mobile-First):** Memanfaatkan CSS Grid dan Flexbox. 1 kolom pada layar HP, dan otomatis beralih menjadi 2 hingga 4 kolom pada tablet dan desktop/laptop.
- **Aksesibilitas (A11y):** Kontras warna sesuai standar WCAG AA/AAA, navigasi keyboard (`:focus-visible`), atribut ARIA (`aria-live`, `aria-label`, `role="status"`), dan `alt` text deskriptif untuk skor Lighthouse &ge; 80.
- **Vanilla JavaScript:** Kode terstruktur rapi, tanpa dependensi eksternal, dengan dokumentasi komentar bahasa Indonesia yang mudah dipahami dan dijelaskan saat tanya jawab.

---

## 🧪 Kasus Uji Wajib (Demonstrasi 8 Menit)

| No | Skenario Uji | Tindakan Penguji | Hasil yang Diharapkan |
|:--:|:---|:---|:---|
| **1** | Validasi Kamar | Masukkan `E-201`, lalu `b204`, lalu `B-204` | `E-201` dan `b204` ditolak dengan pesan error format salah; `B-204` diterima. |
| **2** | Validasi Deskripsi | Masukkan deskripsi 12 karakter | Ditolak dengan pesan minimal 20 karakter; counter menunjukkan `12 / 20 karakter`. |
| **3** | Siklus Status Tiket | Kirim laporan valid, lalu klik lencana status 2 kali | Status berubah dari `Baru` &rarr; `Diproses` &rarr; `Selesai`. |
| **4** | Persistensi Data | Lakukan reload/refresh halaman peramban | Data laporan tetap tersimpan di tabel dan counter "Belum Selesai" tetap sinkron. |
| **5** | Filter Pencarian FAQ | Ketik `dns`, kemudian ketik `zzz` | Kata `dns` menyaring FAQ terkait DNS; kata `zzz` menampilkan pesan "tidak ditemukan" + link ke formulir lapor. |
| **6** | Analisis Tab Network | Buka Developer Tools > Tab Network | Tunjukkan HTTP GET status `200 OK`; ubah salah satu nama CSS menjadi salah untuk menunjukkan error `404 Not Found`. |

---

## 📑 Struktur 5 Slide Presentasi

1. **Slide 1 — Klien & Kebutuhan:** Identitas klien (Unit TI Asrama), masalah grup WA tidak efektif, solusi fitur portal, serta tautan situs tayang & repositori GitHub.
2. **Slide 2 — Struktur & Tampilan:** Kerangka elemen semantik HTML5 dan perbandingan tangkapan layar tampilan HP (1 kolom) vs Laptop (multi-kolom).
3. **Slide 3 — Alur Permintaan HTTP:** Siklus peramban saat membuka web: Resolusi DNS &rarr; TCP/TLS Handshake &rarr; HTTP GET Request &rarr; Respon 200 OK &rarr; DOM/CSSOM Rendering, disertai tangkapan layar tab Network.
4. **Slide 4 — Logika Interaksi JavaScript:** Potongan logika kode Form Validation (Regex & LocalStorage) dan Real-time Filter FAQ, serta skor Aksesibilitas Lighthouse.
5. **Slide 5 — Jejak AI:** Dokumentasi 3 prompt penting apa adanya, bagian kode yang dihasilkan, serta pengujian dan penyesuaian mandiri yang dilakukan.

