# 🎓 Fresh Graduate Portfolio

Website portofolio interaktif yang dirancang khusus untuk fresh graduate. Dibangun dengan HTML, CSS, dan Vanilla JavaScript murni tanpa framework, membuatnya sangat ringan, cepat, dan mudah dikustomisasi.

🔗 **Live Demo:** [herikman.vercel.app](https://herikman.vercel.app) *(Ganti dengan link Vercel Anda)*

![Portfolio Preview](https://via.placeholder.com/1200x600/16161f/6366f1?text=Portfolio+Preview)

## ✨ Fitur Utama

- 🌗 **Dark & Light Mode** — Tema yang tersimpan otomatis di `localStorage`.
- ⚡ **Interaktif & Animasi** — Efek *hover* (naik, *glow*, putaran ikon) di seluruh bagian.
- 📱 **Fully Responsive** — Tampilan optimal di HP, Tablet, dan Desktop.
- 🎨 **UI/UX Modern** — Desain bersih dengan *glassmorphism* dan *gradient text*.
- 📜 **Sertifikat Modal** — Gambar sertifikat diperbesar dalam *pop-up* (tanpa pindah halaman).
- 🛠️ **Tools Pop-up** — Info detail tools muncul dengan animasi *progress bar*.
- 🧩 **Sistem Collapse (Accordion)** — Detail pengalaman dan skill dapat di-*minimize*.
- 📬 **Form Kontak** — UI form yang siap diintegrasikan dengan backend/EmailJS.

## 🗂️ Struktur Folder

```text
portfolio/
├── index.html          # Halaman utama
├── css/
│   └── style.css       # Seluruh styling & animasi
├── js/
│   └── main.js         # Logika interaktif (tema, modal, collapse)
├── assets/             # Tempat menyimpan gambar
│   ├── profile.jpg     # Foto profil Anda
│   ├── CV-Nama-Anda.pdf# File CV untuk di-download
│   ├── certificates/   # Gambar-gambar sertifikat
│   └── projects/       # Gambar proyek (jika ada)
├── vercel.json         # Konfigurasi deploy Vercel
├── README.md           # Dokumentasi ini
└── LICENSE             # Lisensi MIT