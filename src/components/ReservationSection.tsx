"use client";

import React, { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";

export default function ReservationSection() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    atelier: "Zurich — Bahnhofstrasse Atelier",
    quarter: "Kuartal I 2027",
    engraving: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormSubmitted(true);
  };

  return (
    <section id="reservasi" className="relative bg-[#060606] py-36 px-6 md:px-12 border-t border-[#EDE8E0]/10">
      <div className="max-w-4xl mx-auto">
        {/* Pre-title */}
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-[0.3em] text-brass font-mono">
            Alokasi Privat & Janji Temu
          </span>
        </div>

        {/* Headline */}
        <h2 className="font-serif text-4xl md:text-6xl text-center text-parchment-90 font-light mb-6">
          Reservasi Milik Anda
        </h2>

        <p className="text-center font-sans text-sm md:text-base text-parchment-55 max-w-xl mx-auto mb-16 font-light leading-relaxed">
          Produksi dibatasi hingga 180 unit per tahun. Setiap reservasi mencakup sesi penerimaan privat di salah satu atelier kami atau pengiriman berkawal kurir khusus.
        </p>

        {formSubmitted ? (
          <div className="border border-brass/40 bg-[#060606] p-10 md:p-14 text-center space-y-6">
            <div className="w-12 h-12 mx-auto rounded-full border border-brass flex items-center justify-center text-brass">
              <Check className="w-5 h-5" />
            </div>
            <div className="text-xs uppercase tracking-[0.3em] font-mono text-brass">
              PERMOHONAN DITERIMA SECARA PRIVAT
            </div>
            <h3 className="font-serif text-3xl md:text-4xl text-parchment-90 font-light">
              Terima Kasih, {formData.name}.
            </h3>
            <p className="text-sm font-sans text-parchment-55 max-w-md mx-auto leading-relaxed">
              Kurator atelier kami akan menghubungi Anda melalui saluran pribadi dalam waktu 24 jam untuk mengatur sesi uji genggam dan verifikasi alokasi nomor seri.
            </p>
            <div className="pt-6 border-t border-[#EDE8E0]/10 text-xs font-mono text-parchment-25 tracking-widest uppercase">
              KODE REFERENSI SEMENTARA : H1-ALLOC-2027-{Math.floor(1000 + Math.random() * 9000)}
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="border border-[#EDE8E0]/10 bg-[#060606] p-8 md:p-14 space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Nama Klien */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.2em] font-mono text-parchment-55">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#060606] border-b border-[#EDE8E0]/20 focus:border-brass py-3 text-parchment-90 font-serif text-lg outline-none placeholder:text-parchment-25 placeholder:font-sans placeholder:text-sm transition-colors duration-300"
                />
              </div>

              {/* Email Pribadi */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.2em] font-mono text-parchment-55">
                  Email Korespondensi *
                </label>
                <input
                  type="email"
                  required
                  placeholder="alamat@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#060606] border-b border-[#EDE8E0]/20 focus:border-brass py-3 text-parchment-90 font-serif text-lg outline-none placeholder:text-parchment-25 placeholder:font-sans placeholder:text-sm transition-colors duration-300"
                />
              </div>

              {/* Nomor Telepon */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.2em] font-mono text-parchment-55">
                  Nomor Kontak Pribadi
                </label>
                <input
                  type="tel"
                  placeholder="+62 812 ..."
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#060606] border-b border-[#EDE8E0]/20 focus:border-brass py-3 text-parchment-90 font-serif text-lg outline-none placeholder:text-parchment-25 placeholder:font-sans placeholder:text-sm transition-colors duration-300"
                />
              </div>

              {/* Lokasi Atelier */}
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-[0.2em] font-mono text-parchment-55">
                  Lokasi Atelier Pilihan
                </label>
                <select
                  value={formData.atelier}
                  onChange={(e) => setFormData({ ...formData, atelier: e.target.value })}
                  className="w-full bg-[#060606] border-b border-[#EDE8E0]/20 focus:border-brass py-3.5 text-parchment-90 font-sans text-sm outline-none transition-colors duration-300"
                >
                  <option value="Zurich — Bahnhofstrasse Atelier" className="bg-[#060606] text-parchment">
                    Zurich — Bahnhofstrasse Atelier
                  </option>
                  <option value="Tokyo — Ginza Sanctuary" className="bg-[#060606] text-parchment">
                    Tokyo — Ginza Sanctuary
                  </option>
                  <option value="Milan — Quadrilatero Studio" className="bg-[#060606] text-parchment">
                    Milan — Quadrilatero Studio
                  </option>
                  <option value="Jakarta — Menteng Heritage Salon" className="bg-[#060606] text-parchment">
                    Jakarta — Menteng Heritage Salon
                  </option>
                  <option value="Private Concierge Dispatch" className="bg-[#060606] text-parchment">
                    Layanan Kurir Privat ke Kediaman
                  </option>
                </select>
              </div>
            </div>

            {/* Custom Engraving */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-[0.2em] font-mono text-parchment-55">
                Grafir Monogram Pribadi pada Pelat Dasar Titanium (Opsional)
              </label>
              <input
                type="text"
                maxLength={30}
                placeholder="Maksimal 30 karakter, mis. 'H. R. STEINER • MCMLXXXVIII'"
                value={formData.engraving}
                onChange={(e) => setFormData({ ...formData, engraving: e.target.value })}
                className="w-full bg-[#060606] border-b border-[#EDE8E0]/20 focus:border-brass py-3 text-parchment-90 font-mono text-sm outline-none placeholder:text-parchment-25 transition-colors duration-300"
              />
              <span className="text-[11px] font-sans text-parchment-25 block font-light">
                Akan digrafir dengan kedalaman 0.15 mm menggunakan jarum intan sebelum pelapisan akhir.
              </span>
            </div>

            {/* Privacy notice */}
            <div className="flex items-center space-x-3 text-xs font-sans text-parchment-55 font-light">
              <ShieldCheck className="w-4 h-4 text-brass shrink-0" />
              <span>
                Informasi Anda dilindungi protokol kerahasiaan perbankan Swiss. Kami tidak pernah membagikan data kepada pihak ketiga.
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-[#EDE8E0]/10">
              <span className="text-xs font-mono text-parchment-25 tracking-widest uppercase text-left">
                HARGA RESMI : CHF 18,500 / IDR 345,000,000
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4 border border-brass text-parchment-90 bg-brass/10 hover:bg-brass hover:text-[#060606] transition-all duration-500 font-sans text-xs uppercase tracking-[0.25em]"
              >
                Kirim Permohonan Reservasi
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
