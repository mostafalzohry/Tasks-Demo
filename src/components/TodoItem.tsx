import DeleteIcon from './icons/DeleteIcon'
import EditIcon from './icons/EditIcon'
import CheckIcon from './icons/CheckIcon'
import { TodoItemProps, todosActionKind } from '../contexts/Tasks/type'
import { useTodosDispatch } from '../contexts/Tasks'
import clsx from 'clsx'

interface TodoItemInterface {
  searchTerm: string
  item: TodoItemProps
  index: number
  onEditTodoItem: () => void
}

const TodoItem = ({
  searchTerm,
  item,
  index,
  onEditTodoItem,
}: TodoItemInterface) => {
  const todosDispatch = useTodosDispatch()!

  const handleRemoveTodoItem = () =>
    todosDispatch({
      type: todosActionKind.REMOVE,
      payload: {
        index,
      },
    })

  const handleCheckTodoItem = () => {
    todosDispatch({
      type: todosActionKind.EDIT,
      payload: {
        index,
        value: item.value, 
        description: item.description, 
        status: "Done", 
        isChecked: !item.isChecked,
      },
    })
  }
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Not Started':
        return 'text-yellow-500 font-bold'
      case 'onProgress':
        return 'text-red-800	 font-bold' 
      case 'Done':
        return 'text-green-500 font-bold' 
      default:
        return ''
    }
  }

  return (
    <div
      className={clsx(
        'mt-2.5 flex w-full items-center justify-between bg-white p-4',
        'rounded-lg border border-gray-200 shadow',
      )}
    >
      <div>
        <span
          className='font-normal text-gray-700'
          dangerouslySetInnerHTML={{
            __html:
              searchTerm !== ''
                ? item.value.replace(
                    searchTerm,
                    `<span class="bg-blue-100 font-bold">${searchTerm}</span>`,
                  )
                : item.value,
          }}
        ></span>
        {item.description && (
          <p className='text-gray-500'>{item.description}</p>
        )}
        {item.status && (
          <p className={`text-gray-500 ${getStatusColor(item.status)}`}>
            Status: {item.status}
          </p>
        )}
      </div>

      <div className='flex flex-col gap-2'>
                <button
          onClick={handleRemoveTodoItem}
          type='button'
          className={clsx(
            'flex h-10 w-20 flex-col items-center justify-center rounded-lg bg-rose-700',
            'hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300',
          )}
        >
          <div className='mb-1'>
            <DeleteIcon />
          </div>
          <span className='text-xs text-white'>Delete</span>
        </button>
        <button
          onClick={onEditTodoItem}
          type='button'
          className={clsx(
            'flex h-10 w-20 flex-col items-center justify-center rounded-lg bg-blue-700',
            'hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300',
          )}
        >
          <div className='mb-1'>
            <EditIcon />
          </div>
          <span className='text-xs text-white'>Edit</span>
        </button>

     
        <button
          onClick={handleCheckTodoItem}
          type='button'
          className={clsx(
            item.isChecked ? 'bg-emerald-700' : 'bg-gray-400',
            'flex h-10 w-20 flex-col items-center justify-center rounded-lg',
            'hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300',
          )}
        >
          <div className='mb-1'>
            <CheckIcon />
          </div>
          <span className='text-xs text-white'>Done</span>
        </button>
      </div>
    </div>
  )
}

export default TodoItem
