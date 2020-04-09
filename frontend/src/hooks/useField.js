import { useState } from 'react'

const useField = (type, state) => {
  const setState = state ? state : ''
  const [value, setValue] = useState(setState)

  const onChange = (e) => {
    setValue(e.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return [{ value, type, onChange }, reset, setValue]
}

export default useField