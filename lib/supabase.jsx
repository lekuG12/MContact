import { createClient } from "@supabase/supabase-js";

const URL = "https://pgslibypffrtstkilzsx.supabase.co";
const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnc2xpYnlwZmZydHN0a2lsenN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA1MTI5MDUsImV4cCI6MjA4NjA4ODkwNX0.NyBTYi66n6YC107Ji5-F0CkYBoEORYckXydAZu0VAnI"

export const supabase = createClient(URL, KEY);