import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://dsqztwrcnqpfgdbmnurb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzcXp0d3JjbnFwZmdkYm1udXJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MjE5ODUsImV4cCI6MjAyNDE5Nzk4NX0.hEs8oFQqad4mJ2hKfG6v2o3Np8nszCFXeUNPzWzJFX0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;