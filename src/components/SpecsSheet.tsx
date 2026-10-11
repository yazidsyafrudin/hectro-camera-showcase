"use client";

import React, { useState } from "react";

interface SpecItem {
  label: string;
  value: string;
  note?: string;
}

interface SpecCategory {
  id: string;
  category: string;
  code: string;
  items: SpecItem[];
}

const SPEC_DATA: SpecCategory[] = [
  {
    id: "sensor",
    category: "Sensor & Pemrosesan Gambar",
    code: "SEC. 01 / SEN",
    items: [
      {
        label: "Tipe Sensor",
        value: "Full-Frame 35.8 × 23.9 mm BSI-CMOS",
        note: "Tanpa optical low-pass filter (OLPF) untuk ketajaman mikro absolut",
      },
      {
        label: "Resolusi Efektif",
        value: "60.3 Megapiksel Murni",
        note: "9528 × 6328 piksel matriks RGB Bayer",
      },
      {
        label: "Rentang Dinamis",
        value: "15.4 EV Stops (ISO 64)",
        note: "Arsitektur dual-gain native",
      },
      {
        label: "Rentang Sensitivitas ISO",
        value: "ISO 50 – 50,000 (Dapat diperluas ISO 25 – 102,400)",
        note: "Kalibrasi linear per-satuan sensor di atelier",
      },
      {
        label: "Format File Mentah",
        value: "DNG 16-bit Lossless Uncompressed / 14-bit DNG Kompak",
      },
    ],
  },
  {
    id: "optik",
    category: "Dudukan Lensa & Formula Optik",
    code: "SEC. 02 / OPT",
    items: [
      {
        label: "Dudukan Lensa (Mount)",
        value: "Hectro Titanium Bayonet Mount (HT-Mount)",
        note: "Diameter internal 54mm, Flange focal distance 16.0mm",
      },
      {
        label: "Toleransi Mesin Flange",
        value: "± 0.0015 mm",
        note: "Dikerjakan dengan mesin CNC 5-sumbu ultra presisi",
      },
      {
        label: "Kontak Elektronik",
        value: "12 Pin Berlapis Emas 24-Karat",
        note: "Kecepatan transfer data optik 1.2 Gbps",
      },
      {
        label: "Kompatibilitas Lensa Manual",
        value: "Adaptor Hectro Heritage M, R, dan PL Mount",
        note: "Pembacaan kode mekanis dan profile koreksi optik terintegrasi",
      },
    ],
  },
  {
    id: "rana",
    category: "Mekanisme Rana & Pencahayaan",
    code: "SEC. 03 / SHT",
    items: [
      {
        label: "Tipe Rana Mekanis",
        value: "Rana Tirai Bidang Fokus Serat Karbon Berlapis Kevlar",
        note: "Sistem peredam getaran magnetik ganda",
      },
      {
        label: "Kecepatan Rana Mekanis",
        value: "60 menit hingga 1/8,000 detik, Bulb, Waktu T",
      },
      {
        label: "Kecepatan Rana Elektronik",
        value: "Hingga 1/32,000 detik murni hening",
      },
      {
        label: "Sinkronisasi Flash",
        value: "1/250 detik dengan mechanical sync",
      },
      {
        label: "Daya Tahan Pengujian",
        value: "Teruji hingga 500,000 aktuasi tanpa deviasi",
      },
    ],
  },
  {
    id: "bodi",
    category: "Konstruksi Bodi, Material & Ergonomi",
    code: "SEC. 04 / MAT",
    items: [
      {
        label: "Bodi Utama (Top & Base Plate)",
        value: "Titanium Murni Grade 5 (Ti-6Al-4V) Brushed Finish",
        note: "Dibubut dari satu blok padat tunggal, dilapisi pelindung anti-sidik jari alami",
      },
      {
        label: "Rangka Inti (Internal Chassis)",
        value: "Magnesium Die-Cast Bertekanan Tinggi",
        note: "Kekakuan torsional maksimal dengan bobot seimbang",
      },
      {
        label: "Dial & Tombol Kontrol",
        value: "Solid Brass (Kuningan Padat) dengan Knurling Berlian",
        note: "Klik mekanis terkalibrasi secara akustik (62 dB resonant feedback)",
      },
      {
        label: "Tali & Genggaman Tangan",
        value: "Kulit Sapi Scottish Bridle Cokelat Tua",
        note: "Disamak secara nabati alami, dijahit tangan dengan benang wax sutra",
      },
      {
        label: "Dimensi & Bobot",
        value: "139 × 80 × 38.5 mm / 640 g (Termasuk baterai dan plat titanium)",
      },
    ],
  },
  {
    id: "weather",
    category: "Ketahanan Cuaca & Daya",
    code: "SEC. 05 / ENV",
    items: [
      {
        label: "Weather Sealing",
        value: "Sertifikasi IP54 dengan 64 Titik O-Ring Silikon Fluoroelastomer",
        note: "Tahan cipratan air, debu gurun, dan kelembapan tropis 98%",
      },
      {
        label: "Suhu Operasional",
        value: "-20°C hingga +50°C",
      },
      {
        label: "Baterai & Konsumsi Daya",
        value: "Hectro BP-01 Li-Ion 2,400 mAh (7.4 V)",
        note: "650 eksposur per pengisian daya standar CIPA",
      },
      {
        label: "Penyimpanan Internal",
        value: "Memori NVMe 128 GB Terintegrasi + Slot UHS-II SDXC Ganda",
      },
    ],
  },
];

export default function SpecsSheet() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const displayedCategories =
    activeTab === "all"
      ? SPEC_DATA
      : SPEC_DATA.filter((cat) => cat.id === activeTab);

  return (
    <section id="spesifikasi" className="relative bg-[#060606] py-32 px-6 md:px-12 border-t border-[#EDE8E0]/10">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-[#EDE8E0]/10">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-brass mb-3 font-mono">
              Spesifikasi Resmi Atelier
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-parchment-90 font-light">
              Lembar Spesifikasi Cetak
            </h2>
          </div>
          <p className="mt-4 md:mt-0 font-sans text-xs text-parchment-55 tracking-widest uppercase max-w-xs text-left md:text-right font-light">
            Dikeluarkan oleh Hectro Atelier • Dokumen Arsip No. H1-SPEC-REV04
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-16 pb-4 border-b border-[#EDE8E0]/05">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 text-xs uppercase tracking-[0.2em] font-mono transition-colors duration-300 ${
              activeTab === "all"
                ? "text-brass border-b border-brass"
                : "text-parchment-55 hover:text-parchment-90"
            }`}
          >
            Semua Bagian
          </button>
          {SPEC_DATA.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.2em] font-mono transition-colors duration-300 ${
                activeTab === cat.id
                  ? "text-brass border-b border-brass"
                  : "text-parchment-55 hover:text-parchment-90"
              }`}
            >
              {cat.category.split(" ")[0]}
            </button>
          ))}
        </div>

        {/* Print Spec Style Rows */}
        <div className="space-y-16">
          {displayedCategories.map((cat) => (
            <div key={cat.id} className="relative">
              {/* Category Header */}
              <div className="flex items-baseline justify-between mb-6 pb-2 border-b border-brass/30">
                <h3 className="font-serif text-xl md:text-2xl text-parchment-90 font-normal">
                  {cat.category}
                </h3>
                <span className="font-mono text-xs text-brass tracking-[0.25em]">
                  {cat.code}
                </span>
              </div>

              {/* Specs Grid / Table */}
              <div className="divide-y divide-[#EDE8E0]/08">
                {cat.items.map((item, index) => (
                  <div
                    key={index}
                    className="py-4 md:py-5 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 hover:bg-[#EDE8E0]/[0.02] transition-colors duration-300"
                  >
                    <div className="md:col-span-4 text-xs uppercase tracking-[0.18em] text-parchment-55 font-mono">
                      {item.label}
                    </div>
                    <div className="md:col-span-8 flex flex-col justify-start">
                      <span className="font-serif text-base md:text-lg text-parchment-90 font-light">
                        {item.value}
                      </span>
                      {item.note && (
                        <span className="text-xs font-sans text-parchment-55 mt-1 font-light leading-relaxed">
                          {item.note}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footnote / Print seal */}
        <div className="mt-20 pt-8 border-t border-[#EDE8E0]/10 flex flex-col md:flex-row items-start md:items-center justify-between text-xs font-mono text-parchment-25 tracking-widest uppercase">
          <div>SERTIFIKAT KALIBRASI INDIVIDUAL DISERTAKAN PADA SETIAP KOTAK KAYU WALNUT</div>
          <div className="mt-2 md:mt-0 text-brass/70">ISO 12233 RESOLUTION STANDARD CERTIFIED</div>
        </div>
      </div>
    </section>
  );
}
