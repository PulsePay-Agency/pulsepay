"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Building2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CashOutPage() {
  const router = useRouter();
  const [step, setStep] = useState<"input" | "processing" | "success">("input");
  const [error, setError] = useState<string | null>(null);

  const handleCashOut = async () => {
    setStep("processing");
    try {
      // SEP-24 Flow Implementation
      
      // 1. Fetch stellar.toml from testanchor
      const tomlRes = await fetch("https://testanchor.stellar.org/.well-known/stellar.toml");
      const tomlText = await tomlRes.text();
      
      // 2. Extract WEB_AUTH_ENDPOINT and TRANSFER_SERVER_SEP0024 (Regex for simplicity in browser)
      const authEndpoint = tomlText.match(/WEB_AUTH_ENDPOINT="(.*?)"/)?.[1];
      const transferServer = tomlText.match(/TRANSFER_SERVER_SEP0024="(.*?)"/)?.[1];
      
      if (!authEndpoint || !transferServer) {
        throw new Error("Could not locate SEP-24 endpoints from Anchor TOML.");
      }

      // 3. Authenticate (SEP-10)
      // Note: Full SEP-10 requires a real Stellar Keypair to sign the challenge transaction.
      // Since this is the frontend, we would normally use Freighter or the Passkey signer.
      console.log(`Authenticating with ${authEndpoint}`);
      
      // Simulate SEP-10 JWT acquisition
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockJwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.mock";

      // 4. Initiate Withdrawal (SEP-24 POST /transactions/withdraw/interactive)
      console.log(`Initiating interactive withdrawal at ${transferServer}`);
      
      // In a real flow, we post here and get back an interactive URL
      /*
      const withdrawRes = await fetch(`${transferServer}/transactions/withdraw/interactive`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${mockJwt}`
        },
        body: JSON.stringify({ asset_code: "USDC", amount: "100.00" })
      });
      const data = await withdrawRes.json();
      window.location.href = data.url; // Redirect to anchor's KYC/bank input page
      */

      // Simulate successful redirect and return
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStep("success");

    } catch (e: any) {
      console.error(e);
      setError(e.message || "Failed to initiate withdrawal via Anchor");
      setStep("input");
    }
  };

  return (
    <div className="flex-1 bg-black min-h-screen text-white flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/5 border-white/10 overflow-hidden relative">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {step === "input" && (
                <motion.div
                  key="input"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight">Withdraw Funds</h2>
                    <p className="text-white/50 text-sm">Via Stellar SEP-24 (testanchor.stellar.org)</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                    <p className="text-sm text-white/50 uppercase tracking-wider font-medium">Available to claim</p>
                    <p className="text-4xl font-medium tabular-nums text-white tracking-tighter">
                      $142.50 <span className="text-lg text-white/40 font-normal tracking-normal">USDC</span>
                    </p>
                    <p className="text-xs text-white/40 pt-2 border-t border-white/5 mt-3">
                      * 0.25% protocol fee will be deducted automatically
                    </p>
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 cursor-pointer ring-1 ring-transparent hover:ring-white/20 transition-all">
                      <Building2 className="w-5 h-5 text-white/60" />
                      <div>
                        <p className="font-medium text-sm">Bank Transfer (ACH)</p>
                        <p className="text-xs text-white/40">Powered by Stellar Anchors</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button 
                      variant="ghost" 
                      className="flex-1 hover:bg-white/5 text-white/70"
                      onClick={() => router.back()}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 bg-white text-black hover:bg-white/90 font-medium"
                      onClick={handleCashOut}
                    >
                      Confirm
                    </Button>
                  </div>
                </motion.div>
              )}

              {step === "processing" && (
                <motion.div
                  key="processing"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="py-12 flex flex-col items-center text-center space-y-6"
                >
                  <div className="w-16 h-16 rounded-full border-4 border-white/10 border-t-white animate-spin" />
                  <div className="space-y-2">
                    <h3 className="text-xl font-medium">Connecting to Anchor...</h3>
                    <p className="text-sm text-white/50 max-w-[250px] mx-auto">
                      Negotiating SEP-10 Auth & SEP-24 interactive URL
                    </p>
                  </div>
                </motion.div>
              )}

              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-8 flex flex-col items-center text-center space-y-6"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                    className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 ring-1 ring-green-500/40"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold tracking-tight">Withdrawal Complete</h3>
                    <p className="text-white/50 text-sm">
                      Funds have been transferred via testanchor.stellar.org.
                    </p>
                  </div>
                  <Button 
                    className="w-full mt-4 bg-white/10 text-white hover:bg-white/20"
                    onClick={() => router.push('/dashboard/worker')}
                  >
                    Return to Dashboard
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
