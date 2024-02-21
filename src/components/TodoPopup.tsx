import clsx from 'clsx'
import { FormEvent, useState } from 'react'
import { useTodosDispatch } from '../contexts/Tasks'
import { TodoItemProps, todosActionKind } from '../contexts/Tasks/type'

interface TodoPopupProps {
  onClosePopup: () => void
  index: number | null
  data: TodoItemProps
  description?: string
  status: string
}

const TodoPopup = ({ onClosePopup, index, data, status }: TodoPopupProps) => {
  const todosDispatch = useTodosDispatch()!
  const [todoValue, setTodoValue] = useState(data?.value || '')
  const [descriptionValue, setDescriptionValue] = useState(
    data?.description || '',
  )
  const [statusValue, setStatusValue] = useState(status || '')
  const [todoError, setTodoError] = useState(false)
  const [descriptionError, setDescriptionError] = useState(false)
  const [statusError, setStatusError] = useState(false)

  const handleEditTodoItem = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onClosePopup()

    if (!todoValue || !descriptionValue) {
      alert('Please fill in both todo and description fields.')
      return
    }
    console.log('status value value', statusValue)
    console.log('status value index', index)

    if (statusValue === 'Done') {
      if (index === null) {
        todosDispatch({
          type: todosActionKind.ADD,
          payload: {
            value: todoValue,
            description: descriptionValue,
            status: statusValue,
            isChecked: true,
          },
        })
      } else {
        todosDispatch({
          type: todosActionKind.EDIT,
          payload: {
            index,
            value: todoValue,
            description: descriptionValue,
            status: statusValue,
            isChecked: true,
          },
        })
      }
    } else {
      if (index === null) {
        todosDispatch({
          type: todosActionKind.ADD,
          payload: {
            value: todoValue,
            description: descriptionValue,
            status: statusValue,
            isChecked: data.isChecked,
          },
        })
      } else {
        todosDispatch({
          type: todosActionKind.EDIT,
          payload: {
            index,
            value: todoValue,
            description: descriptionValue,
            status: statusValue,
            isChecked: data.isChecked,
          },
        })
      }
    }
  }

  const validateTodo = () => {
    setTodoError(todoValue.trim() === '')
  }

  const validateDescription = () => {
    setDescriptionError(descriptionValue.trim() === '')
  }

  const validateStatus = () => {
    setStatusError(statusValue.trim() === '')
  }

  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-gray-700/60 p-4'>
      <div className='w-full max-w-md'>
        <form
          onSubmit={handleEditTodoItem}
          className='rounded-lg bg-white shadow'
        >
          <div className='p-6'>
            <input
              required
              type='text'
              className={clsx(
                'w-full bg-gray-50 p-4',
                'rounded-lg border border-gray-300',
                'text-gray-900',
                'focus:border-blue-500 focus:ring-blue-500',
              )}
              placeholder='Add Todos'
              value={todoValue}
              onChange={(event) => setTodoValue(event.target.value)}
              onBlur={validateTodo}
            />
            {todoError && (
              <p className='text-sm text-red-500'>Please enter a Task.</p>
            )}
          </div>
          <div className='p-6'>
            <input
              required
              type='text'
              className={clsx(
                'w-full bg-gray-50 p-4',
                'rounded-lg border border-gray-300',
                'text-gray-900',
                'focus:border-blue-500 focus:ring-blue-500',
              )}
              placeholder='Add Description'
              value={descriptionValue}
              onChange={(event) => setDescriptionValue(event.target.value)}
              onBlur={validateDescription}
            />
            {descriptionError && (
              <p className='text-sm text-red-500'>
                Please enter a description.
              </p>
            )}
          </div>
          <div className='p-6'>
            <select
              value={statusValue}
              onChange={(event) => setStatusValue(event.target.value)}
              onBlur={validateStatus}
              className={clsx(
                'w-full bg-gray-50 p-4',
                'rounded-lg border border-gray-300',
                'text-gray-900',
                'focus:border-blue-500 focus:ring-blue-500',
              )}
              required
            >
              <option value='Not Started'>Not Started</option>
              <option value='onProgress'>On Progress</option>
              <option value='Done'>Done</option>
            </select>
            {statusError && (
              <p className='text-sm text-red-500'>Please select a status.</p>
            )}
          </div>
          <div
            className={clsx(
              'flex items-center justify-center space-x-8 p-4',
              'rounded-b border-t border-gray-200',
            )}
          >
            <button
              type='submit'
              className={clsx(
                'rounded-lg bg-emerald-700 px-5 py-2.5',
                'text-center font-medium text-white',
                'hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300',
              )}
            >
              Save
            </button>
            <button
              onClick={onClosePopup}
              type='button'
              className={clsx(
                'bg-white px-5 py-2.5',
                'rounded-lg border border-gray-200',
                'font-medium text-gray-500',
                'hover:bg-gray-100 hover:text-gray-900',
                'focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200',
              )}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TodoPopup
