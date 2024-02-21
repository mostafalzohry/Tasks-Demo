import { useState } from 'react'
import clsx from 'clsx'
import TodoItem from '../components/TodoItem'
import Heading from '../components/Heading'
import TodoPopup from '../components/TodoPopup'
import ToggleButton from '../components/ToggleButton'
import { useTodos } from '../contexts/Tasks'
import { TodoItemProps } from '../contexts/Tasks/type'
import SearchIcon from '../components/icons/SearchIcon'
import { useAuth } from '../contexts/Tasks/authcontext' // Import the useAuth hook

interface TodoPopupData {
  index: number | null
  item: TodoItemProps
}

const Home = () => {
  const todos = useTodos()
  const user = useAuth() // Get the current user from the AuthContext

  const [searchTerm, setSearchTerm] = useState('')
  const [isShowCompletedTodos, setIsShowCompletedTodos] = useState(false)
  const [todoPopupData, setTodoPopupData] = useState<TodoPopupData | null>(null)

  const handleOpenTodoPopup = (index: number | null, item: TodoItemProps) => {
    setTodoPopupData({
      index,
      item,
    })
  }

  const getTodoItem = (isShow: boolean, index: number, item: TodoItemProps) => {
    if (!isShow || !item.value.includes(searchTerm)) return null

    return (
      <TodoItem
        key={index}
        item={item}
        index={index}
        searchTerm={searchTerm}
        onEditTodoItem={() => {
          setTodoPopupData({
            index,
            item,
          })
        }}
      />
    )
  }

  return (
    <div className='flex min-h-screen items-center bg-gray-50'>
      {todoPopupData && (
        <TodoPopup
          onClosePopup={() => setTodoPopupData(null)}
          index={todoPopupData.index}
          data={todoPopupData.item}
          status={todoPopupData.item.status}
        />
      )}

      <div className={clsx('mx-auto w-full max-w-3xl px-4 py-6')}>
        <Heading />

        <div className='pt-5'>
          <div className='flex items-center gap-3'>
            <div className='relative w-full'>
              <input
                type='search'
                className={clsx(
                  'w-full bg-gray-50 p-4',
                  'rounded-lg border border-gray-300',
                  'text-gray-900',
                  'focus:border-blue-500 focus:ring-blue-500',
                )}
                placeholder='Search Todos'
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <button
                type='button'
                className={clsx(
                  'absolute bottom-2 right-2 top-2',
                  'rounded-lg bg-blue-700 px-4',
                  'hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300',
                )}
              >
                <SearchIcon />
              </button>
            </div>

            <button
              onClick={() =>
                handleOpenTodoPopup(null, {
                  value: '',
                  description: '',
                  status: 'Not Started', // Provide a default status value
                  isChecked: false,
                })
              }
              type='button'
              className={clsx(
                'rounded-lg bg-emerald-700 px-4 py-2.5',
                'font-medium text-white',
                'hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300',
              )}
            >
              Add&nbsp;Task
            </button>
          </div>
        </div>

        <div className='py-3'>
          <div className=' grid grid-cols-2 gap-2'>
            {todos?.map((item, index) =>
              getTodoItem(!item.isChecked, index, item),
            )}
          </div>

          <ToggleButton
            onToggle={() => setIsShowCompletedTodos(!isShowCompletedTodos)}
            todosAmount={
              todos?.filter(
                (item) => item.isChecked && item.value.includes(searchTerm),
              ).length || 0
            }
            isShow={isShowCompletedTodos}
          />
          <div className=' grid grid-cols-2 gap-2'>
            {isShowCompletedTodos &&
              todos?.map((item, index) =>
                getTodoItem(item.isChecked, index, item),
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
