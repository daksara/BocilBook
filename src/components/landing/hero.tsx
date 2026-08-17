"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageRenderer } from "@/components/templates";
import { getSampleBook } from "@/lib/data/sample-book";

export function Hero() {
  const book = getSampleBook();
  const previewPages = [book.pages[0], book.pages[2], book.pages[6], book.pages[11]];

  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 0%, oklch(0.93 0.06 95 / 0.5), transparent), radial-gradient(50% 40% at 90% 10%, oklch(0.82 0.13 165 / 0.35), transparent)",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="flex flex-col items-start gap-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
          >
            <Sparkles className="size-3.5" />
            AI Kids Book Generator
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-4xl leading-[1.08] font-extrabold text-balance sm:text-5xl lg:text-6xl"
          >
            Bikin buku anak
            <br />
            dengan <span className="text-primary">AI.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-lg text-lg text-muted-foreground text-balance"
          >
            BocilBook membantu kamu membuat workbook dan activity book anak secara otomatis dalam hitungan menit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button size="lg" asChild>
              <Link href="/create">
                <Wand2 />
                Buat Buku Sekarang
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#gallery">
                Lihat Contoh
                <ArrowRight />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-4 pt-2 text-sm text-muted-foreground"
          >
            <div className="flex -space-x-2">
              {["bg-brand-coral", "bg-brand-sky", "bg-brand-mint", "bg-brand-violet"].map((c, i) => (
                <span key={i} className={`size-7 rounded-full border-2 border-background ${c}`} />
              ))}
            </div>
            <span>Dipakai 2.000+ orang tua &amp; guru</span>
          </motion.div>
        </div>

        <div className="relative mx-auto h-[420px] w-full max-w-md sm:h-[480px]">
          {previewPages.map((page, i) => {
            const layout = [
              { top: "6%", left: "8%", w: "48%", rot: -8, z: 10, delay: 0.15 },
              { top: "0%", left: "40%", w: "50%", rot: 6, z: 20, delay: 0.3 },
              { top: "38%", left: "2%", w: "46%", rot: 5, z: 15, delay: 0.45 },
              { top: "34%", left: "42%", w: "48%", rot: -5, z: 25, delay: 0.6 },
            ][i];
            return (
              <motion.div
                key={page.id}
                initial={{ opacity: 0, y: 30, rotate: 0, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, rotate: layout.rot, scale: 1 }}
                transition={{ duration: 0.6, delay: layout.delay, ease: "easeOut" }}
                className="absolute animate-float rounded-xl shadow-xl ring-1 ring-black/5"
                style={{
                  top: layout.top,
                  left: layout.left,
                  width: layout.w,
                  zIndex: layout.z,
                  animationDelay: `${i * 0.7}s`,
                }}
              >
                <div className="overflow-hidden rounded-xl">
                  <PageRenderer page={page} style={book.config.style} totalPages={book.pages.length} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
