import { useAuthContext } from "../../utils/auth/useAuthContext.ts";
import { LoggedIn } from "../../components/LoggedIn";
// import { Login } from "../../components/Login";
import {AppLogin} from "../../components/AppLogin";

export function HomePage() {
  const { isLoggedIn } = useAuthContext();

  return (
    <div className="w-screen">{isLoggedIn ? <LoggedIn /> : <AppLogin />}</div>
  );
}
