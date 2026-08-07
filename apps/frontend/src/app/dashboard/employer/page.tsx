"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Plus, TrendingUp, Users, DollarSign, LogOut, X, AlertCircle } from "lucide-react";
import Link from "next/link";

/* ─── New Stream Modal ───────────────────────────── */
function NewStreamModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ worker: "", monthly: "", weeks: "4" });
  const monthly = Number(form.monthly) || 0;
  const weeks = Number(form.weeks) || 4;
  const total = (monthly / 30) * (weeks * 7);
  const ratePerSec = total / (weeks * 7 * 86400);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass rounded-3xl w-full max-w-lg border border-white/10">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h3 className="text-lg font-bold">Create New Stream</h3>
          <button onClick={onClose} className="text-[#64748B] hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs text-[#64748B] font-medium mb-2">Worker Stellar Address or Passkey ID</label>
            <input
              value={form.worker}
              onChange={e => setForm(f => ({ ...f, worker: e.target.value }))}
              placeholder="GABCDEF123... or passkey:user@example.com"
              className="w-full glass-light border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#475569] focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#64748B] font-medium mb-2">Monthly Salary (USDC)</label>
              <input
                type="number"
                value={form.monthly}
                onChange={e => setForm(f => ({ ...f, monthly: e.target.value }))}
                placeholder="3000"
                className="w-full glass-light border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-[#475569] focus:outline-none focus:border-purple-500/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-[#64748B] font-medium mb-2">Stream Duration (weeks)</label>
              <select
                value={form.weeks}
                onChange={e => setForm(f => ({ ...f, weeks: e.target.value }))}
                className="w-full glass-light border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500/50 transition-colors bg-[#131629]"
              >
                {[2, 4, 8, 12, 24, 52].map(w => <option key={w} value={w}>{w} weeks</option>)}
              </select>
            </div>
          </div>

          {/* Preview card */}
          {monthly > 0 && (
            <div className="glass-light rounded-2xl p-5 border border-purple-500/15">
              <p className="text-xs text-[#7C3AED] font-semibold uppercase tracking-wider mb-4">Stream Preview</p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { l: "Total Deposit", v: `$${total.toFixed(2)}`, c: "text-white" },
                  { l: "Rate / Second", v: `$${ratePerSec.toFixed(7)}`, c: "text-[#A78BFA]" },
                  { l: "Duration", v: `${weeks}w`, c: "text-cyan-400" },
                ].map(({ l, v, c }) => (
                  <div key={l} className="text-center">
                    <p className={`text-sm font-bold ticker ${c}`}>{v}</p>
                    <p className="text-xs text-[#475569] mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 flex items-start gap-3">
            <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-300">Funds are locked non-custodially in the Soroban vault. Unstreamed capital can be clawed back if the stream is cancelled.</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 glass-light border border-white/5 text-white font-semibold py-3 rounded-xl hover:bg-white/10 transition-colors">
              Cancel
            </button>
            <button
              disabled={!form.worker || !form.monthly}
              className="flex-1 gradient-purple glow-purple text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40"
            >
              Fund & Launch Stream
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Data ───────────────────────────────────────── */
const workers = [
  { id: "W-001", name: "Amara O.", address: "GABCD...1234", rate: "$0.001157/s", accrued: "$1,247.52", total: "$3,000", status: "Streaming", pct: 60 },
  { id: "W-002", name: "Daniel K.", address: "GEFGH...5678", rate: "$0.002314/s", accrued: "$3,108.00", total: "$6,000", status: "Streaming", pct: 52 },
  { id: "W-003", name: "Priya M.", address: "GIJKL...9012", rate: "$0.000579/s", accrued: "$750.00", total: "$1,500", status: "Paused", pct: 50 },
];

export default function EmployerDashboard() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const totalVault = 10500;
  const totalActive = 2;
  const monthlyBurn = 9000;

  return (
    <div className="min-h-screen bg-[#0B0D1A]">
      {/* Header */}
      <header className="glass border-b border-white/5 px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 font-bold text-base">
          <div className="w-7 h-7 gradient-purple rounded-lg flex items-center justify-center glow-purple">
            <Zap className="w-4 h-4 text-white" />
          </div>
          PulsePay
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 glass-light border border-white/5 rounded-full px-3 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-[#94A3B8]">Soroban Testnet</span>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="gradient-purple glow-purple text-white text-xs font-semibold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> New Stream
          </button>
          <div className="w-8 h-8 gradient-purple rounded-full flex items-center justify-center text-white font-bold text-sm">E</div>
          <button onClick={() => router.push("/")} className="flex items-center gap-1.5 text-xs text-[#64748B] hover:text-white transition-colors">
            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Overview cards */}
        <div className="grid sm:grid-cols-3 gap-5 mb-10">
          {[
            { icon: DollarSign, label: "Vault Balance", value: `$${totalVault.toLocaleString()}`, sub: "USDC locked", color: "text-[#A78BFA]", bg: "bg-purple-500/10" },
            { icon: TrendingUp, label: "Monthly Burn Rate", value: `$${monthlyBurn.toLocaleString()}`, sub: "Total payroll", color: "text-cyan-400", bg: "bg-cyan-500/10" },
            { icon: Users, label: "Active Workers", value: `${totalActive}`, sub: "Streaming now", color: "text-emerald-400", bg: "bg-emerald-500/10" },
          ].map(({ icon: Icon, label, value, sub, color, bg }) => (
            <div key={label} className="glass rounded-2xl p-6 border border-white/5">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-4`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <p className="text-xs text-[#64748B] mb-1">{label}</p>
              <p className={`text-3xl font-extrabold ticker ${color}`}>{value}</p>
              <p className="text-xs text-[#475569] mt-1">{sub}</p>
            </div>
          ))}
        </div>

        {/* Worker roster table */}
        <div className="glass rounded-2xl border border-white/5 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
            <h2 className="font-bold text-lg">Active Worker Roster</h2>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors font-medium"
            >
              <Plus className="w-4 h-4" /> Add Worker
            </button>
          </div>

          {/* Desktop table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  {["Worker", "Address", "Rate", "Accrued", "Total", "Progress", "Status", "Actions"].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-[#475569] uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {workers.map((w) => (
                  <tr key={w.id} className="border-b border-white/5 hover:bg-white/2 transition-colors last:border-0">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 gradient-purple rounded-full flex items-center justify-center text-white font-bold text-xs">
                          {w.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{w.name}</p>
                          <p className="text-xs text-[#475569]">{w.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-[#64748B] font-mono">{w.address}</td>
                    <td className="px-5 py-4 text-sm font-semibold ticker text-[#A78BFA] whitespace-nowrap">{w.rate}</td>
                    <td className="px-5 py-4 text-sm font-semibold ticker text-emerald-400">{w.accrued}</td>
                    <td className="px-5 py-4 text-sm ticker text-[#64748B]">{w.total}</td>
                    <td className="px-5 py-4 min-w-[100px]">
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full gradient-purple rounded-full" style={{ width: `${w.pct}%` }} />
                      </div>
                      <p className="text-xs text-[#475569] mt-1">{w.pct}%</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        w.status === "Streaming"
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                          : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${w.status === "Streaming" ? "bg-emerald-400 animate-pulse" : "bg-yellow-400"}`} />
                        {w.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-xs text-[#64748B] hover:text-red-400 transition-colors font-medium">Cancel</button>
                        <span className="text-[#2D2F4A]">·</span>
                        <button className="text-xs text-[#64748B] hover:text-cyan-400 transition-colors font-medium">Clawback</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {showModal && <NewStreamModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
