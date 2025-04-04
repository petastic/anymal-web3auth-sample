import { CHAIN_NAMESPACES } from "@web3auth/base";
import {
  AccountAbstractionProvider,
  AccountAbstractionProviderConfig,
  SafeSmartAccount,
} from "@web3auth/account-abstraction-provider";
import { entryPoint07Address } from "viem/account-abstraction";

const rpcUrl = import.meta.env.VITE_PUBLIC_CHAIN_RPC_TARGET;
const baseEntryPoint = entryPoint07Address;

export const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x14A34", // hex of 84532
  rpcTarget: "https://sepolia.base.org",
  displayName: "Base Sepolia",
  blockExplorerUrl: "https://sepolia-explorer.base.org",
  ticker: "ETH",
  tickerName: "ETH",
  logo: "https://github.com/base-org/brand-kit/blob/main/logo/symbol/Base_Symbol_Blue.svg",
};

export const accountAbstractionProvider = new AccountAbstractionProvider({
  config: {
    chainConfig,
    bundlerConfig: {
      url: rpcUrl,
    },
    smartAccountInit: new SafeSmartAccount({
      version: "1.4.1",
      entryPoint: { address: baseEntryPoint, version: "0.7" },
    }),
    paymasterConfig: {
      url: rpcUrl,
    },
  } as AccountAbstractionProviderConfig,
});

export const WEB3AUTH_CLIENT_ID =
  import.meta.env.VITE_PUBLIC_WEB3AUTH_CLIENT_ID || "Invalid Client ID";
export const AUTH_SERVICE_BASE_URL =
  import.meta.env.VITE_PUBLIC_AUTH_SERVICE_BASE_URL || "Invalid Base URL";
export const DISTRIBUTED_DB_URL =
  import.meta.env.VITE_PUBLIC_GRAPHQL_ENDPOINT || "Invalid Database URL";
