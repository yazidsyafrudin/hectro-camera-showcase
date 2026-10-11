"use client";

import React from "react";

export default function Craftsmanship() {
  return (
    <section id="craftsmanship" className="relative bg-[#060606] py-36 px-6 md:px-12 border-t border-[#EDE8E0]/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Pre-title */}
        <div className="text-[11px] uppercase tracking-[0.3em] text-brass mb-4 font-mono">
          Manifesto Atelier & Kerajinan Tangan
        </div>

        {/* Editorial Main Headline */}
        <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl text-parchment-90 font-light leading-[1.15] mb-20 max-w-4xl">
          Bukan lini perakitan. <br className="hidden md:block" />
          Sebuah meja kerja, satu pasang tangan, dan keheningan mutlak.
        </h2>

        {/* Two-Column Editorial Text Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 pt-10 border-t border-[#EDE8E0]/10">
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <span className="font-mono text-xs text-brass tracking-[0.25em] block mb-2">
                I. DOKTRIN KESATUAN
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-parchment-90 font-light mb-4">
                Satu Teknisi, Satu Kamera
              </h3>
              <p className="text-sm md:text-base text-parchment-55 font-sans font-light leading-relaxed">
                Di era di mana kamera diproduksi ribuan unit per jam oleh lengan robotik tanpa jiwa,
                Hectro One menolak kompromi tersebut. Setiap unit dirakit secara menyeluruh oleh satu orang
                master horologis dan mekanik optik dari komponen pertama hingga sekrup penutup terakhir.
              </p>
            </div>

            <p className="text-sm md:text-base text-parchment-55 font-sans font-light leading-relaxed">
              Teknisi tersebut bertanggung jawab penuh atas kalibrasi paralelisme sensor terhadap bayonet,
              pengukuran resistansi pelumasan optik, dan penyesuaian akustik klik shutter. Setelah lulus uji ketat
              48 jam, nama sang teknisi dan koordinat meja kerjanya digrafir secara mikroskopis di balik penutup baterai.
            </p>

            <div className="pt-6 border-t border-[#EDE8E0]/08">
              <div className="font-serif italic text-xl text-parchment-90 font-light mb-2">
                &ldquo;Kami tidak mengukur efisiensi dalam detik, melainkan dalam dekade ketahanan alat ini di tangan fotografer.&rdquo;
              </div>
              <div className="text-xs font-mono tracking-widest uppercase text-brass">
                — K. V. Steiner, Kepala Atelier Hectro
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div>
              <span className="font-mono text-xs text-brass tracking-[0.25em] block mb-2">
                II. METALURGI & KULIT
              </span>
              <h3 className="font-serif text-2xl md:text-3xl text-parchment-90 font-light mb-4">
                Titanium Murni & Tali Kulit Pelana
              </h3>
              <p className="text-sm md:text-base text-parchment-55 font-sans font-light leading-relaxed">
                Pelat atas dan bawah kamera dibentuk dari balok Titanium Grade 5 tempaan dingin. Logam ini dua kali
                lebih kuat dari aluminium namun 45% lebih ringan dari kuningan murni. Polesan brushed dilakukan
                dengan tangan menggunakan amplas mikro mineral alami untuk menghasilkan tekstur matte yang hangat saat bersentuhan dengan kulit.
              </p>
            </div>

            <p className="text-sm md:text-base text-parchment-55 font-sans font-light leading-relaxed">
              Tali kulit cokelat tua disuplai oleh penyamak kulit tradisional di dataran tinggi Skotlandia. Diperlakukan
              hanya dengan lilin lebah organik dan minyak biji rami, tali ini menolak getas di suhu beku kutub dan
              semakin kenyal di bawah terik matahari khatulistiwa. Sebuah instrumen yang dirancang untuk diwariskan,
              bukan digantikan.
            </p>

            {/* Atelier Benchmark Figures */}
            <div className="pt-6 border-t border-[#EDE8E0]/08 grid grid-cols-2 gap-6">
              <div>
                <div className="font-serif text-3xl md:text-4xl text-brass font-light mb-1">
                  72 Jam
                </div>
                <div className="text-[11px] font-mono tracking-widest uppercase text-parchment-55">
                  Waktu Pengerjaan per Unit
                </div>
              </div>
              <div>
                <div className="font-serif text-3xl md:text-4xl text-brass font-light mb-1">
                  180 Unit
                </div>
                <div className="text-[11px] font-mono tracking-widest uppercase text-parchment-55">
                  Alokasi Global per Tahun
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Photographic Proof Bar */}
        <div className="mt-20 pt-8 border-t border-[#EDE8E0]/10 flex flex-wrap items-center justify-between text-xs font-mono tracking-[0.2em] text-parchment-25 uppercase">
          <span>NOMOR SERI EDISI : #001 HINGGA #180</span>
          <span>DIBUAT SECARA MANUAL DI ZURICH & KYOTO</span>
          <span>GARANSI ATELIER SEUMUR HIDUP</span>
        </div>
      </div>
    </section>
  );
}
