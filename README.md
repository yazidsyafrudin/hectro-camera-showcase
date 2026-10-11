# Hectro One — 3D Scrollytelling Luxury Showcase

Halaman pameran produk (*luxury product showcase & landing page*) interaktif untuk kamera mirrorless **Hectro One**. Dibangun menggunakan animasi sekuens frame berbasis **HTML5 Canvas** yang tersinkronisasi mulus dengan scroll pengguna (*scrollytelling*), mengusung estetika editorial mewah ala Leica dan Apple.

---

## 📸 Demo & Fitur Utama

- **3D Canvas Frame Scrubber (362 Frames)**: Mengubah pergerakan scroll menjadi scrub animasi 3D rotasi dan exploded-view kamera mirrorless secara halus (*60fps*) menggunakan teknik interpolasi lerp (`linear interpolation`).
- **Progressive Image Preloading & ImageBitmap Cache**: Frame pertama dimuat secara instan untuk mempercepat FCP (*First Contentful Paint*), sementara ratusan frame berikutnya di-decode di latar belakang via Web Worker/`createImageBitmap`.
- **Accessibility & Prefers-Reduced-Motion**: Mendukung pengguna dengan preferensi pengurangan gerakan, secara otomatis beralih ke fallback frame statis yang ramah aksesibilitas.
- **Luxury Editorial Design System**: Palet warna eksklusif (`#060606` Deep Canvas, `#C9A05C` Brushed Brass, dan `#EDE8E0` Parchment White) dengan tipografi *Fraunces* (Serif) dan *Plus Jakarta Sans*.
- **Komponen Interaktif Lengkap**:
  - *Whisper-Thin Navbar* dengan efek glassmorphism.
  - *Printed Spec Sheet* lembar spesifikasi teknis presisi tinggi.
  - *Makrofotografi Parallax Band* menyorot detail mikron material titanium & optik.
  - *Editorial Craftsmanship* cerita dedikasi satu teknisi per unit.
  - *Private Concierge Reservation* formulir reservasi eksklusif.

---

## 🛠️ Prasyarat Sistem

Sebelum menjalankan proyek ini di komputer lokal, pastikan telah terpasang:
- **Node.js**: Versi `18.18.0` atau yang lebih baru (disarankan Node.js 20 LTS atau 22 LTS).
- **Package Manager**: `npm` (bawaan Node.js), `yarn`, atau `pnpm`.
- **Git** (opsional, jika meng-clone dari repository).

Cek versi Node.js Anda di terminal:
```bash
node -v
npm -v
```

---

## 🚀 Panduan Memulai (Clone & Setup)

Ikuti langkah-langkah berikut untuk mengunduh dan menjalankan proyek ini di komputer lokal:

### 1. Clone Repository
Buka terminal dan jalankan perintah:
```bash
git clone https://github.com/username-kamu/hectro-one.git
```
*(Ganti URL di atas dengan tautan repository Git Anda, atau langsung buka folder project jika Anda mendownload file zip).*

### 2. Masuk ke Direktori Proyek
```bash
cd hectro-one
```
*(Catatan: jika nama folder Anda masih `3D Scrollimg Animation`, gunakan `cd "3D Scrollimg Animation"`).*

### 3. Pasang Dependensi (Install Dependencies)
Jalankan salah satu perintah berikut:
```bash
npm install
```
*(Atau jika menggunakan `pnpm` jalankan `pnpm install`, jika `yarn` jalankan `yarn install`).*

### 4. Jalankan Server Pengembangan (Development Server)
```bash
npm run dev
```

Buka peramban (browser) dan akses:
```
http://localhost:3000
```

---

## 📜 Daftar Perintah Tersedia (Scripts)

| Perintah | Deskripsi |
| :--- | :--- |
| `npm run dev` | Menjalankan server lokal Next.js di mode development (`localhost:3000`). |
| `npm run build` | Melakukan kompilasi dan optimasi bundle untuk rilis produksi (*production build*). |
| `npm run start` | Menjalankan server aplikasi Next.js dari hasil build produksi. |
| `npm run lint` | Menjalankan analisis kode dan validasi linter. |

---

## 🖼️ Cara Mengganti Sekuens Frame (Custom 3D Product)

Jika ingin mengganti produk kamera dengan model 3D/produk Anda sendiri:

1. Render sekuens gambar produk Anda dari Blender / Cinema 4D / After Effects ke format `.jpg` atau `.webp`.
2. Beri penamaan berurutan dengan format 4 digit, contoh:
   ```
   frame-0001.jpg
   frame-0002.jpg
   ...
   frame-0362.jpg
   ```
3. Letakkan seluruh file gambar tersebut di folder `public/frames/`.
4. Buka file [`src/components/HeroCanvasScrubber.tsx`](src/components/HeroCanvasScrubber.tsx) dan sesuaikan konstanta jumlah frame:
   ```typescript
   const TOTAL_FRAMES = 362; // Ganti sesuai jumlah frame Anda
   ```

---

## 📁 Struktur Direktori Singkat

```text
├── public/
│   └── frames/               # Aset 362 gambar sekuens kamera
├── src/
│   ├── app/
│   │   ├── globals.css       # Style global & utility scrollbar
│   │   ├── layout.tsx        # Root layout, Google Fonts (Fraunces & Plus Jakarta Sans)
│   │   └── page.tsx          # Halaman utama merangkai seluruh section
│   └── components/
│       ├── Navbar.tsx            # Menu navigasi atas
│       ├── HeroCanvasScrubber.tsx# Engine canvas scrollytelling 3D
│       ├── SpecsSheet.tsx        # Tabel spesifikasi teknis
│       ├── MacroParallax.tsx     # Fitur makro parallax
│       ├── Craftsmanship.tsx     # Narasi editorial pembuatan kamera
│       ├── ReservationSection.tsx# Form reservasi janji privat
│       └── Footer.tsx            # Footer minimalis
├── next.config.mjs           # Konfigurasi Next.js
├── tailwind.config.js        # Konfigurasi token warna, font, & timing
├── tsconfig.json             # Konfigurasi TypeScript
└── package.json              # Daftar pustaka dan dependensi proyek
```

> 📖 Untuk penjelasan teknis arsitektur kode dan cara kerja komponen secara mendalam, silakan baca [PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md).

---

## 📄 Lisensi & Kredit

Dibuat sebagai pameran visual web interaktif kelas tinggi. Desain terinspirasi dari standar kerajinan optik presisi Swiss & Jerman.
