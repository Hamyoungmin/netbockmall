import { createClient } from '@supabase/supabase-js'

// Supabase 프로젝트 URL과 anon key를 입력하세요
// https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api 에서 확인 가능
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

