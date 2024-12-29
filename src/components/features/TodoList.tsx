import { getTodos } from '@/app/_actions/getTodos'
import { Button } from '@/components/ui/button'
import { deleteTodo } from '@/app/_actions/deleteTodo'
import ModalWithForm from '@/components/features/ModalWithForm'

const TodoListSection = async () => {
  const { data: todos } = await getTodos()

  if (!todos?.length) {
    return (
      <div className='flex items-center justify-center h-48'>
        <p className='text-lg font-semibold text-gray-500'>No tasks available</p>
      </div>
    )
  }

  return (
    <ul className='space-y-4'>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`p-4 bg-white shadow-md rounded-md border ${
            todo.completed ? 'border-green-400 bg-green-50' : 'border-gray-200'
          }`}
        >
          <div className='flex items-center justify-between text-sm text-gray-500 mb-2'>
            <span>
              <strong>Priority:</strong> {todo.priority}
            </span>
            <span>
              <strong>Due Date:</strong> {new Date(todo.due_date).toLocaleDateString()}
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <div>
              <h2
                className={`text-lg font-semibold ${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                }`}
              >
                {todo.title}
              </h2>
              <p className={`text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                {todo.description}
              </p>
            </div>
            <div className='flex items-center space-x-2'>
              <ModalWithForm todo={todo} isUpdate={true} />
              <form action={deleteTodo} className='inline'>
                <input type='hidden' name='id' value={todo.id} />
                <Button
                  type='submit'
                  className='bg-red-500 text-white hover:bg-red-600 focus:ring-red-400'
                >
                  Delete
                </Button>
              </form>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default TodoListSection