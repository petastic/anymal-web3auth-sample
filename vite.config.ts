import { defineConfig, Plugin, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { generateAppSignature, createAuthEnvelope } = require("anymal-protocol");

/**
 * In dev‐only, intercept POST /generate-login-url
 * and call generateAppSignature() with your APP_ID & PRIV_KEY.
 */
function localSignatureProxy(APP_ID: string, PRIV_KEY: string): Plugin {
  return {
    name: "vite-plugin-anymal-signature-proxy",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Third Party developer backend might look something like the following
        // You can use the anymal-protocol helper `generateAppSignature` on the backend (assuming a node based backend)
        if (req.method === "POST" && req.url === "/generate-login-url") {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", async () => {
            try {
              const { state, redirectUri } = JSON.parse(body);
              const signature = await generateAppSignature(
                  PRIV_KEY,
                  APP_ID,
                  redirectUri,
                  state
              );
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ signature, client_id: APP_ID }));
            } catch (err) {
              console.error(err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "signature_failed" }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

/** Dev‑only: intercept POST /create-auth-envelope */
function localAuthEnvelopeProxy(PRIV_KEY: string): Plugin {
  return {
    name: "vite-plugin-anymal-auth-envelope-proxy",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === "POST" && req.url === "/create-auth-envelope") {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", async () => {
            try {
              // client can send { network, options }
              const { network, options } = JSON.parse(body);
              const envelope = await createAuthEnvelope(
                  PRIV_KEY,
                  network,
                  options
              );
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(envelope));
            } catch (err) {
              console.error(err);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: "auth_envelope_failed" }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // load all .env files (/*.env, .env.local, .env.[mode], .env.[mode].local)
  const env = loadEnv(mode, process.cwd(), "");
  const APP_ID   = env.VITE_APP_ID!;
  const PRIV_KEY = env.VITE_ANYMAL_APP_PRIV_KEY!;

  return {
    plugins: [
      react(),
      nodePolyfills({
        include: ["buffer", "process"],
        globals: { Buffer: true, global: true, process: true },
        protocolImports: false,
      }),
      // only hook our proxy in development:
      mode === "development" && localSignatureProxy(APP_ID, PRIV_KEY),
      mode === "development" && localAuthEnvelopeProxy(PRIV_KEY),
    ].filter(Boolean),

    server: {
      port: 5173,
    },
  };
});