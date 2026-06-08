import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL  as string;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase =
  supabaseUrl && supabaseAnon && !supabaseAnon.includes("your-anon")
    ? createClient(supabaseUrl, supabaseAnon)
    : null;
