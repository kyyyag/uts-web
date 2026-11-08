/**
 * ====================================================================
 * PORTAL HELPDESK WI-FI ASRAMA - SCRIPT.JS
 * Kasus 03 WAD: Web Application Development
 * Politeknik Driyorejo - Ujian Tengah Semester
 * 
 * Modul ini memuat 2 interaksi JavaScript utama:
 * 1. Formulir Lapor Gangguan (Validasi Regex, Live Counter, LocalStorage, Toggle Status)
 * 2. Pencarian FAQ (Real-time Filter, Case-Insensitive, Fallback Not Found)
 * ====================================================================
 */

// ==========================================
// 1. DATA AWAL SESUAI KETENTUAN SOAL KASUS 03
// ==========================================

/**
 * Data FAQ: minimal 8 pertanyaan, sedikitnya 2 menyebut DNS dan 1 menyebut IP.
 */
const faq = [
  {
    tanya: "Kenapa Wi-Fi tersambung tapi tidak bisa membuka situs?",
    jawab: "Kemungkinan cache DNS lokal di perangkat Anda bermasalah. Coba buka Command Prompt (CMD) di laptop lalu jalankan perintah 'ipconfig /flushdns', atau ganti DNS sementara ke DNS kampus (10.10.1.1) atau Cloudflare (1.1.1.1)."
  },
  {
    tanya: "Bagaimana cara melihat alamat IP di HP?",
    jawab: "Buka menu Pengaturan (Settings) > Wi-Fi > ketuk tanda 'i' atau ikon roda gigi di sebelah nama Wi-Fi asrama yang terhubung, lalu gulir ke bawah pada bagian 'Alamat IP' (biasanya berformat 10.x.x.x)."
  },
  {
    tanya: "Apa yang harus dilakukan jika muncul galat 'DNS Server Not Responding'?",
    jawab: "Periksa apakah pengaturan DNS adapter jaringan Anda berada pada mode otomatis (DHCP). Jika masih gagal, matikan Wi-Fi selama 10 detik lalu sambungkan kembali untuk memperbarui alokasi DNS server."
  },
  {
    tanya: "Apakah mahasiswa mendapatkan alokasi alamat IP statis atau dinamis?",
    jawab: "Seluruh penghuni asrama mendapatkan alamat IP dinamis secara otomatis dari server DHCP asrama setiap kali perangkat berhasil tersambung ke jaringan."
  },
  {
    tanya: "Mengapa kecepatan Wi-Fi terasa lambat pada malam hari (20.00 - 23.00)?",
    jawab: "Pada jam tersebut terjadi lonjakan trafik penggunaan (peak hours). Sistem router asrama menerapkan pembagian bandwidth otomatis agar semua kamar tetap mendapatkan akses internet yang adil."
  },
  {
    tanya: "Berapa batas maksimal perangkat yang boleh terhubung untuk satu akun?",
    jawab: "Satu akun SSO mahasiswa dibatasi maksimal dapat login aktif pada 2 perangkat secara bersamaan (misalnya 1 laptop dan 1 smartphone)."
  },
  {
    tanya: "Bagaimana jika halaman captive portal login tidak otomatis muncul di browser?",
    jawab: "Buka aplikasi peramban web (Chrome, Firefox, atau Edge), lalu ketik manual alamat 'http://login.asrama.ac.id' atau 'http://neverssl.com' di kolom URL untuk memicu pop-up autentikasi."
  },
  {
    tanya: "Bagaimana cara melapor jika lampu Access Point (AP) di lorong kamar mati?",
    jawab: "Gunakan formulir 'Lapor Gangguan' di portal ini. Masukkan nomor kamar terdekat dari AP yang padam dan deskripsikan bahwa lampu indikator AP di lorong tidak menyala."
  }
];

/**
 * Pola regex nomor kamar asrama:
 * Wajib blok A-D, tanda hubung (-), diikuti 3 digit angka.
 * Contoh valid: A-101, B-204, D-312
 * Contoh tidak valid: E-201 (blok salah), b204 (tanpa tanda hubung / huruf kecil)
 */
const POLA_KAMAR = /^[A-D]-\d{3}$/;

// Kunci penyimpanan LocalStorage
const STORAGE_KEY = "laporan_wifi_asrama";


// ==========================================
// 2. REFERENSI ELEMEN DOM (DOCUMENT OBJECT MODEL)
// ==========================================

// Elemen FAQ & Pencarian
const faqListElement = document.getElementById("faq-list");
const faqSearchInput = document.getElementById("faq-search");
const faqEmptyElement = document.getElementById("faq-empty");

// Elemen Formulir Lapor Gangguan
const formLapor = document.getElementById("form-lapor");
const inputKamar = document.getElementById("input-kamar");
const selectGangguan = document.getElementById("select-gangguan");
const textareaDeskripsi = document.getElementById("textarea-deskripsi");
const charCounter = document.getElementById("char-counter");

// Elemen Pesan Error Formulir
const errorKamar = document.getElementById("error-kamar");
const errorGangguan = document.getElementById("error-gangguan");
const errorDeskripsi = document.getElementById("error-deskripsi");

// Elemen Tabel Laporan & Badge Pending
const reportTbody = document.getElementById("report-tbody");
const noReportsElement = document.getElementById("no-reports");
const pendingCountElement = document.getElementById("pending-count");


// ==========================================
// 3. INTERAKSI 2: PENCARIAN & FILTER FAQ REAL-TIME
// ==========================================

/**
 * Fungsi untuk menampilkan daftar FAQ ke dalam HTML.
 * Menggunakan elemen semantik <details> dan <summary>.
 * @param {Array} items - Daftar objek FAQ yang akan dirender
 */
function renderFAQ(items) {
  // Kosongkan daftar sebelum merender
  faqListElement.innerHTML = "";

  if (items.length === 0) {
    // Sembunyikan daftar dan munculkan pesan tidak ditemukan
    faqListElement.style.display = "none";
    faqEmptyElement.style.display = "block";
    return;
  }

  // Tampilkan daftar dan sembunyikan pesan kosong
  faqListElement.style.display = "flex";
  faqEmptyElement.style.display = "none";

  // Iterasi setiap FAQ dan buat elemen <details>
  items.forEach((item) => {
    const details = document.createElement("details");
    details.className = "faq-item";

    const summary = document.createElement("summary");
    summary.className = "faq-summary";
    summary.textContent = item.tanya;

    const answerDiv = document.createElement("div");
    answerDiv.className = "faq-answer";
    
    const p = document.createElement("p");
    p.textContent = item.jawab;
    answerDiv.appendChild(p);

    details.appendChild(summary);
    details.appendChild(answerDiv);
    faqListElement.appendChild(details);
  });
}

/**
 * Event listener saat pengguna mengetik di kotak pencarian FAQ (event: input).
 * Tidak peka huruf besar-kecil (case-insensitive menggunakan toLowerCase).
 */
faqSearchInput.addEventListener("input", function (event) {
  const kataKunci = event.target.value.trim().toLowerCase();

  if (kataKunci === "") {
    // Jika kolom pencarian kosong, tampilkan seluruh FAQ
    renderFAQ(faq);
    return;
  }

  // Filter FAQ berdasarkan pertanyaan maupun jawaban
  const hasilFilter = faq.filter((item) => {
    const tanyaCocok = item.tanya.toLowerCase().includes(kataKunci);
    const jawabCocok = item.jawab.toLowerCase().includes(kataKunci);
    return tanyaCocok || jawabCocok;
  });

  renderFAQ(hasilFilter);
});


// ==========================================
// 4. INTERAKSI 1: FORMULIR LAPOR GANGGUAN
// ==========================================

/**
 * Penghitung karakter live pada textarea deskripsi (event: input).
 * Memberikan indikator visual ketika jumlah karakter sudah >= 20.
 */
textareaDeskripsi.addEventListener("input", function () {
  const panjang = textareaDeskripsi.value.length;
  charCounter.textContent = `${panjang} / 20 karakter`;

  if (panjang >= 20) {
    charCounter.classList.add("valid");
    errorDeskripsi.textContent = "";
    textareaDeskripsi.classList.remove("is-invalid");
  } else {
    charCounter.classList.remove("valid");
  }
});

/**
 * Validasi saat input kamar kehilangan fokus (blur) atau diketik.
 */
inputKamar.addEventListener("input", function () {
  const val = inputKamar.value.trim();
  if (POLA_KAMAR.test(val)) {
    errorKamar.textContent = "";
    inputKamar.classList.remove("is-invalid");
  }
});

selectGangguan.addEventListener("change", function () {
  if (selectGangguan.value !== "") {
    errorGangguan.textContent = "";
    selectGangguan.classList.remove("is-invalid");
  }
});

/**
 * Menangani pengiriman formulir lapor gangguan (event: submit).
 */
formLapor.addEventListener("submit", function (event) {
  event.preventDefault(); // Mencegah reload halaman standar browser

  let formValid = true;

  // 1. Validasi Nomor Kamar (Wajib pola ^[A-D]-\d{3}$)
  const nilaiKamar = inputKamar.value.trim();
  if (!POLA_KAMAR.test(nilaiKamar)) {
    errorKamar.textContent = "Format kamar salah! Wajib blok A-D lalu tanda hubung dan 3 angka (cth: B-204).";
    inputKamar.classList.add("is-invalid");
    inputKamar.focus();
    formValid = false;
  } else {
    errorKamar.textContent = "";
    inputKamar.classList.remove("is-invalid");
  }

  // 2. Validasi Jenis Gangguan
  const nilaiGangguan = selectGangguan.value;
  if (!nilaiGangguan) {
    errorGangguan.textContent = "Silakan pilih salah satu jenis gangguan.";
    selectGangguan.classList.add("is-invalid");
    if (formValid) selectGangguan.focus();
    formValid = false;
  } else {
    errorGangguan.textContent = "";
    selectGangguan.classList.remove("is-invalid");
  }

  // 3. Validasi Deskripsi (Minimal 20 karakter)
  const nilaiDeskripsi = textareaDeskripsi.value.trim();
  if (nilaiDeskripsi.length < 20) {
    errorDeskripsi.textContent = `Deskripsi terlalu pendek! Minimal 20 karakter (saat ini ${nilaiDeskripsi.length} karakter).`;
    textareaDeskripsi.classList.add("is-invalid");
    if (formValid) textareaDeskripsi.focus();
    formValid = false;
  } else {
    errorDeskripsi.textContent = "";
    textareaDeskripsi.classList.remove("is-invalid");
  }

  // Jika ada input yang tidak valid, hentikan proses penyimpanan
  if (!formValid) {
    return;
  }

  // Format tanggal & waktu saat laporan dibuat
  const waktuSekarang = new Date();
  const formatWaktu = waktuSekarang.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + 
                      ", " + waktuSekarang.toLocaleDateString("id-ID", { day: "numeric", month: "short" });

  // Buat objek laporan baru dengan status awal "Baru"
  const laporanBaru = {
    id: Date.now(), // Unik ID berbasis timestamp
    kamar: nilaiKamar,
    jenis: nilaiGangguan,
    deskripsi: nilaiDeskripsi,
    waktu: formatWaktu,
    status: "Baru" // Status awal wajib "Baru"
  };

  // Simpan ke LocalStorage
  simpanLaporanKeStorage(laporanBaru);

  // Reset form dan tampilan penghitung karakter
  formLapor.reset();
  charCounter.textContent = "0 / 20 karakter";
  charCounter.classList.remove("valid");

  // Render ulang tabel laporan agar langsung terlihat
  muatDanTampilkanLaporan();

  // Berikan feedback visual sederhana (scroll ke tabel)
  document.getElementById("daftar-laporan").scrollIntoView({ behavior: "smooth" });
});


// ==========================================
// 5. LOCALSTORAGE & PENGELOLAAN STATUS TIKET
// ==========================================

/**
 * Mengambil daftar seluruh laporan dari LocalStorage.
 * @returns {Array} Array objek laporan
 */
function ambilDaftarLaporan() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    // Data bawaan awal agar dosen langsung melihat contoh riwayat
    const dataAwal = [
      {
        id: 1710000001,
        kamar: "B-204",
        jenis: "Lambat",
        deskripsi: "Kecepatan unduh di bawah 500 Kbps dan sering loading saat kuliah daring.",
        waktu: "08:15, 4 Nov",
        status: "Baru"
      },
      {
        id: 1710000002,
        kamar: "A-101",
        jenis: "Putus-putus",
        deskripsi: "Sinyal Wi-Fi sering tidak tersambung tiba-tiba setiap 5 menit sekali di laptop.",
        waktu: "07:45, 4 Nov",
        status: "Diproses"
      }
    ];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataAwal));
    return dataAwal;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Gagal membaca LocalStorage, memulihkan ke array kosong.", e);
    return [];
  }
}

/**
 * Menyimpan satu laporan baru ke LocalStorage (ditambahkan di urutan paling atas).
 * @param {Object} laporanBaru 
 */
function simpanLaporanKeStorage(laporanBaru) {
  const daftar = ambilDaftarLaporan();
  daftar.unshift(laporanBaru); // Masukkan ke awal array
  localStorage.setItem(STORAGE_KEY, JSON.stringify(daftar));
}

/**
 * Memperbarui status laporan ketika tombol badge diklik.
 * Siklus status: "Baru" -> "Diproses" -> "Selesai" (lalu berulang).
 * @param {number} id - ID unik laporan
 */
function ubahStatusLaporan(id) {
  const daftar = ambilDaftarLaporan();
  const laporan = daftar.find((item) => item.id === id);

  if (!laporan) return;

  // Siklus status sesuai ketentuan kasus 03:
  // "Klik status mengubahnya menjadi Diproses lalu Selesai"
  if (laporan.status === "Baru") {
    laporan.status = "Diproses";
  } else if (laporan.status === "Diproses") {
    laporan.status = "Selesai";
  } else {
    laporan.status = "Baru";
  }

  // Simpan kembali ke LocalStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(daftar));

  // Render ulang tampilan tabel dan penghitung laporan belum selesai
  muatDanTampilkanLaporan();
}

/**
 * Memperbarui angka indikator jumlah laporan yang belum selesai.
 * Laporan belum selesai = yang statusnya BUKAN "Selesai" ("Baru" atau "Diproses").
 * @param {Array} daftar - Array laporan
 */
function perbaruiJumlahBelumSelesai(daftar) {
  const jumlahBelumSelesai = daftar.filter((item) => item.status !== "Selesai").length;
  pendingCountElement.textContent = jumlahBelumSelesai;
}

/**
 * Memuat data laporan dari LocalStorage dan merender tabel di DOM.
 */
function muatDanTampilkanLaporan() {
  const daftar = ambilDaftarLaporan();

  // Perbarui badge jumlah belum selesai
  perbaruiJumlahBelumSelesai(daftar);

  // Bersihkan baris tabel sebelumnya
  reportTbody.innerHTML = "";

  if (daftar.length === 0) {
    noReportsElement.style.display = "block";
    return;
  }

  noReportsElement.style.display = "none";

  daftar.forEach((laporan, index) => {
    const tr = document.createElement("tr");

    // Kelas warna status untuk styling badge tombol
    const statusClass = laporan.status === "Baru" 
      ? "status-baru" 
      : laporan.status === "Diproses" 
        ? "status-diproses" 
        : "status-selesai";

    tr.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${laporan.kamar}</strong></td>
      <td>${laporan.jenis}</td>
      <td>${laporan.deskripsi}</td>
      <td><time>${laporan.waktu}</time></td>
      <td>
        <button type="button" class="badge-status-btn ${statusClass}" data-id="${laporan.id}" title="Klik untuk mengubah status laporan">
          <span class="status-dot" aria-hidden="true"></span>${laporan.status}
        </button>
      </td>
    `;

    reportTbody.appendChild(tr);
  });

  // Pasang event listener ke setiap tombol status
  const tombolStatus = reportTbody.querySelectorAll(".badge-status-btn");
  tombolStatus.forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = Number(this.getAttribute("data-id"));
      ubahStatusLaporan(id);
    });
  });
}


// ==========================================
// 6. INISIALISASI SAAT HALAMAN SELESAI DIMUAT
// ==========================================
function inisialisasiHalaman() {
  // 1. Tampilkan seluruh FAQ bawaan
  renderFAQ(faq);

  // 2. Tampilkan daftar laporan dari LocalStorage
  muatDanTampilkanLaporan();
}

// Menjamin eksekusi baik saat loading maupun setelah DOM siap
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inisialisasiHalaman);
} else {
  inisialisasiHalaman();
}
