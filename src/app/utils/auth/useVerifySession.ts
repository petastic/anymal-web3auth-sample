import { useCallback } from "react";
import { useFetchUserData, useVerifyWeb3AuthSession } from "anymal-protocol";
import {
  AUTH_SERVICE_BASE_URL,
  DISTRIBUTED_DB_URL,
} from "../../helpers/AuthHelper.tsx";

export function useVerifySession() {
  const getUser = useFetchUserData();
  const verifyWeb3AuthSession = useVerifyWeb3AuthSession();

  return useCallback(
    async (token: string, public_key: string) => {
      const dbAuthToken = await verifyWeb3AuthSession(
        token,
        public_key,
        AUTH_SERVICE_BASE_URL
      );

      return await getUser(dbAuthToken, DISTRIBUTED_DB_URL);
    },
    [getUser, verifyWeb3AuthSession]
  );
}
