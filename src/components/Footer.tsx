"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-[#060606] border-t border-[#EDE8E0]/10 py-20 px-6 md:px-12 text-parchment-55">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Top Tier: Wordmark & Maison Coordinates */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pb-12 border-b border-[#EDE8E0]/08">
          <div>
            <span className="font-serif text-3xl tracking-[0.25em] uppercase text-parchment-90 block mb-2">
              Hectro
            </span>
            <span className="text-xs uppercase tracking-[0.3em] font-mono text-brass block">
              Maison d&apos;Optique & Horlogerie
            </span>
            <p className="text-xs font-sans text-parchment-55 max-w-sm mt-3 font-light leading-relaxed">
              Didedikasikan untuk kemurnian optik, ketahanan material titanium, dan kesempurnaan mekanik lintas dekade.
            </p>
          </div>

          <div className="text-left md:text-right font-mono text-xs text-parchment-25 space-y-1.5 uppercase tracking-widest">
            <div>ATELIER HAUPTSITZ : ZURICH, SCHWEIZ</div>
            <div>KOORDINAT : 47.3769° N, 8.5417° E</div>
            <div className="text-brass/70">ARCHIV NO. : HC-ON-2026</div>
          </div>
        </div>

        {/* Middle Tier: Heritage Links & Legal */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-sans font-light">
          <div>
            <div className="font-mono uppercase text-[11px] tracking-widest text-parchment-90 mb-3">
              Instrumen
            </div>
            <ul className="space-y-2 text-parchment-55">
              <li><a href="#kamera-narrative" className="hover:text-parchment-90 transition-colors">Hectro One Mirrorless</a></li>
              <li><a href="#spesifikasi" className="hover:text-parchment-90 transition-colors">HT-Mount Optik 35mm f/1.4</a></li>
              <li><a href="#spesifikasi" className="hover:text-parchment-90 transition-colors">HT-Mount Optik 50mm f/1.2</a></li>
              <li><a href="#craftsmanship" className="hover:text-parchment-90 transition-colors">Aksesori Kulit Bridle</a></li>
            </ul>
          </div>

          <div>
            <div className="font-mono uppercase text-[11px] tracking-widest text-parchment-90 mb-3">
              Atelier
            </div>
            <ul className="space-y-2 text-parchment-55">
              <li><a href="#craftsmanship" className="hover:text-parchment-90 transition-colors">Filosofi Satu Teknisi</a></li>
              <li><a href="#craftsmanship" className="hover:text-parchment-90 transition-colors">Metalurgi Titanium Grade 5</a></li>
              <li><a href="#craftsmanship" className="hover:text-parchment-90 transition-colors">Arsip Nomor Seri</a></li>
              <li><a href="#reservasi" className="hover:text-parchment-90 transition-colors">Janji Temu Privat</a></li>
            </ul>
          </div>

          <div>
            <div className="font-mono uppercase text-[11px] tracking-widest text-parchment-90 mb-3">
              Saluran Atelier
            </div>
            <ul className="space-y-2 text-parchment-55">
              <li><span className="text-parchment-25">concierge@hectro.com</span></li>
              <li><span className="text-parchment-25">+41 44 215 88 00</span></li>
              <li><span className="text-parchment-25">Bahnhofstrasse 45, Zurich</span></li>
            </ul>
          </div>

          <div>
            <div className="font-mono uppercase text-[11px] tracking-widest text-parchment-90 mb-3">
              Kerahasiaan & Standar
            </div>
            <ul className="space-y-2 text-parchment-55">
              <li><span>Protokol Privasi Pelanggan</span></li>
              <li><span>Sertifikat Asal Material</span></li>
              <li><span>Garansi Restorasi 100-Tahun</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Tier: Minimal Copyright Bar */}
        <div className="pt-8 border-t border-[#EDE8E0]/08 flex flex-col md:flex-row items-center justify-between text-[11px] font-mono tracking-widest text-parchment-25 uppercase gap-4">
          <div>
            © {new Date().getFullYear()} HECTRO MAISON D&apos;OPTIQUE SA. HAK CIPTA DILINDUNGI.
          </div>
          <div className="flex items-center space-x-6">
            <span className="text-brass/70">SWISS PRECISION • JAPANESE POLISH</span>
            <span>EDISI TERBATAS 180 UNIT</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
