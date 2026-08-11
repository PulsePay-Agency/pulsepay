"use client";
import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";
import { loadAuthSession, truncateAddress } from "@/lib/auth";

export function WalletAddressChip() {
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const session = loadAuthSession();
    if (session?.method === "freighter" && session.address) {
      setLabel(truncateAddress(session.address, 4));
    } else if (session?.method === "passkey") {
      setLabel("Passkey");
    }
  }, []);

  if (!label) return null;

  return (
    <div className="hidden md:flex items-center gap-1.5 bg-bg-sunken rounded-full px-3 py-1 border border-border text-xs font-semibold text-fg-muted font-mono-num">
      <Wallet className="w-3.5 h-3.5 text-accent" />
      {label}
    </div>
  );
}
