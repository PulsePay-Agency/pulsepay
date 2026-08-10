import Link from "next/link";
import { PulsePayLogo } from "@/components/ui/PulsePayLogo";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#080A16] mt-24">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 font-bold text-lg mb-4">
            <div className="w-8 h-8 rounded-xl bg-black/90 p-1 border border-emerald-500/20 shadow-sm flex items-center justify-center">
              <PulsePayLogo className="w-full h-full" />
            </div>
            <span>PulsePay</span>
          </div>
          <p className="text-sm text-[#64748B] leading-relaxed">
            Real-time global payroll on Soroban. Continuous liquidity for the world's remote workforce.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-[#64748B]">Stellar Testnet Live</span>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#475569] mb-4">Product</p>
          <ul className="space-y-3">
            {["Features", "Pricing", "Security", "Docs"].map(l => (
              <li key={l}><Link href={`/${l.toLowerCase()}`} className="text-sm text-[#64748B] hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#475569] mb-4">Protocol</p>
          <ul className="space-y-3">
            {["Contract", "GitHub", "Docs Site"].map(l => (
              <li key={l}><Link href="#" className="text-sm text-[#64748B] hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#475569] mb-4">Legal</p>
          <ul className="space-y-3">
            {["Privacy Policy", "Terms", "Audit"].map(l => (
              <li key={l}><Link href="#" className="text-sm text-[#64748B] hover:text-white transition-colors">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 max-w-7xl mx-auto">
        <p className="text-xs text-[#475569]">© 2026 PulsePay. Built on Stellar Soroban.</p>
        <p className="text-xs text-[#475569]">Contract: CBH3AT...EFHRZW</p>
      </div>
    </footer>
  );
}
