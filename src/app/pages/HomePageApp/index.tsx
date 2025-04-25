import { useAuthContext } from "../../utils/auth/useAuthContext.ts";
import { LoggedIn } from "../../components/LoggedIn";

import {AppLogin} from "../../components/AppLogin";

export function HomePageApp() {
  const { isLoggedIn } = useAuthContext();

  return (
    <div className="w-screen">{isLoggedIn ? <LoggedIn /> : <AppLogin />}</div>
  );
}
