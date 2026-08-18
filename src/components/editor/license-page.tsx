export function LicensePage({ title }: { title: string }) {
  const year = new Date().getFullYear();
  return (
    <div
      className="flex h-full w-full flex-col justify-center gap-6 bg-white px-[10%] py-[10%] text-[#2B2B2B]"
      style={{ aspectRatio: "210 / 297" }}
    >
      <div className="text-center">
        <span className="font-display text-xs font-bold tracking-wide text-black/40 uppercase">Lisensi Penggunaan</span>
        <h1 className="mt-2 font-display text-2xl font-extrabold">{title}</h1>
      </div>

      <div className="flex flex-col gap-4 text-sm leading-relaxed">
        <div>
          <p className="font-display font-bold text-emerald-700">Diperbolehkan</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Mencetak untuk penggunaan pribadi, keluarga, atau kegiatan mengajar.</li>
            <li>Mencetak dan menjual salinan fisiknya (hasil cetak, buku jadi, dan sejenisnya).</li>
          </ul>
        </div>
        <div>
          <p className="font-display font-bold text-red-700">Tidak diperbolehkan</p>
          <ul className="mt-1 list-disc space-y-1 pl-5">
            <li>Membagikan, menjual, atau mendistribusikan ulang file digital ini (PDF atau sumbernya) dalam bentuk apa pun.</li>
            <li>Mengklaim desain ini sebagai karya original untuk dijual kembali sebagai template atau produk digital baru.</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-xs text-black/40">© {year} — Dibuat dengan BocilBook</p>
    </div>
  );
}
