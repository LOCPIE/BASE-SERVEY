import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://irrjgqhxtfzwjjzdonyp.supabase.co";
const SUPABASE_PUBLIC_KEY = "sb_publishable_X-iev1YSmP4TOLiZmyKgqg_M67Ut5mo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
