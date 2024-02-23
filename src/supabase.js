import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nfijrwqsgbvhkqgiwzwc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maWpyd3FzZ2J2aGtxZ2l3endjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2OTA4NDEsImV4cCI6MjAyNDI2Njg0MX0.d12a6k_jJ7-c6dDXPfkk-cn5PjU_MlfbRTllR0SviUM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
