import { useCallback } from "react";
import { UserData } from "../../types/User.ts";

export function useGetAnymals() {
  return useCallback(async (user: UserData, dbAuthToken: string) => {
    if (!dbAuthToken) return;

    try {
      const endpoint = import.meta.env.VITE_PUBLIC_GRAPHQL_ENDPOINT;

      const query = `
        query Anymal($filter: AnymalFilterArg, $order: [AnymalOrderArg]) {
          Anymal(filter: $filter, order: $order) {
            _docID
            name
            breed
            passportID
            profileImageUrl
            caregiverNearId
            caregiverId
            lifestage
            gender
            petType
            products
            timeAddedUtc
          }
      }`;

      const variables = {
        filter: {
          caregiverId: { _eq: user.pid },
        },
        order: [
          {
            timeAddedUtc: "ASC",
          },
        ],
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${dbAuthToken}`,
        },
        body: JSON.stringify({ query, variables }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const results = await response.json();
      return results.data.Anymal || [];
    } catch (error) {
      console.error("Error fetching anymals data:", error);
      return [];
    }
  }, []);
}
