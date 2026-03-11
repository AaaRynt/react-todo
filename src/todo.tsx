import { useState } from 'react'
import type { todoType } from './types/todoType'
import { RiCloseLine, RiDeleteBinLine, RiEdit2Line, RiSave3Line } from './assets/icons'
import pencil from './assets/audio/pencil_check_mark_1-88805.mp3'
import trash from './assets/audio/drag to trash.mp3'
import { Button, Modal, Popconfirm, ConfigProvider, theme } from 'antd'

const { darkAlgorithm } = theme

type Props = {
  todos: todoType[]
  setTodos: React.Dispatch<React.SetStateAction<todoType[]>>
}
type BtnProps = {
  todo: todoType
  setTodos: React.Dispatch<React.SetStateAction<todoType[]>>
  editingId: number | null
  setEditingId: React.Dispatch<React.SetStateAction<number | null>>
  setEditingValue: React.Dispatch<React.SetStateAction<string>>
  save: (id: number) => void
}

const pencilMp3 = new Audio(pencil)
const trashMp3 = new Audio(trash)

export const Todo = ({ todos, setTodos }: Props) => {
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingValue, setEditingValue] = useState('')

  const toggleTodo = (id: number, checked: boolean) => {
    if (checked) pencilMp3.play()
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: checked } : todo)))
  }

  const save = (id: number) => {
    if (!editingValue.trim()) return
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, name: editingValue } : t)))
    setEditingId(null)
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
                {todo.id === editingId ? (
                  <div className="h-3.25 w-3.25"></div>
                ) : (
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={(e) => toggleTodo(todo.id, e.target.checked)}
                    className="cursor-pointer"
                  />
                )}

                <AddAt todoProps={todo} />
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editingValue}
                    onChange={(e) => setEditingValue(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') save(todo.id)
                    }}
                    className="rounded-sm pl-2 outline"
                  />
                ) : (
                  <p
                    className={`${
                      todo.done ? 'text-neutral-400 line-through decoration-blue-500' : 'text-neutral-300 no-underline'
                    }`}
                    onDoubleClick={() => {
                      if (todo.id === editingId) return
                      setEditingId(todo.id)
                      setEditingValue(todo.name)
                    }}
                  >
                    {todo.name}
                  </p>
                )}
              </div>
              <Btns
                todo={todo}
                setTodos={setTodos}
                editingId={editingId}
                setEditingId={setEditingId}
                setEditingValue={setEditingValue}
                save={save}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

const Btns = ({ todo, setTodos, editingId, setEditingId, setEditingValue, save }: BtnProps) => {
  const isEditing = editingId === todo.id

  return (
    <div className="flex gap-5">
      {isEditing ? (
        <>
          <button className="from-button hover:text-blue-500" onClick={() => save(todo.id)}>
            <RiSave3Line />
          </button>
          <button className="from-button hover:bg-neutral-700" onClick={() => setEditingId(null)}>
            <RiCloseLine />
          </button>
        </>
      ) : (
        <>
          {todo.done ? '' : <ModalButton todo={todo} setTodos={setTodos} />}
          <Confirm todo={todo} setTodos={setTodos} />
          {todo.done ? (
            ''
          ) : (
            <button
              className="from-button hover:text-green-500"
              onClick={() => {
                setEditingId(todo.id)
                setEditingValue(todo.name)
              }}
            >
              <RiEdit2Line />
            </button>
          )}
          <button
            className="from-button! delete hover:text-red-500!"
            onClick={() => {
              trashMp3.play()
              setTodos((p) => p.filter((t) => todo.id !== t.id))
            }}
          >
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

// 修复后的 ModalButton 组件
const ModalButton: React.FC<{
  todo: todoType
  setTodos: React.Dispatch<React.SetStateAction<todoType[]>>
}> = ({ todo, setTodos }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [localValue, setLocalValue] = useState(todo.name)

  const showModal = () => {
    setLocalValue(todo.name) // 打开Modal时用当前todo的值初始化
    setIsModalOpen(true)
  }

  const handleOk = () => {
    if (localValue.trim()) {
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...t, name: localValue } : t)))
      setIsModalOpen(false)
    }
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
      <Button type="primary" onClick={showModal} size="small" ghost icon={<RiEdit2Line className="w-3/5" />} />
      <Modal title="EDITING..." open={isModalOpen} onOk={handleOk} onCancel={handleCancel} mask={false}>
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          className="w-full! rounded-sm! pl-2 outline-1! outline-white!"
          placeholder="new To-Do"
          autoFocus
        />
      </Modal>
    </ConfigProvider>
  )
}

const Confirm: React.FC<{
  todo: todoType
  setTodos: React.Dispatch<React.SetStateAction<todoType[]>>
}> = ({ todo, setTodos }) => (
  <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
    <Popconfirm
      title="Delete this To-Do?"
      okText="Yes"
      cancelText="No"
      placement="leftBottom"
      onConfirm={() => {
        trashMp3.play()
        setTodos((p) => p.filter((t) => todo.id !== t.id))
      }}
    >
      <Button danger size="small" ghost icon={<RiDeleteBinLine className="w-3/5" />} className="delete" />
    </Popconfirm>
  </ConfigProvider>
)
