import { useCallback, useState } from "react";


export function AppLogin() {
    const [state] = useState(() => crypto.randomUUID());
    const redirectUri = `${window.location.origin}/auth/callback`;
    const authEndpoint = import.meta.env.VITE_ANYMAL_AUTH_ENDPOINT!;

    const handleClick = useCallback(async () => {
        try {
            const response = await fetch("/generate-login-url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ state, redirectUri }),
            });

            if (!response.ok) {
                throw new Error("Failed to obtain Anymal signature");
            }

            const { signature, client_id } = (await response.json()) as {
                signature: string;
                client_id: string;
            };

            const params = new URLSearchParams({
                client_id,
                redirect_uri: redirectUri,
                state,
                signature,
            });

            window.location.href = `${authEndpoint}?${params.toString()}`;
        } catch (error) {
            console.error("Login initiation failed:", error);
        }
    }, [state, redirectUri, authEndpoint]);

    return (
        <button
            onClick={handleClick}
            className="rounded-full px-5 py-1 bg-black text-white font-semibold"
        >
            Login with Anymal
        </button>
    );
}