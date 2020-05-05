import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import { connect } from 'react-redux'

const GlobalAlert = ({ toasts }) => {
  const [closedToasts, setClosedToasts] = useState([])

  const closeToast = id => {
    setClosedToasts(closedToasts.concat(id))
  }

  const toastsToShow = toasts.filter(t => !closedToasts.includes(t.id))

  if (toastsToShow.length > 0) {
    return (
      <div>
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            minHeight: '100px',
          }}
        >
          {toastsToShow.map(t => (
            <div key={t.id}>
              <Toast
                style={{
                  position: 'relative',
                  top: 0,
                  right: 0,
                }}
                animation="false"
                onClose={() => closeToast(t.id)}
              >
                <Toast.Header>
                  <strong className="mr-auto">{t.header}</strong>
                </Toast.Header>
                <Toast.Body>{t.body}</Toast.Body>
              </Toast>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

const mapStateToProps = state => {
  return {
    toasts: state,
  }
}

export default connect(mapStateToProps)(GlobalAlert)
