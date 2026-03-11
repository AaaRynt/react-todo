import { useInput } from './hooks/useInput'
import type { todoType } from './types/todoType'
import { RiMenuAddLine } from './assets/icons'
import { Button } from 'antd'
import { ConfigProvider, theme } from 'antd'
const { darkAlgorithm } = theme

type Props = {
  setTodos: React.Dispatch<React.SetStateAction<todoType[]>>
}

export const Input = ({ setTodos }: Props) => {
  const input = useInput('')
  const add = () => {
    if (!input.value.trim()) return
    setTodos((prev) => [{ name: input.value, id: Date.now(), done: false }, ...prev])
    input.reset()
  }

  return (
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
      <ConfigProvider
        theme={{
          algorithm: darkAlgorithm,
        }}
      >
        <Button
          ghost
          color="primary"
          variant="outlined"
          size={'large'}
          icon={<RiMenuAddLine className="w-3/5" />}
          onClick={add}
        ></Button>
      </ConfigProvider>
    </div>
  )
}
