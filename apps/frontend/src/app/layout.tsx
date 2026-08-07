import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

export const metadata: Metadata = {
  title: "PulsePay — Real-Time Global Payroll on Soroban",
  description: "Stream wages per ledger second. Cash out globally via SEP-24 anchors. Built on Stellar Soroban.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-[var(--surface-0)] text-[var(--fg)]">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
