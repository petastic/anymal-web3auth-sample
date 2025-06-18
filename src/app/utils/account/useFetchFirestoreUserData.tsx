import { useCallback } from "react";
import { flattenFirestoreData } from "../../helpers/FirestoreHelpers";

export function useFetchFirestoreUserData() {
  return useCallback(
    async (firebaseToken: string, endpoint: string, pid: string) => {
      try {

        const collection = "users";
        const firebaseUrl = `${endpoint}/${collection}/${pid}`

        const response = await fetch(firebaseUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${firebaseToken}`,
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data) {
          return flattenFirestoreData(data.fields);
        } else {
          return null;
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
      }
    },
    []
  );
}
