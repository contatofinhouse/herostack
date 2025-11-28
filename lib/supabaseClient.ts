import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wfgxstdymupgyjrxbasl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmZ3hzdGR5bXVwZ3lqcnhiYXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzNDE1MDcsImV4cCI6MjA3OTkxNzUwN30.9vs0uIXiqLzU7f8eiJuOjah9lwCc6eafwStNNXU5x8I';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);