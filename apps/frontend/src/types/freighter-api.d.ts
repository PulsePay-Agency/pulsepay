declare module "@stellar/freighter-api" {
  export function isConnected(): Promise<{
    isConnected?: boolean;
    error?: { message?: string };
  }>;
  export function requestAccess(): Promise<{
    address?: string;
    error?: { message?: string };
  }>;
  export function getAddress(): Promise<{
    address?: string;
    error?: { message?: string };
  }>;
  export function getNetworkDetails(): Promise<{
    network?: string;
    networkPassphrase?: string;
    error?: { message?: string };
  }>;
  export function signTransaction(
    xdr: string,
    opts?: { networkPassphrase?: string; address?: string; network?: string }
  ): Promise<{
    signedTxXdr?: string;
    signerAddress?: string;
    error?: { message?: string };
  }>;
}
