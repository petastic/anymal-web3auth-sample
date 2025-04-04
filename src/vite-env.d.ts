/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_PUBLIC_GRAPHQL_ENDPOINT: string;
  readonly VITE_PUBLIC_WEB3AUTH_CLIENT_ID: string;
  readonly VITE_PUBLIC_AUTH_SERVICE_BASE_URL: string;
  readonly VITE_KIBBLE_TOKEN_PROXY_ADDRESS: string;
  readonly VITE_PUBLIC_CHAIN_RPC_TARGET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
