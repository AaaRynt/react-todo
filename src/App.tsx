import { useState } from 'react'
import { RiMenuAddLine, RiGithubFill } from './assets/icons'

export default function App() {
  type Todo = {
    todo: string
    id: number
  }
  const [todoRaw, setTodoRaw] = useState<Todo[]>([
    { todo: 'hello', id: 1 },
    { todo: 'world', id: 2 },
  ])
  return (
    <>
      <main className="flex w-7/8 flex-col items-center gap-4 rounded-lg bg-gray-800 p-8 shadow-xl">
        <h1 className="justify-center text-4xl font-bold tracking-wider">To-Do list</h1>
        <div className="w-full flex-row gap-8">
          <input
            type="text"
            placeholder="Add a new ToDo..."
            className="flex-1 items-center justify-center rounded-sm px-4 outline placeholder:text-neutral-600 focus:outline-blue-500 dark:h-10"
          />
          <button
            className="flex h-10 w-10 items-center justify-center rounded-sm outline duration-300 ease-in-out hover:text-[rgb(88,196,220)]"
            onClick={() => setTodoRaw([...todoRaw, { todo: 'world', id: 2 }])}
          >
            <RiMenuAddLine className="w-2/3" />
          </button>
        </div>
        <div className="justify-between text-neutral-700">
          <span>Total:{todoRaw.length}</span>
          <span>Finish:</span>
        </div>
        <ul className="w-full">
          {todoRaw.map((todo) => (
            <li key={todo.id} className="m-4 flex h-12 w-full items-center rounded-lg bg-slate-800 outline">
              {todo.todo}
            </li>
          ))}
        </ul>
      </main>
      <footer>
        <a href="https://github.com/AaaRynt/react-todo" target="_blank" className="flex hover:underline">
          <RiGithubFill className="mr-4 h-6" />
          <span> github.com/AaaRynt/react-todo</span>
        </a>
      </footer>
    </>
  )
}
