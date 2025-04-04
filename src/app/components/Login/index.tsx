import { useAuthContext } from "../../utils/auth/useAuthContext.ts";

export function Login() {
  const { openWeb3ModalFn } = useAuthContext();

  return (
    <div className="space-y-5">
      <div>You must login</div>
      <button
        className="rounded-full px-5 py-1 bg-black text-white font-semibold"
        onClick={openWeb3ModalFn}
      >
        Login with Anymal
      </button>
    </div>
  );
}
