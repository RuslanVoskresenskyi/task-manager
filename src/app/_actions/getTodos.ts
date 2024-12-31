import { cookies } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { Todo } from '@/types/Todo'
import { SearchParams } from '@/types/SearchParams'
import { Priority, Completion, SortBy } from '@/constants/todos'

export async function getTodos({ searchParams }: { searchParams: SearchParams }) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  let query = supabase.from('todos').select()

  const { priority, completion, due_date, sortBy } = searchParams

  if (priority && priority !== Priority.ANY) {
    query = query.eq('priority', priority)
  }

  if (completion && completion !== Completion.ALL) {
    query = query.eq('completed', completion === Completion.COMPLETED)
  }

  if (due_date) {
    query = query.eq('due_date', due_date)
  }

  if (sortBy) {
    query = query.order(sortBy, { ascending: true })
  }

  const { data, error } = await query

  if (error) {
    throw new Error(`Failed to get todos: ${error.message}`)
  }

  return { data: data as Todo[] }
}