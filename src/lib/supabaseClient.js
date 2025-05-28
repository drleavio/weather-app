// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gmsyanwdsjggtzqiyzqm.supabase.co'; // replace with your project URL
// eslint-disable-next-line no-undef
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
