"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Users, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EmployerDashboard() {
  const router = useRouter();

  return (
    <div className="flex-1 bg-[#0a0a0a] min-h-screen text-white p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto space-y-10 mt-10">
        
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-between items-end"
        >
          <div>
            <h1 className="text-3xl font-semibold tracking-tight mb-2">Treasury</h1>
            <p className="text-white/50 text-lg">Manage liquidity and active streams.</p>
          </div>
          <Button className="h-11 bg-white text-black hover:bg-white/90 rounded-xl font-medium px-6">
            <Plus className="w-4 h-4 mr-2" />
            New Stream
          </Button>
        </motion.header>

        <div className="grid md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2"
          >
            <Card className="bg-gradient-to-br from-white/10 to-transparent border-white/10 h-full relative overflow-hidden">
              <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full pointer-events-none" />
              <CardContent className="p-8 flex flex-col justify-between h-full relative z-10">
                <p className="text-white/60 font-medium mb-4">Total Vault Balance</p>
                <div className="text-5xl font-medium tracking-tighter tabular-nums mb-8">
                  $142,500.00
                </div>
                <div className="flex gap-4">
                  <Button variant="outline" className="border-white/20 bg-black/20 backdrop-blur hover:bg-white/10 rounded-lg text-white">
                    Deposit
                  </Button>
                  <Button variant="ghost" className="text-white/60 hover:text-white">
                    View Ledger
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-white/[0.02] border-white/5 h-full">
              <CardContent className="p-8 flex flex-col justify-between h-full">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-white/80" />
                </div>
                <div>
                  <p className="text-3xl font-medium tracking-tighter mb-1">12</p>
                  <p className="text-white/50 text-sm">Active Workers Streaming</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-medium">Recent Streams</h2>
          
          {[1, 2, 3].map((i) => (
            <Card key={i} className="bg-white/[0.02] border-white/5 hover:bg-white/[0.04] transition-colors cursor-pointer group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 ring-1 ring-white/10 flex items-center justify-center">
                    <span className="text-xs font-medium">W{i}</span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">Worker {i} (Engineering)</p>
                    <p className="text-xs text-white/40">Started 2 days ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-medium text-sm tabular-nums">$5,000 / mo</p>
                    <p className="text-xs text-green-400">Streaming Live</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
