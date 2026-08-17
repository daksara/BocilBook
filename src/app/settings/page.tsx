"use client";

import { AppShell } from "@/components/dashboard/app-shell";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
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
import { MOCK_CREDIT, MOCK_USER } from "@/lib/data/mock-user";
import { Check, Sparkles } from "lucide-react";

const initials = MOCK_USER.name
  .split(" ")
  .map((p) => p[0])
  .slice(0, 2)
  .join("");

const PLANS = [
  { id: "free", name: "Free", price: "Rp0", credits: "20 kredit/bulan", features: ["Watermark BocilBook", "Export PDF"] },
  { id: "pro", name: "Pro", price: "Rp79rb/bulan", credits: "100 kredit/bulan", features: ["Tanpa watermark", "Export PDF, PNG, ZIP", "Prioritas generation"] },
  { id: "studio", name: "Studio", price: "Rp249rb/bulan", credits: "500 kredit/bulan", features: ["Semua fitur Pro", "Multi anggota tim", "Lisensi komersial"] },
];

export default function SettingsPage() {
  const creditPct = Math.round((MOCK_CREDIT.usedThisMonth / MOCK_CREDIT.monthlyAllowance) * 100);

  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-extrabold sm:text-3xl">Settings</h1>
          <p className="mt-1 text-muted-foreground">Kelola profil, kredit AI, dan preferensi akunmu.</p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profil</TabsTrigger>
            <TabsTrigger value="credits">Kredit AI</TabsTrigger>
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

          <TabsContent value="credits" className="flex flex-col gap-6">
            <div className="rounded-2xl border border-border/70 bg-card p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-display font-bold">
                  <Sparkles className="size-4 text-primary" /> Kredit AI
                </span>
                <span className="font-display text-2xl font-extrabold text-primary">{MOCK_CREDIT.balance}</span>
              </div>
              <Progress value={creditPct} className="mb-2" />
              <p className="text-sm text-muted-foreground">
                {MOCK_CREDIT.usedThisMonth} dari {MOCK_CREDIT.monthlyAllowance} kredit terpakai bulan ini. Reset {new Date(MOCK_CREDIT.resetsAt).toLocaleDateString("id-ID", { day: "numeric", month: "long" })}.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`flex flex-col gap-3 rounded-2xl border p-5 ${plan.id === MOCK_USER.plan ? "border-primary bg-primary/5" : "border-border/70 bg-card"}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold">{plan.name}</span>
                    {plan.id === MOCK_USER.plan && <Badge>Aktif</Badge>}
                  </div>
                  <span className="font-display text-xl font-extrabold">{plan.price}</span>
                  <span className="text-xs text-muted-foreground">{plan.credits}</span>
                  <ul className="flex flex-col gap-1.5 text-sm">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="size-3.5 text-primary" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={plan.id === MOCK_USER.plan ? "outline" : "default"} className="mt-2" disabled={plan.id === MOCK_USER.plan}>
                    {plan.id === MOCK_USER.plan ? "Plan Saat Ini" : "Upgrade"}
                  </Button>
                </div>
              ))}
            </div>
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
