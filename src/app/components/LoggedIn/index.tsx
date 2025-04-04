import { useAuthContext } from "../../utils/auth/useAuthContext.ts";

export function LoggedIn() {
  const { web3AuthLogoutFn } = useAuthContext();

  return (
    <div className="space-y-5">
      <div>You are logged in</div>
      <button
        className="rounded-full px-5 py-1 bg-black text-white font-semibold"
        onClick={web3AuthLogoutFn}
      >
        Logout
      </button>
    </div>
  );
}
