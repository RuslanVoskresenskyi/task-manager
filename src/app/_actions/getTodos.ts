import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Todo } from '@/types/Todo'

export async function getTodos() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data, error } = await supabase.from('todos').select()

  if (error) {
    throw new Error(`Failed to get todos: ${error.message}`)
  }

  return { data: data as Todo[] }
}