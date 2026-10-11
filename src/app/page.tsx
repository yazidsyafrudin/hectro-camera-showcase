import Navbar from "@/components/Navbar";
import HeroCanvasScrubber from "@/components/HeroCanvasScrubber";
import SpecsSheet from "@/components/SpecsSheet";
import MacroParallax from "@/components/MacroParallax";
import Craftsmanship from "@/components/Craftsmanship";
import ReservationSection from "@/components/ReservationSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#060606] text-parchment selection:bg-brass selection:text-[#060606]">
      {/* Fixed Whisper-Thin Navigation Bar */}
      <Navbar />

      {/* Hero Canvas Scrubber (~380vh scroll with narrative overlays) */}
      <HeroCanvasScrubber />

      {/* Section 2: Lembar Spesifikasi Cetak (Printed Spec Sheet) */}
      <SpecsSheet />

      {/* Section 3: Makrofotografi Parallax Band */}
      <MacroParallax />

      {/* Section 4: Craftsmanship (Dua Kolom Editorial) */}
      <Craftsmanship />

      {/* Section 5: Private Appointment & Reservation Form */}
      <ReservationSection />

      {/* Section 6: Minimal Heritage Footer */}
      <Footer />
    </main>
  );
}
