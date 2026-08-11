import Link from "next/link";
import { PulsePayLogo } from "@/components/ui/PulsePayLogo";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="space-y-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-fg">
            <PulsePayLogo className="w-8 h-8" size={32} />
            PulsePay
          </Link>
          <p className="text-sm text-fg-muted leading-relaxed">
            Real-time global payroll on Stellar Soroban.
          </p>
          <div className="flex items-center gap-2 text-xs text-fg-muted">
            <span className="w-2 h-2 rounded-full bg-signal animate-master-pulse-scale" />
            Protocol live on testnet
          </div>
        </div>

        {[
          { title: "Product", items: ["Pricing", "Security", "Docs"] },
          { title: "Protocol", items: ["Soroban", "SEP-24", "Passkeys"] },
          { title: "Company", items: ["GitHub", "X", "Contact"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-bold text-fg mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.items.map((l) => (
                <li key={l}>
                  <Link
                    href="/#"
                    className="text-sm text-fg-muted hover:text-fg transition-colors"
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-border text-xs text-fg-muted">
        © 2026 PulsePay Protocol · Built on Stellar · Powered by Soroban
      </div>
    </footer>
  );
}
