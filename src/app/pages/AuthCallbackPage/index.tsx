import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {fetchAuthEnvelope} from "../../utils/auth/fetchAuthEnvelope";
import { fetchAnymals } from "anymal-protocol";

export function AuthCallbackPage() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);

    const userId = params.get("userId");
    const error  = params.get("error");
    const state  = params.get("state");

    const [envelope, setEnvelope] = useState<{ publicKey: string; token: string } | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [anymals, setAnymals] = useState<any[]>([]);

    useEffect(() => {
        if (userId && !error) {
            (async () => {
                try {
                    const env = await fetchAuthEnvelope("localnet");
                    setEnvelope(env);
                    // e.g. call your backend with the token:
                    // const res = await fetch(`/api/users/${userId}/data`, {
                    //   headers: { Authorization: `Bearer ${env.token}` }
                    // });
                    // ...

                    const endpoint = import.meta.env.VITE_ANYMAL_GRAPHQL_ENDPOINT!;
                    const list = await fetchAnymals({
                        dbAuthToken: env.token,
                        endpoint,
                        userPid: userId,
                    });
                    setAnymals(list);

                } catch (err) {
                    console.error("Auth envelope error:", err);
                    setFetchError("Failed to create auth envelope");
                }
            })();
        }
    }, [userId, error]);

    if (error) {
        return (
            <div className="p-8 max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-red-600">Authorization Failed</h1>
                <p className="mt-4">Error: <strong>{error}</strong></p>
                {state && <p>State: <code>{state}</code></p>}
            </div>
        );
    }

    if (!userId) {
        return (
            <div className="p-8 max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-yellow-600">No User ID</h1>
                <p className="mt-4">No <code>userId</code> parameter was found in the URL.</p>
            </div>
        );
    }

    if (fetchError) {
        return (
            <div className="p-8 max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-red-600">Error</h1>
                <p className="mt-4">{fetchError}</p>
            </div>
        );
    }

    if (!envelope) {
        return (
            <div className="p-8 max-w-md mx-auto">
                <h1 className="text-2xl font-bold text-gray-600">Loading...</h1>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-md mx-auto">
            <h1 className="text-2xl font-bold text-green-600">Data Loaded</h1>
            <p className="mt-4">User ID: <code>{userId}</code></p>
            {state && <p>State: <code>{state}</code></p>}

            <div className="mt-6">
                <h2 className="text-xl font-semibold">Users Anymals:</h2>
                <ul className="mt-2 list-disc list-inside">
                    {anymals.map((a) => (
                        <li key={a._docID} className="mb-1">
                            <strong>{a.name}</strong> ({a.petType}), Breed: {a.breed}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

