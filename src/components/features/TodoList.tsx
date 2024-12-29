import { getTodos } from '@/app/_actions/getTodos'
import { Button } from '@/components/ui/button'
import { deleteTodo } from '@/app/_actions/deleteTodo'

export default async function TodoList() {
  const { data: todos } = await getTodos()

  if (!todos?.length) {
    return (
      <div>Empty List</div>
    )
  }

  return (
    <div>
      <h1 className='text-xl font-bold mb-4'>Список задач</h1>
      <ul className='list-disc pl-6'>
        {todos?.map((todo) => (
          <li key={todo.id} className='mb-2'>
            <strong>{todo.title}</strong>: {todo.description}
            <form action={deleteTodo}>
              <input type='hidden' name='id' value={todo.id} />
              <Button type='submit'>Delete</Button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  )
}

