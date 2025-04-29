import { useAuthContext } from "../../utils/auth/useAuthContext.ts";
import { Login } from "../../components/Login";
import { CreateAnymal } from "../../components/anymals/CreateAnymal";

export function CreateAnymalPage() {
  const { isLoggedIn } = useAuthContext();

  return (
    <div className="w-screen">{isLoggedIn ? <CreateAnymal /> : <Login />}</div>
  );
}
