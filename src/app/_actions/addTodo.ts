'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { formatDate } from '@/utils/dateFormatter'
import { Priority } from '@/constants/todos'

export async function addTodo(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const title = formData.get('title') || ''
  const description = formData.get('description') || ''
  const priority = formData.get('priority') || Priority.P4
  const dueDate = formData.get('due_date') || formatDate(new Date())
  const completed = Boolean(formData.get('completed'))

  const { error } = await supabase.from('todos').insert({
    title,
    description,
    priority,
    due_date: dueDate,
    completed,
  })

  if (error) {
    throw new Error(`Failed to add todo: ${error.message}`)
  }

  revalidatePath('/')
  redirect('/')
}