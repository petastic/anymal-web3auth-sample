import "./App.css";
import { AuthProvider } from "./app/utils/auth/AuthProvider.tsx";
import { HomePage } from "./app/pages/HomePage";

function App() {
  return (
    <AuthProvider>
      <HomePage />
    </AuthProvider>
  );
}

export default App;
