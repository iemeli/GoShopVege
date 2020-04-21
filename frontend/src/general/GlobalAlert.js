import React, { useState, useImperativeHandle } from 'react'
import { Alert } from 'react-bootstrap'

const GlobalAlert = React.forwardRef((props, ref) => {
  const [variant, setVariant] = useState(null)
  const [message, setMessage] = useState(null)

  const setAlert = (vrnt, msg) => {
    setVariant(vrnt)
    setMessage(msg)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  useImperativeHandle(ref, () => {
    return {
      setAlert,
    }
  })

  if (message) {
    return (
      <div>
        <Alert variant={variant}>{message}</Alert>
      </div>
    )
  }

  return (
    <div>
      <br />
      <br />
      <br />
    </div>
  )
})

export default GlobalAlert
