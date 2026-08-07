'use client';

import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/types/database';

/**
 * Browser Supabase client.
 *
 * Reserved for future client-only reads. v1 has none: all content is
 * server-fetched, and the contact form writes through a server action, not
 * a direct client insert (api-contracts.md Contract 2, FR-008).
 *
 * ponytail: module-level singleton, no session handling — there is no auth
 * flow in v1 (ADR-0006). Revisit if a client-authenticated feature lands.
 */
export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Copy .env.example to .env.local and fill it in.'
    );
  }

  return createClient<Database>(url, anonKey);
}
