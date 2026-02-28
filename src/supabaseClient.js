// 1. 부품 가져오기
import { createClient } from '@supabase/supabase-js'

// 2. 접속 정보 설정(안내 데스크 정보)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 3. 실제 연결 통로 만들기(초기화)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)