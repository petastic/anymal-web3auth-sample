// src/App.tsx
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./app/utils/auth/AuthProvider.tsx";
import { HomePage } from "./app/pages/HomePage";
import { HomePageApp } from "./app/pages/HomePageApp";
import { AuthCallbackPage } from "./app/pages/AuthCallbackPage";
import { CreateAnymalPage } from "./app/pages/CreateAnymalPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-anymal" element={<CreateAnymalPage />} />
          <Route path="/app-flow" element={<HomePageApp />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
