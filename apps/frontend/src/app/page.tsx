"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Fingerprint } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (role: 'employer' | 'worker') => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Generate a random challenge (in production this comes from the backend)
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);

      // 2. Request Passkey authentication
      const credential = await navigator.credentials.get({
        publicKey: {
          challenge: challenge,
          rpId: window.location.hostname,
          userVerification: "preferred",
        }
      });

      if (credential) {
        // In production, we'd send the assertion to our backend to verify against the stored public key,
        // and then map that to the Stellar address for Soroban `require_auth`.
        router.push(`/dashboard/${role}`);
      }
    } catch (err: any) {
      console.error(err);
      if (err.name === 'NotAllowedError') {
        // Fallback for demo environments if Passkeys are canceled or unavailable
        console.log("Passkey canceled or unavailable. Proceeding in demo mode.");
        setTimeout(() => router.push(`/dashboard/${role}`), 500);
      } else {
        setError("Failed to authenticate with Passkey.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    try {
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);
      const userId = new Uint8Array(16);
      crypto.getRandomValues(userId);

      await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: { name: "PulsePay", id: window.location.hostname },
          user: {
            id: userId,
            name: "user@pulsepay.app",
            displayName: "PulsePay User"
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }],
          authenticatorSelection: { authenticatorAttachment: "platform" },
          timeout: 60000,
          attestation: "none"
        }
      });
      alert("Passkey registered successfully! You can now log in.");
    } catch (e) {
      console.error(e);
      alert("Failed to register Passkey.");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-black">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 w-full max-w-md px-4"
      >
        <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
          <CardHeader className="text-center pb-8 pt-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto bg-white/5 p-4 rounded-2xl w-fit mb-6 ring-1 ring-white/10 shadow-[0_0_40px_rgba(255,255,255,0.05)] cursor-pointer hover:bg-white/10 transition-colors"
              onClick={handleRegister}
              title="Click to register a new Passkey"
            >
              <Fingerprint className="w-8 h-8 text-white/80" />
            </motion.div>
            <CardTitle className="text-3xl font-medium tracking-tight mb-2">PulsePay</CardTitle>
            <CardDescription className="text-white/50 text-base">
              Streaming liquidity, secured by passkeys.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pb-10">
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <Button
              className="w-full h-12 bg-white text-black hover:bg-white/90 rounded-xl font-medium transition-all"
              onClick={() => handleLogin('worker')}
              disabled={isLoading}
            >
              {isLoading ? "Authenticating..." : "Sign in as Worker"}
            </Button>
            <Button
              variant="outline"
              className="w-full h-12 border-white/10 bg-transparent hover:bg-white/5 rounded-xl font-medium transition-all text-white/80"
              onClick={() => handleLogin('employer')}
              disabled={isLoading}
            >
              Sign in as Employer
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
