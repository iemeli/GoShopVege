import React from 'react'
import { Alert } from 'react-bootstrap'
import { connect } from 'react-redux'

const GlobalAlert = ({ variant, message }) => {
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
}

const mapStateToProps = state => {
  return {
    variant: state.variant,
    message: state.message,
  }
}

export default connect(mapStateToProps)(GlobalAlert)
