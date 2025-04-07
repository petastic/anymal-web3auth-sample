import { useAuthContext } from "../../utils/auth/useAuthContext.ts";
import { useCallback, useLayoutEffect, useState } from "react";

export function UserHeader() {
  const [kibble, setKibble] = useState(0);
  const {
    web3AuthLogoutFn,
    userData,
    fetchKibbleBalance,
    publicClientData,
    addresses,
  } = useAuthContext();

  // Fetch the kibble balance of the logged in user
  const getKibbleBalance = useCallback(() => {
    if (!publicClientData || addresses.length === 0 || !userData) return;

    fetchKibbleBalance(publicClientData, userData.baseWalletAddress).then(
      (res) => {
        if (typeof res === "number") {
          setKibble(res);
        }
      }
    );
  }, [addresses.length, fetchKibbleBalance, publicClientData, userData]);

  useLayoutEffect(() => {
    getKibbleBalance();
  }, [getKibbleBalance]);

  if (!userData) return;

  return (
    <div className="fixed inset-0 w-screen h-[50px]">
      <div className="w-full flex items-center px-2 h-full bg-black text-white py-2 justify-between">
        <div>{userData.name}</div>
        <div>Kibble: {kibble}</div>
        <div>
          <button
            className="rounded-full px-5 py-1 bg-white text-black font-semibold"
            onClick={web3AuthLogoutFn}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
