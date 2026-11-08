# BAHAN PPT PRESENTASI (MAKSIMAL 5 SLIDE) & NASKAH BICARA ALAMI (8 MENIT)
**Ujian Tengah Semester Ganjil 2026/2027 — Web Application Development (WAD)**  
**Kasus 03:** Portal Helpdesk Wi-Fi Asrama dengan Lapor Gangguan dan FAQ  
**Dosen Pengampu:** Eko Bagus Cahyo Purnomo, S.Kom., M.SEI.  

---

> [!IMPORTANT]
> **Aturan Khusus Format Slide (Ketentuan RPS & Soal):**
> 1. **Maksimal 5 slide** (tidak boleh ada slide pembuka/cover tersendiri atau slide penutup "Terima Kasih").
> 2. Nama dan NIM langsung dicantumkan di **Slide 1**.
> 3. Jangan membuat slide berisi "tembok teks" (*wall of text*). Gunakan poin ringkas, kartu visual, dan tangkapan layar.
> 4. Anda berbicara dengan santai, percaya diri, dan runtut.

---

```
TIMELINE 8 MENIT PRESENTASI & DEMO:
┌─────────────────┬──────────────────────────────────┬─────────────────┐
│ Menit 00:00-03:00│ Menit 03:00-07:00                │ Menit 07:00-08:00│
│ Slide 1 s.d. 4  │ Demo Langsung 6 Kasus Uji Wajib  │ Slide 5: Jejak AI│
│ (Konsep & Alur) │ (Buka Web di Laptop & DevTools)   │ (Jujur & Kritis) │
└─────────────────┴──────────────────────────────────┴─────────────────┘
                              │
                              ▼ Menit 08:00 - 12:00: Tanya Jawab Dosen (± 4 Menit)
```

---

# BAGIAN 1: RANCANGAN KONTEN VISUAL 5 SLIDE (SIAP SALIN KE CANVA / GOOGLE SLIDES)

---

## 🖥️ SLIDE 1: Klien & Kebutuhannya
*Fokus: Siapa klien, masalah nyata di lapangan, fitur solusi yang dibangun, serta link tayang & repo.*

### Tata Letak Visual Slide:
- **Header Atas (Kiri):** Logo Politeknik & Judul: `Portal Helpdesk Wi-Fi Asrama Mahasiswa`
- **Header Atas (Kanan):** Identitas Diri: `[Nama Anda] • NIM: [NIM Anda] • TRJ / Semester 3`
- **Kolom Kiri (Kartu Masalah):**
  - **Klien:** Unit TI Asrama Mahasiswa Politeknik
  - **Akar Masalah:**
    - Laporan gangguan selama ini menumpuk di grup WhatsApp penghuni.
    - Pesan sering tenggelam oleh obrolan lain.
    - Mahasiswa tidak tahu apakah laporannya sudah diproses atau belum.
    - Teknisi kesulitan mendata kamar yang mengalami kendala berulang.
- **Kolom Kanan (Kartu Solusi & Fitur):**
  - **4 Fitur Utama Portal:**
    1. *Status Jaringan Real-Time:* Informasi kondisi AP Blok A, B, C, dan D.
    2. *Panduan Koneksi Bergambar:* Langkah koneksi SSID, login SSO captive portal, dan konfigurasi DHCP.
    3. *Pusat Bantuan FAQ Interaktif:* 8 FAQ dengan fitur pencarian instan (menyebut DNS & IP).
    4. *Formulir Lapor & Pelacak Tiket:* Validasi otomatis nomor kamar, live counter deskripsi, dan siklus status tiket via `localStorage`.
- **Bagian Bawah (Kotak Tautan Akses):**
  - 🌐 **Situs Tayang:** `https://kyyyag.github.io/uts-web/`
  - 🐙 **Repositori GitHub:** `https://github.com/kyyyag/uts-web`

---

## 📱 SLIDE 2: Struktur Semantik & Tampilan Tanggap Layar
*Fokus: Hirarki HTML5 semantik dan pembuktian mobile-first (HP vs Laptop).*

### Tata Letak Visual Slide:
- **Judul Slide:** Kerangka Semantik HTML5 & Desain Tanggap Layar
- **Kolom Kiri: Kerangka Semantik & Aksesibilitas**
  - Menggunakan elemen struktural standar:
    - `<header>` & `<nav>`: Navigasi jangkar halaman.
    - `<main>`: Membungkus 5 `<section>` tematik.
    - Hirarki judul tertib: Tepat satu `<h1>`, diikuti `<h2>` di setiap section, dan `<h3>` pada sub-kartu.
    - `<article>`: Membungkus kartu status blok dan kartu panduan bergambar.
    - `<details>` & `<summary>`: Accordion FAQ natif HTML5 (ringan, ramah *screen reader*).
    - `<footer>`: Informasi instansi & hak cipta.
  - Semua gambar berformat SVG dengan atribut `alt` deskriptif.
- **Kolom Kanan: Perbandingan Tangkapan Layar (Berdampingan)**
  - *Tangkapan Layar HP (Kiri):* Tata letak 1 kolom, tombol jempol-ramah, navigasi kompak.
  - *Tangkapan Layar Laptop (Kanan):* CSS Grid otomatis melebar menjadi 2 hingga 4 kolom kartu blok dan panduan.

---

## 🌐 SLIDE 3: Alur Permintaan HTTP & Analisis Tab Network
*Fokus: Apa yang terjadi dari ketik URL di browser hingga web terlukis di layar + bukti DevTools.*

### Tata Letak Visual Slide:
- **Judul Slide:** Alur Permintaan HTTP: Dari Pengetikan URL hingga Peramban Merender
- **Diagram 5 Langkah Alur (Horizontal Flowchart):**
  1. **DNS Lookup:** Browser mengubah domain `kyyyag.github.io` menjadi IP server (port 443).
  2. **TCP & TLS Handshake:** Pertukaran paket `SYN &rarr; SYN-ACK &rarr; ACK` + enkripsi SSL/TLS.
  3. **HTTP GET Request:** Browser meminta dokumen `GET /uts-web/ HTTP/2`.
  4. **Respons Server (200 OK):** Server GitHub Pages mengirim berkas `index.html`.
  5. **DOM/CSSOM & Paint:** Browser membangun DOM tree, memuat `style.css` (CSSOM), menyatukan Render Tree, lalu melakukan Layout & Paint ke layar pengguna.
- **Kotak Bawah: Bukti Tangkapan Layar Tab Network (DevTools F12)**
  - Screenshot 1: Status `200 OK` untuk `index.html`, `style.css`, `script.js`, dan SVG assets.
  - Screenshot 2: Pembuktian respon `404 Not Found` saat nama berkas CSS sengaja dibuat salah.

---

## ⚡ SLIDE 4: Logika Dua Interaksi JavaScript & Aksesibilitas
*Fokus: Diagram potongan kode Interaksi 1 & 2 + bukti skor Lighthouse.*

### Tata Letak Visual Slide:
- **Judul Slide:** Logika Dua Interaksi JavaScript & Audit Aksesibilitas
- **Kolom Kiri: Interaksi 1 (Formulir Lapor & Siklus Tiket)**
  - **Pola Kamar:** `const POLA_KAMAR = /^[A-D]-\d{3}$/;` (Blok A-D, strip, 3 digit).
  - **Penghitung Karakter Live:** Event `input` pada textarea memvalidasi minimal 20 karakter secara real-time.
  - **Siklus Status Tiket:** `Baru` &rarr; `Diproses` &rarr; `Selesai` &rarr; `Baru` (tersimpan di `localStorage`).
  - **Indikator Pending:** Menghitung otomatis laporan yang belum selesai (`status !== 'Selesai'`).
- **Kolom Tengah: Interaksi 2 (Pencarian FAQ Real-Time)**
  - Event `input` pada kotak pencarian (`toLowerCase()`).
  - Menyaring 8 pertanyaan FAQ (memuat topik DNS & IP).
  - Jika kata kunci tidak ditemukan (misal: "zzz"), otomatis memunculkan notifikasi ramah dan link cepat ke `#lapor`.
- **Kolom Kanan: Skor Lighthouse Aksesibilitas**
  - Skor Aksesibilitas: **100 / 100** (atau hijau &gt; 90).
  - Poin kunci: Kontras warna WCAG AAA, atribut ARIA (`aria-live`, `aria-label`), navigasi keyboard (`:focus-visible`).

---

## 🤖 SLIDE 5: Jejak AI (Dokumentasi Prompt & Pertanggungjawaban)
*Fokus: Transparansi penggunaan AI, prompt apa adanya, apa yang diperbaiki sendiri, dan bukti penguasaan kode.*

### Tata Letak Visual Slide (Tabel 3 Baris):
- **Judul Slide:** Jejak Penggunaan AI & Pertanggungjawaban Mandiri

| Prompt Asli (Disalin Apa Adanya) | Tujuan & Kode Dihasilkan | Apa yang Diperiksa & Diubah Sendiri |
|:---|:---|:---|
| *"buat validasi form lapor gangguan wifi kamar asrama regex blok A sampai D strip 3 angka sama hitung karakter deskripsi min 20 js"* | **Tujuan:** Logika validasi kamar dan counter karakter.<br>**Hasil:** Regex `/^[A-D]-\d{3}$/` & listener textarea. | 1. AI awalnya memakai `alert()` peramban yang kaku; saya ganti menjadi elemen pesan teks di bawah input.<br>2. Saya tambahkan styling `.is-invalid` dan warna hijau counter jika sudah &ge; 20 karakter. |
| *"bikin fungsi javascript simpan data lapor ke localstorage status awal Baru lalu kalau status diklik ganti jadi Diproses terus Selesai dan hitung yang belum selesai"* | **Tujuan:** Manajemen antrean tiket dan counter pending.<br>**Hasil:** Fungsi simpan `localStorage` & update status. | 1. AI membuat status terhenti di 'Selesai'; saya ubah agar bisa berputar kembali ke 'Baru'.<br>2. Saya tambahkan konversi `Number(data-id)` agar pencarian array ID timestamp tidak *undefined*. |
| *"tuliskan 8 faq wifi asrama pakai details summary ada kata dns minimal 2 dan ip minimal 1 terus fungsi search js filter tidak sensitif huruf besar kecil"* | **Tujuan:** Konten FAQ semantik & fitur search instant.<br>**Hasil:** Array data 8 FAQ & fungsi `faq.filter()`. | 1. Saya pastikan ketentuan Kasus 03 terpenuhi: 2 FAQ membahas DNS dan 1 membahas IP.<br>2. AI lupa membuat tampilan saat kata kunci tidak cocok; saya tambahkan elemen `#faq-empty` dengan tombol link ke formulir. |

---

# BAGIAN 2: NASKAH BICARA NATURAL (PERSIS 8 MENIT)

*Gunakan gaya bahasa santai, sopan, percaya diri, dan jangan membaca slide kata demi kata. Anggap Anda sedang bercerita kepada Pak Eko Bagus.*

---

### ⏱️ MENIT 00:00 – 00:45 | SLIDE 1 (Klien & Latar Belakang)
> *"Selamat pagi/siang Pak Eko dan rekan-rekan sekalian.*  
> *Perkenalkan, nama saya **[Nama Anda]**, NIM **[NIM Anda]**, dari kelas TRJ semester 3. Pada kesempatan kali ini, saya akan mempresentasikan hasil proyek Web Application Development untuk Kasus 03, yaitu **Portal Helpdesk Wi-Fi Asrama Mahasiswa**.*  
>  
> *Masalah nyata yang dihadapi Unit TI asrama saat ini adalah mahasiswa selalu melapor gangguan jaringan lewat grup WhatsApp. Akibatnya, pesan komplain tertumpuk obrolan harian, teknisi bingung mendata mana kamar yang sedang bermasalah, dan mahasiswa tidak tahu apakah laporannya sudah ditangani atau belum.*  
>  
> *Oleh karena itu, saya membangun portal mandiri ini yang mencakup status jaringan tiap blok secara real-time, panduan koneksi bergambar, FAQ interaktif, serta formulir lapor gangguan dengan pelacakan status penanganan. Situs ini sudah online di GitHub Pages dan repositorinya bersifat publik."*

---

### ⏱️ MENIT 00:45 – 01:30 | SLIDE 2 (Struktur Semantik & Tanggap Layar)
> *"Masuk ke Slide 2 mengenai struktur dan tampilan.*  
> *Website ini dibangun menggunakan prinsip **HTML5 Semantik murni**. Kerangka halaman diawali dari `<header>` dan navigasi utama, kemudian `<main>` yang menaungi lima `<section>` tematik, hingga `<footer>`.*  
>  
> *Hirarki heading-nya juga tertata runtut: hanya ada satu `<h1>` sebagai identitas sistem di bagian atas, kemudian setiap bagian menggunakan `<h2>`, dan kartu-kartu di dalamnya menggunakan `<h3>`. Untuk FAQ, saya memanfaatkan elemen bawaan `<details>` dan `<summary>`, sehingga ringan dan tidak memerlukan JavaScript berlebih hanya untuk membuat efek accordion.*  
>  
> *Secara tampilan, saya mengadopsi pendekatan **mobile-first**. Pada layar smartphone, konten tersusun rapi dalam 1 kolom agar ramah dioperasikan dengan jempol. Namun saat dibuka di laptop, layout otomatis menyesuaikan menggunakan CSS Grid menjadi 2 hingga 4 kolom berdampingan."*

---

### ⏱️ MENIT 01:30 – 02:15 | SLIDE 3 (Alur Permintaan HTTP & Tab Network)
> *"Di Slide 3, kita melihat alur komunikasi HTTP saat alamat web ini dibuka oleh pengguna.*  
> *Pertama, peramban melakukan **DNS Lookup** untuk menerjemahkan domain GitHub Pages menjadi alamat IP server. Setelah IP ditemukan, terjadi **TCP Three-Way Handshake** dan negosiasi **TLS** untuk mengamankan koneksi HTTPS.*  
>  
> *Selanjutnya, peramban mengirimkan **HTTP GET Request**. Server merespons dengan kode **200 OK** bersama dokumen HTML utama. Peramban kemudian mulai mem-parsing HTML untuk membentuk DOM Tree, mengunduh file `style.css` untuk membangun CSSOM, menyatukannya ke dalam Render Tree, lalu melakukan tahapan Layout dan Paint ke layar.*  
>  
> *Pada tangkapan layar tab Network di slide, terlihat seluruh aset termuat dengan status 200 OK. Saya juga menguji ketahanan peramban dengan sengaja mengubah path CSS ke nama yang salah, dan peramban dengan tepat menampilkan status 404 Not Found."*

---

### ⏱️ MENIT 02:15 – 03:00 | SLIDE 4 (Logika Interaksi & Aksesibilitas)
> *"Slide 4 membahas dua interaksi utama JavaScript dan hasil audit aksesibilitas.*  
>  
> *Untuk **Interaksi 1**, terdapat validasi input nomor kamar menggunakan Regular Expression: `^[A-D]-\d{3}$`. Pola ini memastikan hanya kamar di blok A sampai D dengan tiga digit angka yang bisa lolos. Pada kolom deskripsi, saya memasang event listener `input` untuk menghitung jumlah karakter secara real-time dengan batas minimal 20 karakter.*  
>  
> *Data laporan yang valid langsung disimpan ke dalam `localStorage` peramban. Tombol status tiket bersifat interaktif: ketika diklik oleh petugas TI, statusnya akan berputar dari Baru, Diproses, hingga Selesai, dan counter laporan pending di atasnya akan ter-update secara otomatis.*  
>  
> *Untuk **Interaksi 2**, fitur pencarian FAQ bekerja secara live menyaring array pertanyaan dan jawaban tanpa memedulikan huruf besar atau kecil. Jika tidak ada pertanyaan yang cocok, sistem akan menampilkan pesan informatif beserta tautan langsung ke formulir lapor.*  
>  
> *Dari sisi aksesibilitas, portal ini meraih skor **Lighthouse 100** karena memenuhi rasio kontras WCAG AAA, mendukung navigasi keyboard penuh, dan seluruh gambar memiliki tag alt deskriptif."*

---

### ⏱️ MENIT 03:00 – 07:00 | PERAGAAN LANGSUNG (DEMO 6 KASUS UJI DI BROWSER)
*(Buka tab browser yang sudah memuat portal Anda. Bicara sambil mempraktikkan skenario di depan Pak Eko).*

> *"Sekarang, mari kita buktikan secara langsung dengan menjalankan **6 Kasus Uji Wajib** pada situs yang sudah tayang ini.*
>  
> **1. Uji Kasus 1 (Validasi Nomor Kamar):**  
> *Pertama, saya coba masukkan nomor kamar `E-201` lalu saya klik Kirim. Sistem menolak karena blok hunian hanya A sampai D. Sekarang saya coba `b204` dengan huruf kecil tanpa strip, sistem tetap menolak. Terakhir, saya ketik `B-204` sesuai format, dan pesan error langsung hilang.*  
>  
> **2. Uji Kasus 2 (Validasi Deskripsi 12 Karakter):**  
> *Pada deskripsi, saya ketik `Koneksi mati`. Counter di bawah menunjukkan `12 / 20 karakter` berwarna abu-abu. Saat saya klik Kirim, form menolak karena minimal harus 20 karakter. Sekarang saya lengkapi kalimatnya: `Koneksi mati sejak pagi hari saat kuliah daring`, counter otomatis berubah menjadi hijau karena sudah memenuhi syarat.*  
>  
> **3. Uji Kasus 3 (Kirim Laporan & Ubah Status 2 Kali):**  
> *Saya pilih jenis gangguan `Putus-putus` lalu klik Kirim. Halaman otomatis scroll ke tabel, dan laporan kamar B-204 masuk dengan status default `● Baru` berwarna biru. Sekarang saya klik tombol statusnya satu kali: status berubah menjadi `● Diproses` (kuning). Saya klik sekali lagi: status berubah menjadi `● Selesai` (hijau).*  
>  
> **4. Uji Kasus 4 (Refresh Halaman & Persistensi LocalStorage):**  
> *Sekarang saya tekan F5 untuk me-refresh browser. Seperti yang kita lihat, data laporan tadi tidak hilang dan angka indikator Laporan Belum Selesai tetap sinkron. Ini membuktikan data tersimpan sempurna di LocalStorage pengguna.*  
>  
> **5. Uji Kasus 5 (Pencarian FAQ 'dns' lalu 'zzz'):**  
> *Kita beralih ke bagian FAQ. Saya ketik kata `dns` di kolom pencarian. Daftar FAQ seketika tersaring hanya menampilkan pertanyaan seputar DNS dan IP. Sekarang saya ganti kata kuncinya menjadi `zzz`. Daftar FAQ disembunyikan dan muncul pesan ramah: 'Pertanyaan tidak ditemukan' lengkap dengan tombol yang mengarahkan mahasiswa untuk mengisi formulir lapor.*  
>  
> **6. Uji Kasus 6 (Tab Network: Status 200 & Uji 404):**  
> *Terakhir, saya buka Developer Tools di Tab Network lalu refresh halaman. Semua request dokumen HTML, CSS, dan JS berstatus 200 OK. Jika salah satu pemanggilan file CSS diganti ke nama yang tidak ada, maka browser akan menampilkan response header 404 Not Found."*

---

### ⏱️ MENIT 07:00 – 08:00 | SLIDE 5 (Jejak AI & Penutup)
*(Pindah kembali ke Slide 5 di proyektor/layar).*

> *"Menutup presentasi di menit ke-7 ini, mari kita buka Slide 5 mengenai **Jejak Penggunaan AI**.*  
>  
> *Dalam membangun portal ini, saya memanfaatkan AI sebagai rekan diskusi teknis untuk mempercepat pembuatan kerangka logika awal. Di slide ini, saya melampirkan 3 prompt terpenting apa adanya yang saya tulis sendiri.*  
>  
> *Namun yang terpenting adalah proses verifikasi dan perbaikan mandiri yang saya lakukan:*  
> *1. Pada validasi form, kode awal AI menggunakan fungsi bawaan `alert()`. Saya menggantinya secara manual dengan manipulasi DOM berupa pesan teks merah di bawah input serta outline `.is-invalid` agar ramah pengguna.*  
> *2. Pada pengelolaan tiket, logika awal AI hanya bergerak satu arah dan macet saat status sudah 'Selesai'. Saya merombak logikanya menjadi siklus berulang dan menambahkan konversi `Number()` pada atribut ID agar sinkronisasi array di LocalStorage tidak mengalami bug.*  
> *3. Pada FAQ, saya memvalidasi manual agar syarat kasus terpenuhi—yakni minimal dua pertanyaan membahas DNS dan satu membahas IP—serta menambahkan komponen fallback jika pencarian tidak ditemukan.*  
>  
> *Seluruh baris kode dan riwayat commit di GitHub mencerminkan proses pengerjaan bertahap ini. Demikian presentasi dari saya, waktu selanjutnya saya serahkan kepada Bapak Eko Bagus untuk sesi tanya jawab. Terima kasih."*

---

# BAGIAN 3: CONTEKAN KILAT MENGHADAPI TANYA JAWAB DOSEN (MENIT 08:00 – 12:00)

Dosen mungkin akan meminta Anda membacakan baris kode atau melakukan modifikasi langsung di laptop **tanpa membuka AI**. Berikut contekannya:

### 🎯 Skenario 1: Dosen meminta modifikasi kode langsung di kelas
- **Soal Dosen:** *"Coba sekarang tambahkan asrama Blok E dengan nomor kamar 4 digit (misal E-1001)!"*
  - **Aksi Anda:** Buka [script.js](file:///d:/kyyy/uts-web/script.js#L49), ubah baris 49 menjadi:
    ```javascript
    const POLA_KAMAR = /^[A-E]-\d{4}$/;
    ```
  - Simpan, buka browser, refresh, masukkan `E-1001` &rarr; Tunjukkan bahwa input diterima valid!

- **Soal Dosen:** *"Coba ubah minimal karakter deskripsi dari 20 jadi 30!"*
  - **Aksi Anda:** Di [script.js](file:///d:/kyyy/uts-web/script.js#L148), cari angka `20`, ganti menjadi `30`. Di teks counter `${panjang} / 30 karakter`. Selesai!

### 🎯 Skenario 2: Dosen bertanya tentang detail regex
- **Soal Dosen:** *"Apa fungsi tanda `^` dan `$` pada regex kamu?"*
  - **Jawaban Anda:** *"Tanda `^` mengunci pencocokan agar wajib dimulai dari awal string, dan `$` mengunci agar harus berakhir persis di ujung string. Tanpa kedua tanda ini, input seperti `Kamar-B-204-rusak` akan dianggap valid padahal formatnya salah."*

### 🎯 Skenario 3: Dosen bertanya tentang LocalStorage
- **Soal Dosen:** *"Kenapa harus pakai `JSON.stringify` dan `JSON.parse` saat simpan ke LocalStorage?"*
  - **Jawaban Anda:** *"Karena `localStorage` peramban hanya mampu menyimpan data dalam bentuk tipe data teks (string). Oleh karena itu, array objek JavaScript harus diubah menjadi string JSON dengan `JSON.stringify()` saat disimpan, dan diubah kembali menjadi objek array yang bisa dimanipulasi dengan `JSON.parse()` saat dibaca."*

