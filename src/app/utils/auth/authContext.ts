import { createContext } from "react";

interface AuthContextType {
  openWeb3ModalFn: () => Promise<void>;
  web3authLoginFn: () => Promise<void>;
  web3AuthLogoutFn: () => Promise<void>;
  isLoggedIn: boolean;
  publicKey: string | null;
  publicClientData: any | null;
  walletClientData: any | null;
  addresses: string[];
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
