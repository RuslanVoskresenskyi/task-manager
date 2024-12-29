'use server'

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteTodo(formData: FormData) {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const todoId = formData.get('id')
  
  if (!todoId) {
    throw new Error('Todo ID is required but was not provided.')
  }

  const { error } = await supabase
    .from('todos')
    .delete()
    .eq('id', todoId)

  if (error) {
    throw new Error(`Failed to delete todo: ${error.message}`)
  }

  revalidatePath('/')

  redirect('/')
}