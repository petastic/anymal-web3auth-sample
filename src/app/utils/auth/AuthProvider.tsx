import { ADAPTER_EVENTS, WEB3AUTH_NETWORK } from "@web3auth/base";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { AuthContext } from "./authContext";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { chainConfig, WEB3AUTH_CLIENT_ID } from "../../helpers/AuthHelper.tsx";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { safeatob } from "@web3auth/auth-adapter";
import {
  createPublicClient,
  createWalletClient,
  custom,
  erc20Abi,
  getAddress,
} from "viem";
import { baseSepolia } from "viem/chains";
import { useVerifySession } from "./useVerifySession.ts";
import { UserData } from "../../../types/User.ts";

interface Props {
  children: ReactNode | ReactNode[];
}

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthOptions: Web3AuthOptions = {
  clientId: WEB3AUTH_CLIENT_ID,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
};

const web3auth = new Web3Auth(web3AuthOptions);

// Kibble token address
const kibbleTokenAddress = import.meta.env.VITE_KIBBLE_TOKEN_PROXY_ADDRESS;

export function AuthProvider({ children }: Props) {
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [publicClientData, setPublicClientData] = useState<any | null>(null);
  const [walletClientData, setWalletClientData] = useState<any | null>(null);
  const [addresses, setAddresses] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const hasInitialized = useRef(false);
  const listenerAddedRef = useRef(false);
  const verifyWeb3Session = useVerifySession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [initialized, setInitialized] = useState(false);
  const [dbAuthToken, setDbAuthToken] = useState<string | null>(null);

  // This call gets the users kibble balance
  const fetchKibbleBalance = useCallback(
    async (publicClient: any, walletAddress: string) => {
      try {
        const balance = await publicClient.readContract({
          address: getAddress(kibbleTokenAddress),
          abi: erc20Abi,
          functionName: "balanceOf",
          args: [getAddress(walletAddress)],
        });

        return Math.round((Number(balance) / 1e18) * 1e2) / 1e2;
      } catch (error) {
        console.error("Failed to fetch token balance:", error);
      }
    },
    []
  );

  const web3authLoginFn = useCallback(async () => {
    const web3authProvider = web3auth.provider;

    try {
      if (web3authProvider) {
        const user = await web3auth.getUserInfo();

        const publicClient = createPublicClient({
          chain: baseSepolia,
          transport: custom(web3authProvider),
        });

        setPublicClientData(publicClient);

        const walletClient = createWalletClient({
          chain: baseSepolia,
          transport: custom(web3authProvider),
        });

        setWalletClientData(walletClient);

        const addresses = await walletClient.getAddresses();
        setAddresses(addresses);

        const token = user?.idToken?.split(".")[1];
        const parsedToken = JSON.parse(safeatob(token || ""));

        setPublicKey(parsedToken.wallets[0].public_key);

        if (user.idToken) {
          // Verify the web3auth session and get the users data
          const res = await verifyWeb3Session(
            user.idToken,
            parsedToken.wallets[0].public_key
          );

          setUserData(res.user);
          setDbAuthToken(res.dbAuthToken);
        }

        setIsLoggedIn(true);
        hasInitialized.current = true;
      }
    } catch (e) {
      console.error(e);
    }
  }, [verifyWeb3Session]);

  // This will open up the web3auth login modal
  const openWeb3ModalFn = useCallback(async () => {
    try {
      await web3auth.connect();

      if (web3auth.connected) {
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Logout the web3auth verified user
  const web3AuthLogoutFn = useCallback(async () => {
    await web3auth.logout();
    setIsLoggedIn(false);
    hasInitialized.current = false;
  }, []);

  useEffect(() => {
    if (listenerAddedRef.current) {
      console.warn("Already initiated web3auth");
      return;
    }

    const onConnected = async () => {
      await web3authLoginFn();
      setIsLoggedIn(true);
    };

    web3auth.addListener(ADAPTER_EVENTS.CONNECTED, onConnected);
    listenerAddedRef.current = true;
  }, [web3authLoginFn]);

  useEffect(() => {
    const init = async () => {
      if (initialized || hasInitialized.current || web3auth.connected) {
        return;
      }

      hasInitialized.current = true;

      try {
        await web3auth.initModal();

        setInitialized(true);
      } catch (error) {
        console.error("Initialization Error:", error);
      }
    };

    init().then();
  }, [initialized]);

  return (
    <AuthContext.Provider
      value={{
        fetchKibbleBalance,
        openWeb3ModalFn,
        web3authLoginFn,
        web3AuthLogoutFn,
        isLoggedIn,
        publicKey,
        publicClientData,
        walletClientData,
        addresses,
        userData,
        dbAuthToken,
        setDbAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
