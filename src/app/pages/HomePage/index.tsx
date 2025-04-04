import { useAuthContext } from "../../utils/auth/useAuthContext.ts";
import { LoggedIn } from "../../components/LoggedIn";
import { Login } from "../../components/Login";

export function HomePage() {
  const { isLoggedIn } = useAuthContext();

  return (
    <div className="flex items-center justify-center w-screen lg:h-screen h-dvh">
      {isLoggedIn ? <LoggedIn /> : <Login />}
    </div>
  );
}
