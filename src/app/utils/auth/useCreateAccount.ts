import { useCallback } from "react";
import { axiosRequest } from "../axios/axiosRequest.ts";

interface CreateAccountResultsData {
  success: boolean;
  data: { message: string; account_id: string };
  errors: string[];
}

export function useCreateAccount() {
  return useCallback(async (email: string | undefined) => {
    return await axiosRequest<CreateAccountResultsData>(
      "default/create-and-check-account-prod",
      "post",
      {
        email: email,
        dev: true,
        app: "Petastic",
      }
    );
  }, []);
}
