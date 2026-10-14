"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowDown, Check, SlidersHorizontal } from "lucide-react";

const TOTAL_FRAMES = 362;

function getFrameUrl(index: number) {
  const pad = String(index).padStart(4, "0");
  return `/frames/frame-${pad}.jpg`;
}

// Linear interpolation
function lerp(start: number, end: number, factor: number) {
  return start + (end - start) * factor;
}

// Smooth step calculation for overlays
function getRangeOpacity(progress: number, start: number, fadeInEnd: number, fadeOutStart: number, end: number) {
  if (progress < start || progress > end) return 0;
  if (progress >= fadeInEnd && progress <= fadeOutStart) return 1;
  if (progress < fadeInEnd) {
    return Math.max(0, Math.min(1, (progress - start) / (fadeInEnd - start)));
  }
  return Math.max(0, Math.min(1, (end - progress) / (end - fadeOutStart)));
}

export default function HeroCanvasScrubber() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Animation & Frame tracking
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const framesCacheRef = useRef<(HTMLImageElement | null)[]>([]);
  const isReducedMotionRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const lastDisplayUpdateRef = useRef(0);
  const loadedCountRef = useRef(0);

  // Component state
  const [loadedCount, setLoadedCount] = useState(0);
  const [initialFrameReady, setInitialFrameReady] = useState(false);
  const [displayProgress, setDisplayProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => {
      setReducedMotion(mq.matches);
      isReducedMotionRef.current = mq.matches;
    };
    updateMotion();
    mq.addEventListener("change", updateMotion);
    return () => mq.removeEventListener("change", updateMotion);
  }, []);

  // Nearest frame search helper
  const getNearestFrame = useCallback((targetIndex: number) => {
    const cache = framesCacheRef.current;
    if (cache[targetIndex]) return cache[targetIndex];

    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const right = targetIndex + offset;
      if (right <= TOTAL_FRAMES && cache[right]) return cache[right];
      const left = targetIndex - offset;
      if (left >= 1 && cache[left]) return cache[left];
    }
    return null;
  }, []);

  // Canvas drawing routine
  const renderFrame = useCallback((progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;

    // Background is exact pure #060606 to seamlessly blend
    ctx.fillStyle = "#060606";
    ctx.fillRect(0, 0, w, h);

    const frameIdx = Math.max(1, Math.min(TOTAL_FRAMES, Math.round(progress * (TOTAL_FRAMES - 1)) + 1));
    const img = getNearestFrame(frameIdx);

    if (img && img.complete && img.naturalWidth > 0) {
      const imgW = img.naturalWidth || 1920;
      const imgH = img.naturalHeight || 1080;
      const imgRatio = imgW / imgH;
      const canvasRatio = w / h;

      let drawW: number, drawH: number, drawX: number, drawY: number;

      if (canvasRatio > imgRatio) {
        drawH = h;
        drawW = h * imgRatio;
        drawX = (w - drawW) / 2;
        drawY = 0;
      } else {
        drawW = w;
        drawH = w / imgRatio;
        drawX = 0;
        drawY = (h - drawH) / 2;
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";
      ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }
  }, [getNearestFrame]);

  // Handle Resize and DPR (cap DPR to 1.5 to save massive GPU fill-rate on laptop displays)
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rect = canvas.getBoundingClientRect();
    const newW = Math.round(rect.width * dpr);
    const newH = Math.round(rect.height * dpr);

    if (canvas.width !== newW || canvas.height !== newH) {
      canvas.width = newW;
      canvas.height = newH;
    }
    renderFrame(currentProgressRef.current);
  }, [renderFrame]);

  useEffect(() => {
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Frame loading pipeline (Compressed HTMLImageElement caching + progressive batches)
  useEffect(() => {
    framesCacheRef.current = new Array(TOTAL_FRAMES + 1).fill(null);
    loadedCountRef.current = 0;
    let isCancelled = false;

    function fetchAndDecode(index: number): Promise<void> {
      if (isCancelled || framesCacheRef.current[index]) return Promise.resolve();
      const url = getFrameUrl(index);
      return new Promise((resolve) => {
        const img = new Image();
        img.src = url;

        const onDone = () => {
          if (isCancelled) return resolve();
          framesCacheRef.current[index] = img;
          loadedCountRef.current++;

          // Throttle React state updates so we don't trigger 362 renders (updates every ~5%)
          if (
            loadedCountRef.current % 18 === 0 ||
            loadedCountRef.current === TOTAL_FRAMES
          ) {
            setLoadedCount(loadedCountRef.current);
          }

          if (index === 1) {
            setInitialFrameReady(true);
            renderFrame(currentProgressRef.current);
          }
          resolve();
        };

        if (typeof img.decode === "function") {
          img.decode().then(onDone).catch(onDone);
        } else {
          (img as HTMLImageElement).onload = onDone;
          (img as HTMLImageElement).onerror = onDone;
        }
      });
    }

    async function loadAllFrames() {
      // 1. First priority: Frame 1 immediately
      await fetchAndDecode(1);

      // 2. Second priority: Keyframes every 6th frame for coarse responsive scrub
      const keyframes: number[] = [];
      for (let i = 2; i <= TOTAL_FRAMES; i += 6) {
        keyframes.push(i);
      }
      for (const k of keyframes) {
        if (isCancelled) return;
        await fetchAndDecode(k);
      }

      // 3. Third priority: All remaining frames in batches of 8 with 16ms event loop yield
      const remaining: number[] = [];
      for (let i = 2; i <= TOTAL_FRAMES; i++) {
        if (!framesCacheRef.current[i]) remaining.push(i);
      }

      const BATCH_SIZE = 8;
      for (let i = 0; i < remaining.length; i += BATCH_SIZE) {
        if (isCancelled) return;
        const batch = remaining.slice(i, i + BATCH_SIZE);
        await Promise.all(batch.map((idx) => fetchAndDecode(idx)));
        // Yield to browser event loop to guarantee zero frame drops during scroll
        await new Promise((r) => setTimeout(r, 16));
      }
    }

    loadAllFrames();

    return () => {
      isCancelled = true;
    };
  }, [renderFrame]);

  // Main scroll calculation & On-Demand Lerp animation loop (Sleeps when idle!)
  useEffect(() => {
    let lastRenderedProgress = -1;

    const animate = (timestamp: number) => {
      if (isReducedMotionRef.current) {
        currentProgressRef.current = targetProgressRef.current;
      } else {
        const diff = targetProgressRef.current - currentProgressRef.current;
        if (Math.abs(diff) > 0.0002) {
          currentProgressRef.current = lerp(currentProgressRef.current, targetProgressRef.current, 0.12);
        } else {
          currentProgressRef.current = targetProgressRef.current;
        }
      }

      // Only draw if progress actually moved
      if (Math.abs(currentProgressRef.current - lastRenderedProgress) > 0.0001) {
        renderFrame(currentProgressRef.current);
        lastRenderedProgress = currentProgressRef.current;
      }

      // Throttle display progress updates to ~30fps for UI overlay React renders
      if (timestamp - lastDisplayUpdateRef.current > 32) {
        setDisplayProgress(currentProgressRef.current);
        lastDisplayUpdateRef.current = timestamp;
      }

      // Continue animation only if not yet reached target
      const remaining = Math.abs(targetProgressRef.current - currentProgressRef.current);
      if (remaining > 0.0002) {
        rafIdRef.current = requestAnimationFrame(animate);
      } else {
        // Snapped to exact position: final display update & stop loop!
        currentProgressRef.current = targetProgressRef.current;
        renderFrame(currentProgressRef.current);
        setDisplayProgress(currentProgressRef.current);
        isAnimatingRef.current = false;
        rafIdRef.current = null;
      }
    };

    const requestTick = () => {
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true;
        rafIdRef.current = requestAnimationFrame(animate);
      }
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableDist = rect.height - window.innerHeight;
      if (scrollableDist <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollableDist));
      targetProgressRef.current = progress;
      requestTick();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      isAnimatingRef.current = false;
    };
  }, [renderFrame]);

  // Calculate narrative overlays opacities
  // Stage 1 (0-20%): Terpasang utuh
  const opacity1 = getRangeOpacity(displayProgress, 0.0, 0.0, 0.15, 0.22);
  // Stage 2 (20-45%): Susunan lensa terpisah
  const opacity2 = getRangeOpacity(displayProgress, 0.20, 0.26, 0.40, 0.46);
  // Stage 3 (45-75%): Rana dan sensor terekspos
  const opacity3 = getRangeOpacity(displayProgress, 0.45, 0.51, 0.69, 0.76);
  // Stage 4 (75-100%): Terurai penuh & CTA
  const opacity4 = getRangeOpacity(displayProgress, 0.74, 0.81, 1.0, 1.0);

  const currentFrameNumber = Math.max(
    1,
    Math.min(TOTAL_FRAMES, Math.round(displayProgress * (TOTAL_FRAMES - 1)) + 1)
  );

  return (
    <div
      id="kamera-narrative"
      ref={containerRef}
      className="relative w-full bg-[#060606]"
      style={{ height: "380vh" }}
    >
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#060606]">
        
        {/* Render Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain pointer-events-none select-none"
        />

        {/* Ambient Loading indicator (only subtle at top-right while warming up) */}
        {loadedCount < TOTAL_FRAMES && (
          <div className="absolute top-20 right-6 md:right-12 z-20 pointer-events-none text-right">
            <span className="font-mono text-[10px] tracking-widest uppercase text-brass/70">
              BUFFERING {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
            </span>
            <div className="w-16 h-[1px] bg-parchment-10 mt-1 overflow-hidden">
              <div
                className="h-full bg-brass transition-all duration-300"
                style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Quiet Telemetry / Technical readout on bottom left */}
        <div className="absolute bottom-6 left-6 md:left-12 z-20 pointer-events-none hidden sm:flex items-center space-x-6 text-[11px] font-mono tracking-widest text-parchment-25 uppercase">
          <span>AXIS : 0.00° / EXP-Z</span>
          <span className="text-brass/60">FRAME : {String(currentFrameNumber).padStart(4, "0")} / {TOTAL_FRAMES}</span>
          <span>CHASSIS : TITANIUM GR.5</span>
        </div>

        {/* Scroll cue at stage 1 */}
        {opacity1 > 0.4 && (
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center transition-opacity duration-700"
            style={{ opacity: opacity1 }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-parchment-55 mb-2 font-sans">
              Gulir untuk Mengurai
            </span>
            <ArrowDown className="w-3.5 h-3.5 text-brass animate-pulse" />
          </div>
        )}

        {/* Reduced Motion Toggle Button */}
        <button
          onClick={() => {
            const next = !reducedMotion;
            setReducedMotion(next);
            isReducedMotionRef.current = next;
          }}
          className="absolute bottom-6 right-6 md:right-12 z-30 text-[10px] uppercase tracking-widest font-sans text-parchment-55 hover:text-brass flex items-center space-x-1.5 transition-colors duration-300 bg-[#060606]/40 px-2.5 py-1.5 border border-[#EDE8E0]/10"
          title="Toggle mode gerakan tenang"
        >
          <SlidersHorizontal className="w-3 h-3" />
          <span className="hidden md:inline">
            {reducedMotion ? "Animasi : Statis" : "Animasi : Interaktif"}
          </span>
        </button>

        {/* ============================================================ */}
        {/* NARRATIVE OVERLAYS (Bergantian sisi, fade in/out sesuai scroll) */}
        {/* ============================================================ */}

        {/* STAGE 1: Terpasang Utuh (0 - 20%) - Tengah */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: opacity1,
            transform: `translateY(${(1 - opacity1) * 15}px)`,
          }}
        >
          <p className="text-xs uppercase tracking-[0.35em] text-brass mb-3 font-sans">
            Maison d&apos;Optique — Edisi Terbatas
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-parchment-90 font-light mb-4">
            Hectro One
          </h1>
          <p className="font-serif italic text-lg md:text-2xl text-parchment-55 max-w-lg font-normal">
            &ldquo;Cahaya, tanpa tabir.&rdquo;
          </p>
          <div className="w-12 h-[1px] bg-brass/40 mt-6" />
        </div>

        {/* STAGE 2: Susunan Lensa Terpisah (20 - 45%) - Kiri pada desktop, bawah-tengah pada mobile */}
        <div
          className="absolute inset-x-6 md:left-16 lg:left-24 top-auto bottom-16 md:top-1/2 md:bottom-auto md:-translate-y-1/2 max-w-md pointer-events-none text-center md:text-left transition-opacity duration-300"
          style={{
            opacity: opacity2,
            transform: `translateY(${(1 - opacity2) * 20}px)`,
          }}
        >
          <div className="inline-block text-[11px] uppercase tracking-[0.28em] text-brass mb-2 font-mono">
            01 / Elemen Optik Murni
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-parchment-90 font-light leading-tight mb-4">
            Formula optik tanpa rahasia.
          </h2>
          <p className="text-sm md:text-base text-parchment-55 leading-relaxed font-sans font-light">
            Tujuh belas elemen kaca optik hasil gerinda tangan dalam dua belas kelompok, 
            berpadu bilah diafragma presisi mikro yang memotong difraksi hingga celah terkecil.
          </p>
          <div className="mt-4 flex items-center justify-center md:justify-start space-x-4 text-xs font-mono text-parchment-55">
            <span>FLANGE : 16.0 MM</span>
            <span className="text-brass">•</span>
            <span>APERTURE : 11 BLADES</span>
          </div>
        </div>

        {/* STAGE 3: Rana & Sensor Terekspos (45 - 75%) - Kanan pada desktop, bawah-tengah pada mobile */}
        <div
          className="absolute inset-x-6 md:right-16 lg:right-24 md:left-auto top-auto bottom-16 md:top-1/2 md:bottom-auto md:-translate-y-1/2 max-w-md pointer-events-none text-center md:text-right transition-opacity duration-300"
          style={{
            opacity: opacity3,
            transform: `translateY(${(1 - opacity3) * 20}px)`,
          }}
        >
          <div className="inline-block text-[11px] uppercase tracking-[0.28em] text-brass mb-2 font-mono">
            02 / Presisi Mekanis & Sensor
          </div>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-parchment-90 font-light leading-tight mb-4">
            812 komponen. Nol jalan pintas.
          </h2>
          <p className="text-sm md:text-base text-parchment-55 leading-relaxed font-sans font-light">
            Rana mekanis tirai serat karbon dengan siklus redaman magnetik, sensor full-frame 
            tanpa filter low-pass, dan kontak transmisi sinyal berlapis emas 24-karat murni.
          </p>
          <div className="mt-4 flex items-center justify-center md:justify-end space-x-4 text-xs font-mono text-parchment-55">
            <span>SHUTTER : 1/16,000s</span>
            <span className="text-brass">•</span>
            <span>CONTACTS : 24K AU</span>
          </div>
        </div>

        {/* STAGE 4: Terurai Penuh (75 - 100%) - Bawah Tengah & CTA Tenang */}
        <div
          className="absolute inset-x-6 bottom-16 md:bottom-20 max-w-2xl mx-auto text-center pointer-events-auto transition-opacity duration-300"
          style={{
            opacity: opacity4,
            transform: `translateY(${(1 - opacity4) * 20}px)`,
          }}
        >
          <div className="inline-block text-[11px] uppercase tracking-[0.3em] text-brass mb-3 font-mono">
            03 / Integritas Atelier
          </div>
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl text-parchment-90 font-light leading-tight mb-4">
            Dirakit satu teknisi ahli, dari awal sampai akhir.
          </h2>
          <p className="text-sm md:text-base text-parchment-55 max-w-xl mx-auto mb-8 font-sans font-light leading-relaxed">
            Setiap sasis titanium dibubut dari balok padat tunggal dan dikalibrasi secara individual selama 48 jam sebelum diberi nomor seri permanen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById("reservasi");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-8 py-3.5 border border-brass text-parchment-90 bg-brass/10 hover:bg-brass hover:text-[#060606] transition-all duration-500 font-sans text-xs uppercase tracking-[0.25em]"
            >
              Reservasi Milik Anda
            </button>
            <button
              onClick={() => {
                const el = document.getElementById("spesifikasi");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-6 py-3.5 border border-parchment-10 text-parchment-55 hover:text-parchment-90 hover:border-parchment-25 transition-all duration-500 font-sans text-xs uppercase tracking-[0.25em]"
            >
              Lembar Spesifikasi
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
