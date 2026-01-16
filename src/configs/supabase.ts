import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://syldbpgluqwzlhnuekec.supabase.co'; // e.g., https://xxxxx.supabase.co
const supabaseAnonKey = 'sb_publishable_-G_tPiF1riynvfAAva3yBA_jMIdjFEz';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
