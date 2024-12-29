'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addTodo(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const title = formData.get('title') || ''
  const description = formData.get('description') || ''
  const priority = formData.get('priority') || ''
  const dueDate = formData.get('due_date') || ''
  const completed = formData.get('completed')

  console.log({
    title,
    description,
    priority,
    due_date: dueDate,
    completed,
  })

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

  // Оновлюємо кеш і редиректимо
  revalidatePath('/')
  redirect('/')
}