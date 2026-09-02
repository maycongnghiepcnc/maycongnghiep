import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function main() {
  const { data: users, error } = await supabase.from('user_roles').select('*')
  console.log('user_roles:', users)
  if (error) console.error(error)

  const { data: profiles, error: err2 } = await supabase.from('profiles').select('*')
  console.log('profiles:', profiles)
  if (err2) console.error(err2)
}

main()
