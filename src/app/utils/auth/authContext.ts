import { createContext } from "react";
import { UserData } from "../../../types/User.ts";
import { ReadContractReturnType } from "viem";

interface AuthContextType {
  fetchKibbleBalance: (
    publicClient: any,
    walletAddress: string
  ) => Promise<ReadContractReturnType<any>>;
  openWeb3ModalFn: () => Promise<void>;
  web3authLoginFn: () => Promise<void>;
  web3AuthLogoutFn: () => Promise<void>;
  isLoggedIn: boolean;
  publicKey: string | null;
  publicClientData: any | null;
  walletClientData: any | null;
  addresses: string[];
  userData: UserData | null;
  dbAuthToken: string | null;
  setDbAuthToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
