'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Priority, Completion, SortBy } from '@/constants/todos'
import { SearchParams } from '@/types/SearchParams'

const FiltersTodos = ({ searchParams }: { searchParams: SearchParams }) => {
  const router = useRouter()

  const handleReset = () => {
    router.push('/')
  }

  const formatValue = (value: string) => {
    return value
      .toLowerCase()
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
  }

  return (
    <div className='p-6 bg-gray-50 rounded-lg shadow-md'>
      <h2 className='text-lg font-semibold mb-4'>Filters</h2>
      <form className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Priority</label>
          <Select 
            name='priority'
            defaultValue={searchParams?.priority || Priority.ANY}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select priority' />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Priority).map((value) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Completion Status</label>
          <Select
            name='completion'
            defaultValue={searchParams?.completion || Completion.ALL}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select status' />
            </SelectTrigger>
            <SelectContent>
              {Object.values(Completion).map((value) => (
                <SelectItem key={value} value={value}>
                  {formatValue(value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Sort By</label>
          <Select
            name='sortBy'
            defaultValue={searchParams?.sortBy || SortBy.TITLE}
          >
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select sort option' />
            </SelectTrigger>
            <SelectContent>
              {Object.values(SortBy).map((value) => (
                <SelectItem key={value} value={value}>
                  {formatValue(value)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-1'>Due Date</label>
          <Input
            type='date'
            name='due_date'
            className='w-full'
            defaultValue={searchParams?.due_date || ''}
          />
        </div>

        <div className='col-span-full flex justify-end space-x-4 mt-4'>
          <Button
            type='button'
            onClick={handleReset}
            className='bg-gray-300 text-gray-700 hover:bg-gray-400'
          >
            Reset
          </Button>
          <Button type='submit' className='bg-blue-500 text-white hover:bg-blue-600'>
            Apply Filters
          </Button>
        </div>
      </form>
    </div>
  )
}

export default FiltersTodos