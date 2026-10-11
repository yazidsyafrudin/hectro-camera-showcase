# Dokumentasi Teknis & Arsitektur: Hectro One Showcase

Dokumen ini berisi penjelasan komprehensif mengenai arsitektur, filosofi desain, struktur folder, rincian komponen, serta teknologi yang digunakan dalam proyek **Hectro One**.

---

## 1. Ikhtisar Proyek (Project Overview)

**Hectro One** adalah sebuah *luxury product showcase microsite* yang dirancang untuk memberikan pengalaman bercerita interaktif (*scrollytelling*) saat pengguna menjelajahi kamera mirrorless full-frame berbalut titanium.

Berbeda dengan landing page e-commerce konvensional yang statis, proyek ini menggunakan teknik **Frame-Sequence Canvas Scrubbing** yang memetakan posisi scroll peramban (*browser viewport*) langsung ke rangkaian frame resolusi tinggi. Efek yang dihasilkan menyerupai model 3D nyata dengan sudut pandang dinamis dan *exploded view* tanpa beban komputasi berat dari rendering shader 3D real-time (WebGL/Three.js), sehingga tetap sangat ringan dan kompatibel di berbagai perangkat.

---

## 2. Tumpukan Teknologi (Technology Stack)

| Teknologi / Library | Versi | Peran & Alasan Pemilihan |
| :--- | :--- | :--- |
| **Next.js (App Router)** | `^15.1.7` | Framework fullstack berbasis React. Menangani routing, optimasi font modern (*next/font*), server-side rendering, dan bundling produksi yang sangat efisien. |
| **React** | `^19.0.0` | Pustaka inti untuk membuat komponen UI modular dan reaktif. |
| **TypeScript** | `^5.7.3` | Menyediakan pengetikan statis (*static typing*) yang ketat untuk mencegah bug saat runtime, terutama pada data frame dan event handler. |
| **Tailwind CSS** | `^3.4.17` | Utility-first CSS framework untuk styling cepat dengan konsistensi token warna, font, dan spasi yang terstandarisasi. |
| **Framer Motion** | `^12.4.7` | Mengelola animasi transisi elemen teks, kartu, dan komponen interaktif di luar area canvas. |
| **HTML5 Canvas API** | Native | Media rendering 2D berkinerja tinggi untuk menggambar ratusan frame gambar kamera secara halus pada 60 FPS. |
| **Lucide React** | `^0.475.0` | Kumpulan ikon monokromatik modern, tajam, dan ringan. |

---

## 3. Sistem Desain & Estetika (Design System)

Proyek ini mengadopsi estetika **Haute Horlogerie & Luxury Optical** dengan palet warna bernuansa logam mulia dan kertas arsip:

### A. Palet Warna (Color Palette)
Dikonfigurasi secara terpusat di `tailwind.config.js`:
- **Canvas (`#060606`)**: Latar belakang hitam pekat (*deep obsidian*), memberikan kontras tinggi bagi bodi logam kamera.
- **Brass / Kuningan (`#C9A05C`)**: Aksen emas kuningan klasik untuk elemen interaktif, tombol, dan sorotan kursor.
  - `brass.dim`: `#9E7B3B`
  - `brass.glow`: `#D9B26E`
- **Parchment (`#EDE8E0`)**: Warna putih gading/kertas arsip tua untuk keterbacaan teks tanpa membuat mata lelah:
  - `parchment-90` (Opasitas 90%): Judul dan teks primer.
  - `parchment-55` (Opasitas 55%): Teks penjelasan dan paragraf.
  - `parchment-25` (Opasitas 25%): Garis pembatas (divider) dan caption sekunder.
  - `parchment-10` & `parchment-05`: Garis pandu ultra-halus dan border halus.

### B. Tipografi
Dua font dimuat langsung melalui `next/font/google` di `src/app/layout.tsx`:
1. **Fraunces (`var(--font-fraunces)`)**: Serif kontemporer berkarakter mewah dengan variasi berat 300–600, digunakan untuk *heading* besar, kutipan editorial, dan angka seri.
2. **Plus Jakarta Sans (`var(--font-sans)`)**: Sans-serif geometris yang bersih dan modern untuk body text, lembar spesifikasi, dan label tombol.

---

## 4. Struktur Folder & Penjelasan File

Berikut adalah peta struktur direktori proyek beserta peran masing-masing berkas:

```text
hectro-one/
├── public/
│   └── frames/
│       ├── frame-0001.jpg
│       ├── ...
│       └── frame-0362.jpg
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── Craftsmanship.tsx
│       ├── Footer.tsx
│       ├── HeroCanvasScrubber.tsx
│       ├── MacroParallax.tsx
│       ├── Navbar.tsx
│       ├── ReservationSection.tsx
│       └── SpecsSheet.tsx
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.js
└── tsconfig.json
```

### Penjelasan Detail Berkas:

#### 1. Konfigurasi Root
- **`package.json`**: Mendefinisikan metadata proyek, script (`dev`, `build`, `start`), dan daftar dependensi npm.
- **`tailwind.config.js`**: Pusat konfigurasi tema Tailwind CSS yang memuat token warna kustom (`canvas`, `brass`, `parchment`), timing fungsi cubic-bezier (`luxury`, `slow-ease`), dan letter-spacing (`ultra`, `subtle`).
- **`next.config.mjs`**: Konfigurasi Next.js untuk optimasi image, header keamanan, dan modul ECMAScript.
- **`tsconfig.json`**: Konfigurasi compiler TypeScript dengan path alias `@/*` mengarah ke `./src/*`.
- **`postcss.config.mjs`**: Pipeline pemrosesan CSS yang mengintegrasikan Tailwind CSS dan Autoprefixer.

#### 2. Folder `src/app/`
- **`layout.tsx`**: Layout utama pembungkus seluruh aplikasi. Memuat Google Fonts (*Fraunces* dan *Plus Jakarta Sans*), metadata SEO OpenGraph, dan menerapkan tema warna latar belakang `#060606`.
- **`globals.css`**: Styling global dasar, pengaturan reset browser, custom scrollbar minimalis, dan utility untuk teks terpotong (*clamp*).
- **`page.tsx`**: Halaman utama (*root page*) yang menyusun seluruh seksi secara berurutan:
  1. `Navbar`
  2. `HeroCanvasScrubber`
  3. `SpecsSheet`
  4. `MacroParallax`
  5. `Craftsmanship`
  6. `ReservationSection`
  7. `Footer`

#### 3. Folder `src/components/`
- **`HeroCanvasScrubber.tsx`** *(Komponen Inti)*:
  - Mengatur area scroll sepanjang ~`380vh`.
  - Mengelola rendering HTML5 Canvas dengan kalkulasi rasio aspek `cover` otomatis.
  - Memuat 362 frame kamera secara bertahap (*progressive preloading*) dan menyimpannya di memori `ImageBitmap`.
  - Menghitung interpolasi gerak halus (*lerp*) dengan `requestAnimationFrame`.
  - Menampilkan teks naratif (*overlays*) yang memudar (*fade in/out*) sesuai dengan progress scroll kamera.
  - Menyediakan toggle aksesibilitas (*prefers-reduced-motion*) dan scrubber manual interaktif.
- **`Navbar.tsx`**:
  - Bilah navigasi melayang (*fixed header*) yang sangat ramping (*whisper-thin*).
  - Dilengkapi backdrop blur dan tautan lompat halus (*smooth anchor*) ke setiap bagian halaman.
- **`SpecsSheet.tsx`**:
  - Menampilkan lembar spesifikasi kamera ala lembar cetak presisi Swiss.
  - Menggunakan grid tipografi monospace untuk data sensor, shutter, dimensi bodi, mount optik, dan akurasi perakitan.
- **`MacroParallax.tsx`**:
  - Menyoroti detail mikroskopis produk: tekstur titanium brushed, 11-bilah diafragma optik iris, dan tali kulit Bridle.
  - Menggunakan efek parallax halus saat discroll.
- **`Craftsmanship.tsx`**:
  - Tata letak editorial dua kolom yang menceritakan filosofi "Satu Kamera, Satu Teknisi", metalurgi titanium grade 5, dan kalibrasi mikron.
- **`ReservationSection.tsx`**:
  - Formulir reservasi interaktif untuk janji temu eksklusif (*private appointment*).
  - Dilengkapi validasi form dan feedback status reservasi.
- **`Footer.tsx`**:
  - Bagian penutup bergaya heritage minimalis yang memuat info atelier di Zurich, tautan concierge, dan copyright.

#### 4. Folder `public/frames/`
- Menyimpan 362 file gambar berurutan (`frame-0001.jpg` s/d `frame-0362.jpg`) hasil render 3D kamera mirrorless.

---

## 5. Cara Kerja Logika Canvas Scrubber (Deep Dive)

Bagian paling penting dari website ini berada pada berkas [`src/components/HeroCanvasScrubber.tsx`](src/components/HeroCanvasScrubber.tsx). Berikut adalah alur logikanya:

```
[User Scroll Event] 
        ↓
[Kalkulasi Progress (0.00 s/d 1.00)]
        ↓
[Interpolasi Lerp: currentProgress = current + (target - current) * 0.08]
        ↓
[Hitung Frame Index = Math.floor(currentProgress * (TOTAL_FRAMES - 1))]
        ↓
[Ambil Frame dari Cache ImageBitmap / Fallback Nearest Frame]
        ↓
[ctx.drawImage() dengan Aspect Ratio Scaling 'Cover']
        ↓
[Update Opasitas Teks Naratif Berdasarkan Rentang Progress]
```

### Keunggulan Optimasi:
1. **Dampening / LERP**: Nilai scroll tidak langsung ditembakkan ke canvas, melainkan diperhalus dengan rumus linear interpolation (`lerp`), memberikan sensasi bobot mekanis yang mewah (*fluid drag effect*).
2. **Device Pixel Ratio (DPR) Scaling**: Ukuran canvas disesuaikan dengan `window.devicePixelRatio` (hingga batas 2x) agar visual di layar Retina/HiDPI tetap tajam kristal tanpa membebani GPU berlebihan.
3. **Penyimpanan ImageBitmap**: Menggunakan `createImageBitmap` untuk men-decode gambar secara asinkron di luar thread utama, mencegah browser mengalami *stutter* (*frame drop*) saat scrolling cepat.

---

## 6. Rekomendasi Pengembangan Lanjutan

Bagi pengembang yang ingin memperluas fitur proyek ini:
- **Audio Scrollytelling**: Menambahkan efek suara haptic halus saat dial aperture berputar (*mechanical click*).
- **Mode AR / QuickLook**: Menambahkan tombol untuk melihat model 3D menggunakan format `.usdz` di iOS atau WebXR di Android.
- **Backend API Form**: Menghubungkan formulir reservasi pada `ReservationSection.tsx` dengan API route Next.js (`/api/reserve`) dan database seperti PostgreSQL atau Supabase.
