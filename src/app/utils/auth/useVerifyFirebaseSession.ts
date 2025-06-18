import { useCallback } from 'react';

export function useVerifyFirebaseSession() {
  return useCallback(
    async (idToken: string, context: string, publicKey: string, authServiceBaseUrl: string, address: string) => {
      const response = await fetch(`${authServiceBaseUrl}/verify-firebase-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + idToken,
        },
        body: JSON.stringify({ appPubKey: publicKey, requestedContext: context, baseWalletAddress: address }),
      });

      const { firebaseToken } = await response.json();
      return firebaseToken;
    },
    [],
  );
}