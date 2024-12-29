import TodoListSection from '@/components/features/TodoList'
import ModalWithForm from '@/components/features/ModalWithForm'
import FiltersTodos from '@/components/features/FiltersTodos'

const Page = () => {
  return (
    <div className='p-6 max-w-4xl mx-auto space-y-8'>
      <div className='flex justify-end mb-4'>
        <ModalWithForm />
      </div>
      <FiltersTodos />
      <TodoListSection />
    </div>
  )
}

export default Page