import { createClient, createAdminClient } from "@insforge/sdk";

const baseUrl =
  process.env.NEXT_PUBLIC_INSFORGE_URL || "https://f2cgcd9x.ap-southeast.insforge.app";
const anonKey =
  process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY || "ik_8889277939d681a3aaa80f80c3cd1bc7";

export const insforge = createClient({
  baseUrl,
  anonKey,
});

export const insforgeAdmin = createAdminClient({
  baseUrl,
  apiKey: process.env.INSFORGE_API_KEY || anonKey,
});
