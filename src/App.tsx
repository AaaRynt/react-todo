import { useState } from 'react'
import type { todoType } from './types/todoType'
import { Input } from './input'
import { Todo } from './todo'
import { Footer } from './footer'

export default function App() {
  const [todoRaw, setTodoRaw] = useState<todoType[]>([])

  return (
    <>
      <main className="flex w-7/8 flex-col items-center gap-4 rounded-xl bg-neutral-800 p-8 shadow-xl">
        <h1 className="change-color justify-center text-4xl font-bold tracking-wider">To-Do list</h1>
        <Input setTodos={setTodoRaw} />
        <div className="justify-between text-gray-500">
          <span>Total:{todoRaw.length}</span>
          <span>Finish:{todoRaw.filter((t) => t.done).length}</span>
        </div>
        <Todo todos={todoRaw} setTodos={setTodoRaw} />
      </main>
      <Footer />
    </>
  )
}
