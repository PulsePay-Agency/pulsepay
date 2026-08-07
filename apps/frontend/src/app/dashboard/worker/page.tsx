"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, Wallet, Activity, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { getContractClient } from "@/lib/stellar";
import type { Stream } from "contract-client";

const DECIMALS = 10000000;
const STREAM_ID = 1n; // Hardcoded for demo

export default function WorkerDashboard() {
  const router = useRouter();
  const balanceRef = useRef<HTMLSpanElement>(null);
  
  const [stream, setStream] = useState<Stream | null>(null);
  const [syncedBalance, setSyncedBalance] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchStreamData = async () => {
    try {
      setIsSyncing(true);
      const client = getContractClient();
      
      // We would normally fetch the full stream data here to get the rate, 
      // but the generated bindings currently only export the methods we added.
      // So we will sync the true claimable balance from the contract directly.
      const tx = await client.get_claimable_balance({ stream_id: STREAM_ID });
      const balanceI128 = tx.result;
      
      if (balanceI128 !== undefined) {
        setSyncedBalance(Number(balanceI128) / DECIMALS);
      }
      
      // Fallback mock stream for UI details since we didn't export get_stream in lib.rs
      setStream({
        id: STREAM_ID,
        employer: "GBXYZ...ABCD",
        worker: "GWORK...1234",
        token: "USDC",
        rate_per_second: 50000n, // 0.005 USDC/sec
        start_time: BigInt(Math.floor(Date.now() / 1000) - 3600),
        end_time: BigInt(Math.floor(Date.now() / 1000) + 86400 * 30),
        total_amount: 50000n * BigInt(86400 * 30),
        amount_withdrawn: 0n,
        is_canceled: false,
      });

    } catch (e) {
      console.error("Failed to fetch contract data", e);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    fetchStreamData();
  }, []);

  // Real-time calculation loop
  useEffect(() => {
    if (!stream) return;
    
    let animationFrameId: number;
    const syncTimeSec = Date.now() / 1000;
    const initialBalance = syncedBalance;
    const rate = Number(stream.rate_per_second) / DECIMALS;
    
    const updateBalance = () => {
      if (balanceRef.current) {
        const nowSec = Date.now() / 1000;
        
        if (!stream.is_canceled && nowSec < Number(stream.end_time)) {
          // Calculate absolute difference to prevent floating point drift
          const deltaSec = nowSec - syncTimeSec;
          const currentDisplayBalance = initialBalance + (deltaSec * rate);
          
          balanceRef.current.textContent = currentDisplayBalance.toFixed(4);
        }
      }
      animationFrameId = requestAnimationFrame(updateBalance);
    };
    
    animationFrameId = requestAnimationFrame(updateBalance);
    return () => cancelAnimationFrame(animationFrameId);
  }, [stream, syncedBalance]);

  return (
    <div className="flex-1 bg-[#0a0a0a] min-h-screen text-white p-6 md:p-12 font-sans selection:bg-white/20">
      <div className="max-w-4xl mx-auto space-y-12 mt-10">
        
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center ring-1 ring-white/20">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">Worker Portal</h1>
              <p className="text-sm text-white/50">PulsePay streaming active</p>
            </div>
          </div>
          <Button variant="ghost" className="text-white/60 hover:text-white rounded-full" onClick={fetchStreamData}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? "animate-spin" : ""}`} />
            Sync Chain
          </Button>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="bg-gradient-to-br from-white/5 to-transparent border-white/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] pointer-events-none rounded-full" />
            
            <CardContent className="p-10 md:p-16 flex flex-col items-center text-center space-y-6 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium ring-1 ring-green-500/20">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Live Stream
              </div>
              
              <div className="space-y-2">
                <p className="text-white/50 text-sm font-medium tracking-wide uppercase">Claimable Balance</p>
                <div className="text-6xl md:text-8xl font-medium tracking-tighter tabular-nums flex items-baseline justify-center gap-2">
                  <span className="text-white/40 text-4xl md:text-5xl">$</span>
                  <span ref={balanceRef} className="text-white">
                    {syncedBalance.toFixed(4)}
                  </span>
                </div>
              </div>

              <div className="pt-8 flex gap-4 w-full max-w-sm">
                <Button 
                  className="flex-1 h-14 bg-white text-black hover:bg-white/90 rounded-2xl font-semibold text-lg transition-transform active:scale-95"
                  onClick={() => router.push('/cashout')}
                >
                  <Wallet className="w-5 h-5 mr-2" />
                  Cash Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid md:grid-cols-2 gap-4"
        >
          <Card className="bg-white/[0.02] border-white/5">
            <CardContent className="p-6">
              <p className="text-sm text-white/50 mb-1">Streaming Rate</p>
              <p className="text-xl font-medium tabular-nums">${stream ? (Number(stream.rate_per_second) / DECIMALS).toFixed(3) : "0.000"} / sec</p>
            </CardContent>
          </Card>
          <Card className="bg-white/[0.02] border-white/5">
            <CardContent className="p-6">
              <p className="text-sm text-white/50 mb-1">Employer</p>
              <p className="text-xl font-medium flex items-center gap-2">
                Stellar Foundation <ArrowUpRight className="w-4 h-4 text-white/40" />
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
