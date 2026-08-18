"use client";

import { AppShell } from "@/components/dashboard/app-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_USER } from "@/lib/data/mock-user";
import { AI_LIMITS } from "@/lib/data/ai-limits";
import { ArrowUpRight, Sparkles } from "lucide-react";

const initials = MOCK_USER.name
  .split(" ")
  .map((p) => p[0])
  .slice(0, 2)
  .join("");

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-extrabold sm:text-3xl">Settings</h1>
          <p className="mt-1 text-muted-foreground">Kelola profil, limit AI, dan preferensi akunmu.</p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="ai-limits">Limit AI</TabsTrigger>
            <TabsTrigger value="preferences">Preferensi</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border/70 bg-card p-6">
              <div className="mb-5 flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarFallback className="text-lg">{initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-display text-lg font-bold">{MOCK_USER.name}</p>
                  <Badge variant="outline" className="mt-1 capitalize">{MOCK_USER.plan} plan</Badge>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="name">Nama Lengkap</Label>
                  <Input id="name" defaultValue={MOCK_USER.name} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={MOCK_USER.email} />
                </div>
              </div>
              <div className="mt-5">
                <Button>Simpan Perubahan</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai-limits" className="flex flex-col gap-6">
            <p className="text-sm text-muted-foreground">
              BocilBook memakai Groq sebagai penulis teks utama dan Gemini sebagai cadangan (lihat{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">src/lib/ai/llm/index.ts</code>). Ini limit tier gratis
              masing-masing — kalau limit tercapai, request otomatis jatuh ke provider berikutnya, lalu ke generator mock
              deterministik supaya buku tetap bisa dibuat.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {AI_LIMITS.map((p) => (
                <div key={p.id} className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 font-display font-bold">
                      <Sparkles className="size-4 text-primary" /> {p.name}
                    </span>
                    <Badge variant={p.role === "Utama" ? "default" : "outline"}>{p.role}</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">Model: {p.model}</span>
                  <dl className="grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-xl bg-muted/60 p-2.5">
                      <dt className="text-[11px] text-muted-foreground">Req/menit</dt>
                      <dd className="font-display text-lg font-extrabold">{p.requestsPerMinute}</dd>
                    </div>
                    <div className="rounded-xl bg-muted/60 p-2.5">
                      <dt className="text-[11px] text-muted-foreground">Req/hari</dt>
                      <dd className="font-display text-lg font-extrabold">{p.requestsPerDay.toLocaleString("id-ID")}</dd>
                    </div>
                    <div className="rounded-xl bg-muted/60 p-2.5">
                      <dt className="text-[11px] text-muted-foreground">Token/menit</dt>
                      <dd className="font-display text-lg font-extrabold">{p.tokensPerMinute.toLocaleString("id-ID")}</dd>
                    </div>
                  </dl>
                  <a
                    href={p.docsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    Cek limit terbaru di dokumentasi {p.name} <ArrowUpRight className="size-3" />
                  </a>
                </div>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">
              Angka di atas mengikuti dokumentasi resmi masing-masing provider dan bisa berubah sewaktu-waktu — cek link di
              atas untuk angka yang berlaku di akunmu.
            </p>
          </TabsContent>

          <TabsContent value="preferences" className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border/70 bg-card p-6">
              <h3 className="mb-4 font-display font-bold">Bahasa &amp; Wilayah</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label>Bahasa Default</Label>
                  <Select defaultValue="id">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">Bahasa Indonesia</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator className="my-5" />
              <h3 className="mb-4 font-display font-bold">Notifikasi</h3>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Email saat generation selesai</p>
                    <p className="text-xs text-muted-foreground">Dapatkan notifikasi saat buku selesai dibuat AI</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Tips &amp; update produk</p>
                    <p className="text-xs text-muted-foreground">Info fitur baru dan template mingguan</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
