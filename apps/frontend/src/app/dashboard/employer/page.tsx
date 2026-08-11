"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Plus, DollarSign, TrendingUp, Users, X, AlertCircle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { PulsePayLogo } from "@/components/ui/PulsePayLogo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

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
    <AnimatePresence>
      <div className="fixed inset-0 bg-[var(--bg-sunken)]/80 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="card-base w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-subtle bg-surface-2/50">
            <div>
              <p className="label-xs text-val-blue mb-0.5">New Payroll Stream</p>
              <h3 className="text-lg font-bold text-fg">Create Stream</h3>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-fg-muted hover:bg-surface-3 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            <div>
              <label className="label-xs block mb-1.5 text-fg-muted">Worker Address or Passkey ID</label>
              <input
                value={form.worker}
                onChange={e => setForm(f => ({ ...f, worker: e.target.value }))}
                placeholder="GABCDEF123... or passkey:user@example.com"
                className="w-full bg-surface-0 border border-strong rounded-xl px-4 py-2.5 text-sm text-fg placeholder-fg-faint focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-xs block mb-1.5 text-fg-muted">Monthly Salary (USDC)</label>
                <input
                  type="number"
                  value={form.monthly}
                  onChange={e => setForm(f => ({ ...f, monthly: e.target.value }))}
                  placeholder="3000"
                  className="w-full bg-surface-0 border border-strong rounded-xl px-4 py-2.5 text-sm text-fg placeholder-fg-faint focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all font-mono"
                />
              </div>
              <div>
                <label className="label-xs block mb-1.5 text-fg-muted">Duration</label>
                <select
                  value={form.weeks}
                  onChange={e => setForm(f => ({ ...f, weeks: e.target.value }))}
                  className="w-full bg-surface-0 border border-strong rounded-xl px-4 py-2.5 text-sm text-fg focus:outline-none focus:ring-2 focus:ring-accent/40 transition-all appearance-none cursor-pointer"
                >
                  {[2, 4, 8, 12, 24, 52].map(w => (
                    <option key={w} value={w}>{w} weeks</option>
                  ))}
                </select>
              </div>
            </div>

            {monthly > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="rounded-2xl bg-surface-2 border border-subtle p-4"
              >
                <p className="label-xs text-val-blue mb-3">Stream Calculation</p>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <p className="text-mono text-sm font-bold text-fg">${total.toFixed(2)}</p>
                    <p className="text-[10px] text-fg-muted mt-1 uppercase font-semibold">Total Deposit</p>
                  </div>
                  <div>
                    <p className="text-mono text-sm font-bold text-val-blue">${ratePerSec.toFixed(7)}</p>
                    <p className="text-[10px] text-fg-muted mt-1 uppercase font-semibold">Per Second</p>
                  </div>
                  <div>
                    <p className="text-mono text-sm font-bold text-val-green">{weeks}w / {totalDays}d</p>
                    <p className="text-[10px] text-fg-muted mt-1 uppercase font-semibold">Duration</p>
                  </div>
                </div>
              </motion.div>
            )}

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                Funds are locked non-custodially in Soroban vault. Unstreamed capital can be clawed back at any time.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={onClose}
                className="flex-1 bg-surface-2 text-fg font-semibold py-2.5 rounded-xl hover:bg-surface-3 transition-colors text-sm border border-subtle"
              >
                Cancel
              </button>
              <button
                disabled={!valid}
                className="flex-1 grad-brand font-semibold py-2.5 rounded-xl hover:opacity-95 transition-opacity disabled:opacity-40 text-sm shadow-md"
              >
                Fund & Launch →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ── Workers Data ───────────────────────────────── */
const workers = [
  { id: "W-001", name: "Amara O.",  addr: "GABCD…1234", rate: "$0.001157/s", accrued: "$1,247.52", total: "$3,000", status: "Streaming", pct: 63, avatarBg: "bg-accent text-[var(--cta-on)]" },
  { id: "W-002", name: "Daniel K.", addr: "GEFGH…5678", rate: "$0.002314/s", accrued: "$3,108.00", total: "$6,000", status: "Streaming", pct: 52, avatarBg: "bg-[var(--ribbon-2)] text-[var(--cta-on)]" },
  { id: "W-003", name: "Priya M.",  addr: "GIJKL…9012", rate: "$0.000579/s", accrued: "$750.00",   total: "$1,500", status: "Paused",    pct: 50, avatarBg: "bg-fg-faint text-[var(--cta-on)]" },
];

const overview = [
  {
    icon: DollarSign,
    label: "Vault Balance",
    value: "$10,500",
    sub: "USDC locked in Soroban",
    colorClass: "text-val-blue",
    borderClass: "border-blue-500/20 dark:border-blue-500/30",
    bgClass: "bg-blue-500/10",
  },
  {
    icon: TrendingUp,
    label: "Monthly Burn Rate",
    value: "$9,000",
    sub: "Total payroll volume",
    colorClass: "text-val-gold",
    borderClass: "border-amber-500/20 dark:border-amber-500/30",
    bgClass: "bg-amber-500/10",
  },
  {
    icon: Users,
    label: "Active Workers",
    value: "2",
    sub: "Streaming currently",
    colorClass: "text-val-green",
    borderClass: "border-signal/30",
    bgClass: "bg-signal/10",
  },
];

/* ── Page Component ─────────────────────────────── */
export default function EmployerDashboard() {
  const router = useRouter();
  const [modal, setModal] = useState(false);

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Header */}
      <header className="bg-bg-elevated sticky top-0 z-40 px-6 h-16 flex items-center justify-between border-b border-border">
        <Link href="/" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
          <PulsePayLogo className="w-8 h-8" size={32} />
          <span>PulsePay</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 bg-bg-sunken rounded-full px-3 py-1 border border-border">
            <span className="w-2 h-2 rounded-full bg-signal animate-master-pulse-scale" />
            <span className="text-xs font-semibold text-fg-muted">Stellar Soroban Testnet</span>
          </div>
          <button
            onClick={() => setModal(true)}
            className="grad-brand text-xs font-bold px-3.5 py-2 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" /> New Stream
          </button>
          <ThemeToggle />
          <div className="w-8 h-8 grad-brand rounded-full flex items-center justify-center text-[var(--cta-on)] font-bold text-xs shadow-sm cursor-default">
            E
          </div>
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-1.5 text-xs font-semibold text-fg-muted hover:text-fg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-display text-2xl font-bold text-fg">Employer Treasury</h1>
            <p className="text-sm font-medium text-fg-muted mt-0.5">
              Manage corporate payroll vaults and real-time Soroban streams.
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setModal(true)}
            className="grad-brand text-sm font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <Plus className="w-4 h-4" /> Create Stream
          </motion.button>
        </motion.div>

        {/* Overview Summary Cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {overview.map(({ icon: Icon, label, value, sub, colorClass, borderClass, bgClass }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className={`card-base rounded-2xl p-6 relative overflow-hidden ${borderClass}`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="label-xs font-bold text-fg-muted">{label}</span>
                <div className={`w-9 h-9 ${bgClass} rounded-xl flex items-center justify-center`}>
                  <Icon className={`w-4 h-4 ${colorClass}`} />
                </div>
              </div>
              <p className={`text-mono text-3xl font-extrabold ${colorClass} tracking-tight`}>
                {value}
              </p>
              <p className="text-xs font-medium text-fg-muted mt-2">{sub}</p>
            </motion.div>
          ))}
        </div>

        {/* Workforce Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="card-base rounded-2xl overflow-hidden border border-subtle"
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-subtle bg-surface-1">
            <div>
              <h2 className="font-bold text-fg text-base font-display">Active Workforce Roster</h2>
              <p className="text-xs font-medium text-fg-muted">Real-time status of current employee streams</p>
            </div>
            <button
              onClick={() => setModal(true)}
              className="text-xs font-bold text-val-blue hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" /> Add Worker
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-900 border-b-2 border-zinc-200 dark:border-zinc-800">
                  <th className="px-6 py-3.5 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Worker</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Address</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Stream Rate</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Accrued</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Total Cap</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3.5 text-xs font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {workers.map((w, index) => (
                  <motion.tr
                    key={w.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.35 + index * 0.08 }}
                    className={`transition-colors ${
                      index % 2 === 0
                        ? "bg-white dark:bg-zinc-900/60 hover:bg-zinc-50 dark:hover:bg-zinc-800/60"
                        : "bg-zinc-50/70 dark:bg-zinc-900/20 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/80"
                    }`}
                  >
                    {/* Worker Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${w.avatarBg} shadow-sm`}>
                          {w.name[0]}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-900 dark:text-zinc-50">{w.name}</p>
                          <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">{w.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Address */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-mono text-xs font-bold text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded">
                        {w.addr}
                      </span>
                    </td>

                    {/* Rate */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-mono text-sm font-bold text-val-blue">
                        {w.rate}
                      </span>
                    </td>

                    {/* Accrued */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-mono text-sm font-bold text-val-green">
                        {w.accrued}
                      </span>
                    </td>

                    {/* Total Cap */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-mono text-sm font-bold text-zinc-700 dark:text-zinc-300">
                        {w.total}
                      </span>
                    </td>

                    {/* Progress */}
                    <td className="px-6 py-4 whitespace-nowrap min-w-[120px]">
                      <div className="flex items-center gap-2">
                        <div className="h-2 flex-1 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden">
                          <div
                            className="h-full bg-accent rounded-full"
                            style={{ width: `${w.pct}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 text-mono">
                          {w.pct}%
                        </span>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        w.status === "Streaming" ? "pill-jade" : "pill-gold"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          w.status === "Streaming" ? "bg-signal animate-pulse" : "bg-[var(--ribbon-1)]"
                        }`} />
                        {w.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-xs font-bold text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 px-2 py-1 rounded hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">
                          Cancel
                        </button>
                        <span className="text-zinc-300 dark:text-zinc-700">|</span>
                        <button className="text-xs font-bold text-accent hover:text-accent-hover px-2 py-1 rounded hover:bg-bg-sunken transition-colors">
                          Clawback
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>

      {modal && <NewStreamModal onClose={() => setModal(false)} />}
    </div>
  );
}
