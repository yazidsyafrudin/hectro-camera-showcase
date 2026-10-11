"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-[#060606]/85 backdrop-blur-md border-b border-[#EDE8E0]/10 py-4"
          : "bg-transparent border-b border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Wordmark */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group text-left focus:outline-none"
        >
          <span className="font-serif text-xl md:text-2xl tracking-[0.25em] uppercase text-parchment-90 group-hover:text-brass transition-colors duration-500">
            Hectro
          </span>
          <span className="block text-[9px] uppercase tracking-[0.35em] text-parchment-55 mt-0.5 font-sans">
            Maison d&apos;Optique
          </span>
        </button>

        {/* Navigation links */}
        <nav className="flex items-center space-x-6 md:space-x-12">
          <button
            onClick={() => scrollTo("kamera-narrative")}
            className="text-xs uppercase tracking-[0.22em] text-parchment-55 hover:text-parchment-90 transition-colors duration-300 font-sans"
          >
            Kamera
          </button>
          <button
            onClick={() => scrollTo("spesifikasi")}
            className="text-xs uppercase tracking-[0.22em] text-parchment-55 hover:text-parchment-90 transition-colors duration-300 font-sans"
          >
            Optik
          </button>
          <button
            onClick={() => scrollTo("craftsmanship")}
            className="hidden sm:inline-block text-xs uppercase tracking-[0.22em] text-parchment-55 hover:text-parchment-90 transition-colors duration-300 font-sans"
          >
            Atelier
          </button>
          <button
            onClick={() => scrollTo("reservasi")}
            className="text-xs uppercase tracking-[0.22em] text-brass hover:text-brass-glow transition-colors duration-300 font-sans relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[1px] after:bg-brass/40"
          >
            Reservasi
          </button>
        </nav>
      </div>
    </header>
  );
}
