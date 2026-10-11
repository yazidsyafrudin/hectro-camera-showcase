"use client";

import React, { useEffect, useRef, useState } from "react";

interface MacroFeature {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  frameSrc: string;
  material: string;
  tolerance: string;
}

const MACRO_ITEMS: MacroFeature[] = [
  {
    number: "01",
    title: "Tekstur Gurat Titanium",
    subtitle: "Brushed Grade 5 (Ti-6Al-4V)",
    description:
      "Setiap bodi kamera diselesaikan dengan teknik brushed manual searah serat kristal logam. Cahaya tidak dipantulkan secara menyilaukan, melainkan diserap dalam gradasi abu-abu metalik yang hangat dan dalam.",
    frameSrc: "/frames/frame-0048.jpg",
    material: "TITANIUM ALOI DIRGANTARA",
    tolerance: "KEHALUSAN PERMUKAAN Ra 0.2 µm",
  },
  {
    number: "02",
    title: "Pupil & Bilah Diafragma",
    subtitle: "Aperture Iris Mekanis 11-Bilah",
    description:
      "Bilah diafragma dipotong menggunakan erosi percikan kawat elektro-discas, menghasilkan lingkaran bukaan sempurna dari f/1.4 hingga f/16 untuk rendisi bokeh sirkular tanpa aberasi tepi.",
    frameSrc: "/frames/frame-0175.jpg",
    material: "KACA OPTIK FLURIT & BAJA PEGAS",
    tolerance: "DEVASI BUKAAN ±0.02 EV",
  },
  {
    number: "03",
    title: "Kulit Bridle Cokelat Tua",
    subtitle: "Penyamakan Nabati Tradisional Skotlandia",
    description:
      "Tali dan bantalan genggam dipotong dari kulit pelana terbaik, direndam minyak pohon ek selama enam bulan. Seiring waktu dan sentuhan tangan Anda, kulit ini akan membentuk patina unik yang tak tergantikan.",
    frameSrc: "/frames/frame-0320.jpg",
    material: "BRIDLE LEATHER 3.2 MM",
    tolerance: "JAHITAN SUTRA LILIN 7 STITCH/INCH",
  },
];

export default function MacroParallax() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollYOffset, setScrollYOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      setScrollYOffset(rect.top);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#060606] py-32 border-t border-[#EDE8E0]/10 overflow-hidden"
    >
      {/* Editorial Header */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-20">
        <div className="text-[11px] uppercase tracking-[0.3em] text-brass mb-3 font-mono">
          Makrofotografi & Anatomi Material
        </div>
        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-parchment-90 font-light max-w-2xl">
          Keindahan mikroskopis yang luput dari pandangan sekilas.
        </h2>
      </div>

      {/* Full-Bleed Macro Panels */}
      <div className="space-y-28 md:space-y-40">
        {MACRO_ITEMS.map((item, idx) => {
          // Subtle parallax offset calculation
          const parallaxTranslate = (scrollYOffset * (0.05 * (idx + 1))) % 60;

          return (
            <div key={item.number} className="relative w-full">
              {/* Full-bleed visual container */}
              <div className="relative h-[65vh] md:h-[80vh] w-full overflow-hidden bg-[#060606]">
                <img
                  src={item.frameSrc}
                  alt={item.title}
                  className="w-full h-full object-cover object-center opacity-85 transition-transform duration-1000 ease-out will-change-transform scale-105"
                  style={{
                    transform: `translateY(${parallaxTranslate}px) scale(1.05)`,
                  }}
                  loading="lazy"
                />
                
                {/* Vignette gradients to blend seamlessly into #060606 */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-transparent to-[#060606] pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#060606]/80 via-transparent to-[#060606]/80 pointer-events-none" />

                {/* Corner hairline marks */}
                <div className="absolute top-8 left-8 md:left-16 pointer-events-none font-mono text-[10px] uppercase tracking-widest text-parchment-55">
                  <span className="text-brass">FIG. {item.number}</span> — {item.material}
                </div>
                <div className="absolute top-8 right-8 md:right-16 pointer-events-none font-mono text-[10px] uppercase tracking-widest text-parchment-25 hidden sm:block">
                  {item.tolerance}
                </div>

                {/* Floating Editorial Description Card (Dark minimal, no glassmorphism) */}
                <div
                  className={`absolute bottom-8 md:bottom-16 ${
                    idx % 2 === 0
                      ? "left-6 md:left-16 lg:left-24"
                      : "right-6 md:right-16 lg:right-24 md:text-right"
                  } max-w-lg bg-[#060606]/95 border border-[#EDE8E0]/10 p-6 md:p-8`}
                >
                  <div className="text-[10px] uppercase tracking-[0.25em] text-brass mb-2 font-mono">
                    {item.subtitle}
                  </div>
                  <h3 className="font-serif text-2xl md:text-3xl text-parchment-90 font-light mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-parchment-55 font-sans font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
