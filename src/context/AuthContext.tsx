import React, { createContext, useContext, useState } from 'react'

interface AuthContextType {
  isAuthenticated: boolean;
  login: (name?: string) => void;
  logout: () => void;
  user?: { name: string } | null;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  isAuthModalOpen: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ name: string } | null>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  function login(name = 'You') {
    setIsAuthenticated(true)
    setUser({ name })
    setIsAuthModalOpen(false)
  }
  function logout() {
    setIsAuthenticated(false)
    setUser(null)
  }
  function openAuthModal() {
    setIsAuthModalOpen(true)
  }
  function closeAuthModal() {
    setIsAuthModalOpen(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, openAuthModal, closeAuthModal, isAuthModalOpen }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
