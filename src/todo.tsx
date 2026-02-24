import type { todoType } from './types/todoType'
import { RiCloseLine, RiDeleteBinLine, RiEdit2Line, RiSave3Line } from './assets/icons'
import { useState } from 'react'
import pencil from './assets/audio/pencil_check_mark_1-88805.mp3'
const pencilMp3 = new Audio(pencil)

type Props = {
  todos: todoType[]
  setTodos: React.Dispatch<React.SetStateAction<todoType[]>>
}

export const Todo = ({ todos, setTodos }: Props) => {
  const [isEdit, setIsEdit] = useState(false)
  const toggleTodo = (id: number, checked: boolean) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: checked } : todo)))
    if (checked) pencilMp3.play()
  }

  return (
    <>
      {!todos.length ? (
        <p className="flex w-full justify-center text-xl text-neutral-500 italic">No pending To-Do</p>
      ) : (
        <ul className="w-full">
          {todos.map((todo) => (
            <li
              key={todo.id}
              title={new Date(todo.id).toString()}
              className="m-4 flex h-12 w-full items-center justify-between rounded-lg px-4 outline-1 outline-neutral-600"
            >
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                  className="cursor-pointer"
                />
                <AddAt todoProps={todo} />
                <p
                  className={`text-neutral-300 ${todo.done ? 'text-neutral-400 line-through decoration-blue-500' : ''}`}
                  onDoubleClick={() => setIsEdit(!isEdit)}
                >
                  {todo.name}
                </p>
              </div>
              <Btns />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

const Btns = () => {
  const [isEdit, setIsEdit] = useState(false)

  return (
    <div className="flex gap-5">
      {isEdit ? (
        <>
          <button className="from-button hover:text-blue-500">
            <RiSave3Line />
          </button>
          <button className="from-button hover:bg-neutral-700" onClick={() => setIsEdit(!isEdit)}>
            <RiCloseLine />
          </button>
        </>
      ) : (
        <>
          <button className="from-button hover:text-green-500" onClick={() => setIsEdit(!isEdit)}>
            <RiEdit2Line />
          </button>
          <button className="from-button hover:text-red-500">
            <RiDeleteBinLine />
          </button>
        </>
      )}
    </div>
  )
}

const AddAt = ({ todoProps }: { todoProps: todoType }) => {
  const now = new Date(todoProps.id),
    hour = now.getHours().toString().padStart(2, '0'),
    minute = now.getMinutes().toString().padStart(2, '0')

  return (
    <time dateTime={todoProps.id.toString()} className="font-mono text-xs text-neutral-500">
      {hour}:{minute}
    </time>
  )
}
