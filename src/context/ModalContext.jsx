import { createContext, useContext, useState } from 'react'

const ModalContext = createContext(null)

export function ModalProvider({ children }) {
  const [activeModal, setActiveModal] = useState(null)

  const openRegistration = () => setActiveModal('registration')
  const openLogin = () => setActiveModal('login')
  const closeModal = () => setActiveModal(null)

  return (
    <ModalContext.Provider value={{ activeModal, openRegistration, openLogin, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within ModalProvider')
  }
  return context
}