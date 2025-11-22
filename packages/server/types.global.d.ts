declare module "bun" {
  interface Env {
    PORT: number;
    POSTGRES_CONNECTION_URL: string;
    CLERK_SECRET_KEY: string;
    CLERK_PUBLISHABLE_KEY: string;
  }
}
