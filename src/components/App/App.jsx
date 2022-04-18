import React, { Suspense } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import store from '../../store'
import RootLayout from './RootLayout'
import Page404 from '../../pages/404'
import LoginPage from '../../pages/Login'
import ToDoListPage from '../../pages/TodoList'
import ProfilePage from '../../pages/Profile'
import RegisterPage from '../../pages/Register'
import { ProtectedPrivateRoutes, ProtectedPublicRoutes } from './ProtectedRoute'
import ToDoHome from '../ToDo/TodoHome'
const App = () => {
  return (
    <Suspense fallback="loading">
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedPrivateRoutes>
                  <RootLayout />
                </ProtectedPrivateRoutes>
              }
            >
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/todo-list" element={<ToDoListPage />} />
              <Route path="/" element={<ToDoHome />} />
            </Route>
            <Route
              path="/"
              element={
                <ProtectedPublicRoutes>
                  <RootLayout />
                </ProtectedPublicRoutes>
              }
            >
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </ReduxProvider>
    </Suspense>
  )
}

export default App
