import React, { useState } from 'react'

export const DialogContext = React.createContext()

export const DialogContextProvider = ({ children }) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <DialogContext.Provider value={{ open, handleOpen, handleClose }}>
      {children}
    </DialogContext.Provider>
  )
}
