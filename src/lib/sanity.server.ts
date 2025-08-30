// src/lib/sanity.server.ts

import { createClient } from 'next-sanity'

// This client is used for server-side mutations and requires a write token.
// Do NOT use this client for client-side fetching.
export const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8s8ujgvp',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-08-30',
  useCdn: false, // Must be false for write operations
  token: process.env.NEXT_PUBLIC_SANITY_API_WRITE_TOKEN, // Required for write operations
});
