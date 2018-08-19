import React from 'react'

const Notification = ({ message, status }) => {
    console.log(status)
    if (message === null) {
      return null
    }
    return (
      <div className={status}>
        {message}
      </div>
    )
  }

export default Notification