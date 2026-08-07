import { Client } from "contract-client";

export const getContractClient = () => {
  return new Client({
    networkPassphrase: "Test SDF Network ; September 2015",
    contractId: process.env.NEXT_PUBLIC_PULSEPAY_CONTRACT_ID || "CAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2M",
    rpcUrl: process.env.NEXT_PUBLIC_STELLAR_RPC_URL || "https://soroban-testnet.stellar.org",
  });
};
