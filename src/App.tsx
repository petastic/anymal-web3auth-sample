// src/App.tsx
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./app/utils/auth/AuthProvider.tsx";
import { HomePage } from "./app/pages/HomePage";
import { AuthCallbackPage } from "./app/pages/AuthCallbackPage";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth/callback" element={<AuthCallbackPage />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;