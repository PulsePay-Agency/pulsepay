/**
 * Freighter wallet bridge for PulsePay.
 * Prefers @stellar/freighter-api when installed; falls back to
 * window.freighterApi injected by the Freighter extension.
 */

export type PulsePayAuthSession = {
  method: "freighter" | "passkey";
  role: "worker" | "employer";
  address?: string;
  network?: string;
  connectedAt: number;
};

const AUTH_KEY = "pulsepay_auth";

type FreighterResult<T> = T & { error?: { message?: string } | string };

type FreighterApi = {
  isConnected: () => Promise<FreighterResult<{ isConnected?: boolean } | boolean>>;
  requestAccess: () => Promise<FreighterResult<{ address?: string }>>;
  getAddress?: () => Promise<FreighterResult<{ address?: string }>>;
  getNetworkDetails?: () => Promise<
    FreighterResult<{ network?: string; networkPassphrase?: string }>
  >;
  signTransaction?: (
    xdr: string,
    opts?: { networkPassphrase?: string }
  ) => Promise<FreighterResult<{ signedTxXdr?: string }>>;
};

declare global {
  interface Window {
    freighterApi?: FreighterApi;
  }
}

export function saveAuthSession(session: PulsePayAuthSession) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(AUTH_KEY, JSON.stringify(session));
  if (session.address) localStorage.setItem("pulsepay_wallet", session.address);
}

export function loadAuthSession(): PulsePayAuthSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(AUTH_KEY);
    return raw ? (JSON.parse(raw) as PulsePayAuthSession) : null;
  } catch {
    return null;
  }
}

export function clearAuthSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(AUTH_KEY);
}

export function truncateAddress(addr: string, chars = 4) {
  if (addr.length <= chars * 2 + 1) return addr;
  return `${addr.slice(0, chars + 1)}…${addr.slice(-chars)}`;
}

function errMsg(error: { message?: string } | string | undefined): string | undefined {
  if (!error) return undefined;
  return typeof error === "string" ? error : error.message;
}

async function getFreighterApi(): Promise<FreighterApi | null> {
  try {
    const mod = await import("@stellar/freighter-api");
    return {
      isConnected: mod.isConnected,
      requestAccess: mod.requestAccess,
      getAddress: mod.getAddress,
      getNetworkDetails: mod.getNetworkDetails,
      signTransaction: mod.signTransaction,
    };
  } catch {
    // package not installed — try extension injection
  }

  if (typeof window !== "undefined" && window.freighterApi) {
    return window.freighterApi;
  }
  return null;
}

export async function isFreighterInstalled(): Promise<boolean> {
  const api = await getFreighterApi();
  if (!api) return false;
  try {
    const result = await api.isConnected();
    if (typeof result === "boolean") return result;
    if (errMsg(result.error)) return false;
    return !!(result.isConnected ?? true);
  } catch {
    return false;
  }
}

/**
 * Request Freighter access and return the public key (G...).
 */
export async function connectFreighter(): Promise<{
  address: string;
  network: string;
}> {
  const api = await getFreighterApi();
  if (!api) {
    throw new Error(
      "Freighter is not installed. Install the Freighter browser extension, then try again."
    );
  }

  const connected = await api.isConnected();
  const connectedOk =
    typeof connected === "boolean"
      ? connected
      : !errMsg(connected.error) && (connected.isConnected ?? true);

  if (!connectedOk) {
    throw new Error(
      "Freighter is not installed. Install the Freighter browser extension, then try again."
    );
  }

  const access = await api.requestAccess();
  const address = access.address;
  if (errMsg(access.error) || !address) {
    throw new Error(
      errMsg(access.error) ||
        "Freighter access was denied. Approve the connection in the extension."
    );
  }

  let network = "TESTNET";
  try {
    if (api.getNetworkDetails) {
      const details = await api.getNetworkDetails();
      if (!errMsg(details.error) && details.network) network = details.network;
    }
  } catch {
    // optional
  }

  return { address, network };
}

export async function signWithFreighter(
  xdr: string,
  networkPassphrase: string
): Promise<string> {
  const api = await getFreighterApi();
  if (!api?.signTransaction) {
    throw new Error("Freighter is not available for signing.");
  }
  const { signedTxXdr, error } = await api.signTransaction(xdr, { networkPassphrase });
  if (errMsg(error) || !signedTxXdr) {
    throw new Error(errMsg(error) || "Transaction signing was rejected.");
  }
  return signedTxXdr;
}

export const FREIGHTER_INSTALL_URL = "https://www.freighter.app/";
