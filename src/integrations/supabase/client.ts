import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gbqhignuzmzcmjjaubvr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdicWhpZ251em16Y21qamF1YnZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMzMwMjgsImV4cCI6MjA3MzYwOTAyOH0.CTQVsbmRlwIqp7c9JeCgCGAHlYicNr01zRt0l3lmtFg";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : null,
    persistSession: true,
    autoRefreshToken: true,
  }
});