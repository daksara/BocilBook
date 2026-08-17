import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { AtSign, Globe, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-3">
            <Logo />
            <p className="max-w-xs text-sm text-muted-foreground">
              Bikin buku anak dengan AI. Workbook, activity book, dan lembar belajar siap cetak dalam hitungan menit.
            </p>
            <div className="mt-2 flex items-center gap-3 text-muted-foreground">
              <Globe className="size-4" />
              <AtSign className="size-4" />
              <Mail className="size-4" />
            </div>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <span className="font-display font-semibold text-foreground">Produk</span>
            <Link href="/create" className="text-muted-foreground hover:text-foreground">Buat Buku</Link>
            <Link href="/templates" className="text-muted-foreground hover:text-foreground">Template</Link>
            <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <span className="font-display font-semibold text-foreground">Perusahaan</span>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Tentang Kami</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Blog</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Kontak</Link>
          </div>

          <div className="flex flex-col gap-3 text-sm">
            <span className="font-display font-semibold text-foreground">Legal</span>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Kebijakan Privasi</Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">Syarat Layanan</Link>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} BocilBook. Semua hak dilindungi.</span>
          <span>Dibuat dengan ❤ untuk orang tua & guru di Indonesia.</span>
        </div>
      </div>
    </footer>
  );
}
