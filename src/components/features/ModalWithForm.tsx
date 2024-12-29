'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Todo } from '@/types/Todo'

type ModalWithFormProps = {
  isUpdate?: boolean;
  todo?: Todo
};

const priorities = ['Low', 'Medium', 'High']

const ModalWithForm: React.FC<ModalWithFormProps> = ({ isUpdate = false, todo }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  

  return (
    <>
      <Button onClick={openModal} className='bg-blue-500 text-white'>
        {todo ? 'Edit Todo' : 'Add Todo'}
      </Button>

      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
            <h2 className='text-xl font-bold mb-4'>{todo ? 'Edit Todo' : 'Add New Todo'}</h2>
            <form className='space-y-4'>
              <div>
                <Label htmlFor='title'>Title</Label>
                <Input
                  id='title'
                  name='title'
                  value={todo?.title}
                  required
                />
              </div>
              <div>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  name='description'
                  value={todo?.description}
                  required
                />
              </div>
              <div>
                <Label htmlFor='priority'>Priority</Label>
                <Select
                  defaultValue={todo?.priority}
                  name='priority'
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Select Priority' />
                  </SelectTrigger>
                  <SelectContent>
                    {priorities.map((priority) => (
                      <SelectItem key={priority} value={priority}>
                        {priority}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='due_date'>Due Date</Label>
                <Input
                  id='due_date'
                  name='due_date'
                  type='date'
                  value={todo?.due_date}
                  required
                />
              </div>
              <div className='flex items-center'>
                <Checkbox
                  id='completed'
                  name='completed'
                  checked={todo?.completed}
                />
                <Label htmlFor='completed' className='ml-2'>
                  Completed
                </Label>
              </div>
              <div className='flex justify-end space-x-4'>
                <Button type='button' onClick={closeModal} className='bg-gray-300'>
                  Cancel
                </Button>
                <Button type='submit' className='bg-blue-500 text-white'>
                  {todo ? 'Save Changes' : 'Add Todo'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default ModalWithForm