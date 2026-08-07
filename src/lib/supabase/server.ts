import { createClient } from '@supabase/supabase-js';

import type { Database } from '@/types/database';

/**
 * Server-side Supabase client.
 *
 * Uses the anon key, not the service role key: every content table is
 * RLS-protected for public read, so the anon key is sufficient and keeps
 * the blast radius at zero if it ever leaks (ADR-0006, schema.sql).
 *
 * All primary content is fetched through this in server components — never
 * client-side, to avoid request waterfalls before first paint.
 */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Copy .env.example to .env.local and fill it in.'
    );
  }

  return createClient<Database>(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
