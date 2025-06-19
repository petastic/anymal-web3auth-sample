import { useCallback } from "react";
import {flattenFirestoreData} from "../helpers/FirestoreHelper.tsx";

export function useGetAnymals() {
  return useCallback(async (userPid: string, appId: string, dbAuthToken: string) => {
    if (!dbAuthToken) return;

    try {
      const endpoint = import.meta.env.VITE_PUBLIC_FIREBASE_REST_API_URL;

      // When 'listing' _other_ users data you must filter by both the other users pid and the app
      const body = JSON.stringify({
        "structuredQuery": {
          "from": [
            { "collectionId": "passport", "allDescendants": true }
          ],
          "where": {
            "compositeFilter": {
              "op": "AND",
              "filters": [
                {
                  "fieldFilter": {
                    "field":  { "fieldPath": "caregiverId" },
                    "op":     "EQUAL",
                    "value":  { "stringValue": userPid }
                  }
                },
                {
                  "fieldFilter": {
                    "field":  { "fieldPath": `read_grants.\`${appId}\`` },
                    "op":     "EQUAL",
                    "value":  { "booleanValue": true }
                  }
                }
              ]
            }
          }
        }
      })

      const response = await fetch(`${endpoint}:runQuery`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${dbAuthToken}`,
          "Content-Type": "application/json"
        },
        body: body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const results = await response.json();
      return results.map((anymal: any) => flattenFirestoreData(anymal.document.fields));
    } catch (error) {
      console.error("Error fetching anymals data:", error);
      return [];
    }
  }, []);
}
