import { createClient } from '@supabase/supabase-js'

// Reemplaza con tus datos
const supabaseUrl = 'https://xtfjdgxbmcwociuisqzd.supabase.co'
const supabaseKey = 'sb_publishable_65ogjhRZAyBeIFzX9puU0A_W7SdfRN5'

const supabase = createClient(supabaseUrl, supabaseKey)

//autenticación
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'correo@gmail.com',
  password: '123456'
})