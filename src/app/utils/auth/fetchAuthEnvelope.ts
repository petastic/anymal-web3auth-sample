// e.g. src/utils/authEnvelope.ts
export async function fetchAuthEnvelope(
    network: string = "testnet",
    options?: { expiresInSeconds?: number }
) {
    const resp = await fetch("/create-auth-envelope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ network, options }),
    });
    if (!resp.ok) throw new Error("Failed to create auth envelope");
    return resp.json() as Promise<{ publicKey: string; token: string }>;
}
