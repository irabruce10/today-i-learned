import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://mchaeiounrztidaomfpi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jaGFlaW91bnJ6dGlkYW9tZnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MjI2OTAsImV4cCI6MjAyNDE5ODY5MH0.JSIE9DnXyAHzYkLBa0NM6QDrAw7yMh-GqkvgxAwn7rA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
