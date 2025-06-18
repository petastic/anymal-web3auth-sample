import { useCallback } from "react";
import {
  AUTH_SERVICE_BASE_URL, FIREBASE_REST_API_URL,
} from "../../helpers/AuthHelper.tsx";
import {useVerifyFirebaseSession} from "./useVerifyFirebaseSession.ts";
import {useFetchFirestoreUserData} from "../account/useFetchFirestoreUserData.tsx";

export function useVerifySession() {
  const getUser = useFetchFirestoreUserData();
  const verifyFirebaseSession = useVerifyFirebaseSession();

  return useCallback(
    async (token: string, public_key: string, pid: string, walletAddress: string) => {
      const context = `user:${pid}`;
      const dbAuthToken = await verifyFirebaseSession(
        token,
        context,
        public_key,
        AUTH_SERVICE_BASE_URL,
        walletAddress
      );

      // Call Firebase REST api rather than Defra
      const user = await getUser(dbAuthToken, FIREBASE_REST_API_URL, pid);

      return {
        user,
        dbAuthToken,
      };
    },
    [getUser, verifyFirebaseSession]
  );
}
