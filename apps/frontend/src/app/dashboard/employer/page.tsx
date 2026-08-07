"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, LogOut, Plus, DollarSign, TrendingUp, Users, X, AlertCircle, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/theme";
import Link from "next/link";

/* ── New Stream Modal ───────────────────────────── */
function NewStreamModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ worker: "", monthly: "", weeks: "4" });
  const monthly = Number(form.monthly) || 0;
  const weeks   = Number(form.weeks) || 4;
  const totalDays = weeks * 7;
  const total     = (monthly / 30) * totalDays;
  const ratePerSec = total / (totalDays * 86400);
  const valid = form.worker.length > 5 && monthly > 0;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-end sm:items-center justify-center z-50 p-4">
      <div className="card w-full max-w-lg rounded-4xl border-subtle animate-slide-in-right shadow-lift overflow-hidden">
        <div className="flex items-center justify-between px-7 py-5 border-b border-subtle">
          <div>
            <p className="label-xs text-ink-400 mb-0.5">New Payroll Stream</p>
            <h3 className="text-lg font-bold text-[var(--fg)]">Create Stream</h3>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--fg-muted)] hover:bg-[var(--surface-2)] transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-7 space-y-5">
          <div>
            <label className="label-xs block mb-2">Worker Address or Passkey ID</label>
            <input
              value={form.worker}
              onChange={e => setForm(f => ({ ...f, worker: e.target.value }))}
              placeholder="GABCDEF123... or passkey:user@example.com"
              className="w-full bg-[var(--surface-2)] border border-subtle rounded-2xl px-4 py-3 text-sm text-[var(--fg)] placeholder-[var(--fg-faint)] focus:outline-none focus:border-ink-500/50 transition-colors font-mono"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-xs block mb-2">Monthly Salary (USDC)</label>
              <input
                type="number"
                value={form.monthly}
                onChange={e => setForm(f => ({ ...f, monthly: e.target.value }))}
                placeholder="3000"
                className="w-full bg-[var(--surface-2)] border border-subtle rounded-2xl px-4 py-3 text-sm text-[var(--fg)] placeholder-[var(--fg-faint)] focus:outline-none focus:border-ink-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="label-xs block mb-2">Duration</label>
              <select
                value={form.weeks}
                onChange={e => setForm(f => ({ ...f, weeks: e.target.value }))}
                className="w-full bg-[var(--surface-2)] border border-subtle rounded-2xl px-4 py-3 text-sm text-[var(--fg)] focus:outline-none focus:border-ink-500/50 transition-colors appearance-none cursor-pointer"
              >
                {[2,4,8,12,24,52].map(w => (
                  <option key={w} value={w}>{w} weeks</option>
                ))}
              </select>
            </div>
          </div>

          {/* Live preview */}
          {monthly > 0 && (
            <div className="relative rounded-3xl bg-[var(--surface-2)] border border-subtle p-5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-radial from-ink-500/8 via-transparent to-transparent pointer-events-none" />
              <p className="label-xs text-ink-400 mb-4">Stream Preview</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { l: "Total Deposit", v: `$${total.toFixed(2)}`, c: "text-[var(--fg)]" },
                  { l: "Per Second",    v: `$${ratePerSec.toFixed(7)}`, c: "grad-brand-text" },
                  { l: "Duration",      v: `${weeks}w / ${totalDays}d`, c: "text-jade-400" },
                ].map(({ l, v, c }) => (
                  <div key={l} className="text-center">
                    <p className={`text-mono text-sm font-bold ${c} leading-snug`}>{v}</p>
                    <p className="text-[10px] text-[var(--fg-faint)] mt-1.5 uppercase tracking-wide">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-gold-500/8 border border-gold-500/20 rounded-2xl px-4 py-3 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-gold-300 leading-relaxed">Funds are locked non-custodially in the Soroban vault. Unstreamed capital can be clawed back at any time.</p>
          </div>

          <div className="flex gap-3 pt-1">
            <button onClick={onClose} className="flex-1 bg-[var(--surface-2)] text-[var(--fg)] font-semibold py-3.5 rounded-2xl hover:bg-[var(--surface-3)] transition-colors text-sm">
              Cancel
            </button>
            <button
              disabled={!valid}
              className="flex-1 grad-brand glow-ink text-white font-semibold py-3.5 rounded-2xl hover:opacity-90 interactive disabled:opacity-40 text-sm"
            >
              Fund & Launch →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Workers data ───────────────────────────────── */
const workers = [
  { id: "W-001", name: "Amara O.",  addr: "GABCD…1234", rate: "$0.001157/s", accrued: "$1,247.52", total: "$3,000", status: "Streaming", pct: 63, color: "from-ink-600 to-ink-400" },
  { id: "W-002", name: "Daniel K.", addr: "GEFGH…5678", rate: "$0.002314/s", accrued: "$3,108.00", total: "$6,000", status: "Streaming", pct: 52, color: "from-violet-700 to-violet-400" },
  { id: "W-003", name: "Priya M.",  addr: "GIJKL…9012", rate: "$0.000579/s", accrued: "$750.00",   total: "$1,500", status: "Paused",    pct: 50, color: "from-slate-600 to-slate-400" },
];

const overview = [
  { icon: DollarSign, label: "Vault Balance",      value: "$10,500",  sub: "USDC locked",     color: "text-ink-400",  bg: "bg-ink-500/10"  },
  { icon: TrendingUp, label: "Monthly Burn Rate",  value: "$9,000",   sub: "Total payroll",   color: "text-gold-400", bg: "bg-gold-500/10" },
  { icon: Users,      label: "Active Workers",     value: "2",        sub: "Streaming now",   color: "text-jade-400", bg: "bg-jade-500/10" },
];

/* ── Page ───────────────────────────────────────── */
export default function EmployerDashboard() {
  const router = useRouter();
  const { theme, toggle } = useTheme();
  const [modal, setModal] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--surface-0)]">
      {/* Header */}
      <header className="glass border-b border-subtle px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-base tracking-tight">
          <span className="w-7 h-7 grad-brand rounded-[10px] flex items-center justify-center glow-ink">
            <Zap className="w-4 h-4 text-white" strokeWidth={2.5} />
          </span>
          PulsePay
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-[var(--surface-2)] rounded-full px-3 py-1.5 border border-subtle">
            <span className="w-1.5 h-1.5 rounded-full bg-jade-400 animate-pulse2" />
            <span className="text-xs font-medium text-[var(--fg-muted)]">Soroban Testnet</span>
          </div>
          <button onClick={() => setModal(true)}
            className="grad-brand glow-ink text-white text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 interactive flex items-center gap-1.5">
            <Plus className="w-3.5 h-3.5" /> New Stream
          </button>
          <button onClick={toggle} className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--fg-muted)] hover:bg-[var(--surface-2)] transition-all">
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <div className="w-8 h-8 grad-brand rounded-full flex items-center justify-center text-white font-bold text-sm cursor-default">E</div>
          <button onClick={() => router.push("/")} className="flex items-center gap-1.5 text-xs text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors">
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Overview */}
        <div className="grid sm:grid-cols-3 gap-4">
          {overview.map(({ icon: Icon, label, value, sub, color, bg }) => (
            <div key={label} className="card rounded-3xl p-6 group hover:shadow-card-dark hover:-translate-y-0.5 transition-all">
              <div className={`w-11 h-11 ${bg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="label-xs mb-1.5">{label}</p>
              <p className={`text-mono text-3xl font-bold ${color}`}>{value}</p>
              <p className="text-xs text-[var(--fg-faint)] mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Roster table */}
        <div className="card rounded-4xl overflow-hidden">
          <div className="flex items-center justify-between px-7 py-5 border-b border-subtle">
            <div>
              <p className="label-xs mb-0.5">Workforce</p>
              <h2 className="font-bold text-[var(--fg)] text-lg">Active Worker Roster</h2>
            </div>
            <button
              onClick={() => setModal(true)}
              className="flex items-center gap-2 text-sm text-ink-400 hover:text-ink-300 transition-colors font-semibold"
            >
              <Plus className="w-4 h-4" /> Add Worker
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-subtle">
                  {["Worker", "Address", "Rate", "Accrued", "Total", "Progress", "Status", "Actions"].map(h => (
                    <th key={h} className="px-6 py-3.5 text-left label-xs whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {workers.map(w => (
                  <tr key={w.id} className="border-b border-subtle last:border-0 hover:bg-[var(--surface-2)] transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br ${w.color}`}>
                          {w.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[var(--fg)]">{w.name}</p>
                          <p className="text-xs text-[var(--fg-faint)]">{w.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-mono text-xs text-[var(--fg-muted)]">{w.addr}</td>
                    <td className="px-6 py-4 text-mono text-sm font-semibold grad-brand-text whitespace-nowrap">{w.rate}</td>
                    <td className="px-6 py-4 text-mono text-sm font-bold text-jade-400">{w.accrued}</td>
                    <td className="px-6 py-4 text-mono text-sm text-[var(--fg-muted)]">{w.total}</td>
                    <td className="px-6 py-4 min-w-[100px]">
                      <div className="h-1.5 rounded-full bg-[var(--surface-3)] overflow-hidden mb-1">
                        <div className={`h-full rounded-full bg-gradient-to-r ${w.color}`} style={{ width: `${w.pct}%` }} />
                      </div>
                      <p className="text-xs text-[var(--fg-faint)]">{w.pct}%</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`pill whitespace-nowrap ${w.status === "Streaming" ? "pill-jade" : "pill-gold"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${w.status === "Streaming" ? "bg-jade-400 animate-pulse" : "bg-gold-400"}`} />
                        {w.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-xs font-medium text-[var(--fg-muted)] hover:text-red-400 transition-colors">Cancel</button>
                        <span className="text-[var(--border-color)]">·</span>
                        <button className="text-xs font-medium text-[var(--fg-muted)] hover:text-ink-400 transition-colors">Clawback</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {modal && <NewStreamModal onClose={() => setModal(false)} />}
    </div>
  );
}
