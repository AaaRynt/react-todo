import { useState } from 'react'
import { RiMenuAddLine } from './assets/icons'
import type { todoType } from './types/todoType'
import { Todo } from './todo'
import { useInput } from './hooks/useInput'
import { Footer } from './footer'

export default function App() {
  const input = useInput('')
  const [todoRaw, setTodoRaw] = useState<todoType[]>([])

  const add = () => {
    if (!input.value.trim()) return

    setTodoRaw([{ name: input.value, id: Date.now(), done: false }, ...todoRaw])
    input.reset()
  }

  return (
    <>
      <main className="flex w-7/8 flex-col items-center gap-4 rounded-lg bg-neutral-800 p-8 shadow-xl">
        <h1 className="change-color justify-center text-4xl font-bold tracking-wider">To-Do list</h1>
        <div className="w-full flex-row gap-8">
          <input
            type="text"
            placeholder="Add a new ToDo..."
            {...input}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                add()
              }
            }}
            className="h-10 flex-1 items-center justify-center rounded-sm px-4 outline placeholder:text-neutral-600 focus:outline-blue-500"
          />
          <button className="from-button h-10 w-10 outline hover:text-[rgb(88,196,220)]" onClick={add}>
            <RiMenuAddLine className="w-3/5" />
          </button>
        </div>
        <div className="justify-between text-gray-500">
          <span>Total:{todoRaw.length}</span>
          <span>Finish: {todoRaw.filter((todo) => todo.done).length}</span>
        </div>
        <Todo todos={todoRaw} setTodos={setTodoRaw} />
      </main>

      <Footer />
    </>
  )
}
