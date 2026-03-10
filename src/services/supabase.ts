import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Profile = {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  city: string | null
  created_at: string
}

export type Order = {
  id: string
  user_id: string
  order_number: string
  status: string
  items: { name: string; size: string; qty: number; price: number }[]
  subtotal: number
  delivery_cost: number
  total: number
  delivery_type: string
  payment_type: string
  address: string | null
  created_at: string
}
