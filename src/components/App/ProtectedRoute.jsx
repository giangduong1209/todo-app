import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTokenInLocalStorage } from '../../services/storage'

export const useAuth = () => {
  let loginStatus = false
  const tokenLocal = getTokenInLocalStorage('auth')
  if (tokenLocal !== 'auth') loginStatus = true
  return loginStatus
}

export const ProtectedPublicRoutes = ({ children }) => {
  const isPublicAuth = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (isPublicAuth) navigate('/todo-list')
  }, [isPublicAuth])
  return children
}

export const ProtectedPrivateRoutes = ({ children }) => {
  const isPrivateAuth = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (!isPrivateAuth) navigate('/login')
  }, [isPrivateAuth])
  return children
}
