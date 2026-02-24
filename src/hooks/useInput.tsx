import { useState } from 'react'

export const useInput = (initial: string) => {
  const [value, setValue] = useState(initial)

  return {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value),
    reset: () => setValue(initial),
  }
}
