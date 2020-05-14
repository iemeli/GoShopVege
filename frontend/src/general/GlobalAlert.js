import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import { connect } from 'react-redux'
import '../css/globalAlert.css'

const GlobalAlert = ({ toasts }) => {
  const [closedToasts, setClosedToasts] = useState([])

  if (toasts.length === 0) {
    return null
  }

  const closeToast = id => {
    setClosedToasts(closedToasts.concat(id))
  }

  const toastsToShow = toasts.filter(t => !closedToasts.includes(t.id))

  if (toastsToShow.length > 0) {
    return (
      <div>
        <div aria-live="polite" aria-atomic="true" className="toast-container">
          {toastsToShow.map(t => (
            <div key={t.id}>
              <Toast
                className="toast-box"
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
    toasts: state.alerts,
  }
}

export default connect(mapStateToProps)(GlobalAlert)
