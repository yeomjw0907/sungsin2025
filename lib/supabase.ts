import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  if (!url || !anonKey) return null;
  if (!client) {
    client = createClient(url, anonKey);
  }
  return client;
}

export async function getSiteConfig(keys: string[]): Promise<Record<string, string>> {
  const supabase = getSupabase();
  if (!supabase) return {};

  const { data, error } = await supabase
    .from('site_config')
    .select('key, value')
    .in('key', keys);

  if (error) {
    console.warn('[site_config]', error.message);
    return {};
  }

  const result: Record<string, string> = {};
  (data || []).forEach((row: { key: string; value: string }) => {
    result[row.key] = row.value ?? '';
  });
  return result;
}
