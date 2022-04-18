import api from '../../services/api'
import { handleError } from '../../services/handleError'
import { saveTokenInLocalStorage } from '../../services/storage'
import { removeTokenInLocalStorage } from '../../services/storage'

const initState = {
  data: [],
  loading: false,
  error: '',
}

export const loginUserPostAPI = ({ dataUser, callback }) => {
  return async (ditpach) => {
    ditpach({
      type: 'PENDING',
    })
    try {
      const res = await api.post('/user/login', dataUser)
      saveTokenInLocalStorage('auth', res.data)
      callback(res.data)
      ditpach({
        type: 'POST_USER_LOGIN',
        payload: res.data,
      })
    } catch (error) {
      ditpach({
        type: 'ERROR_LOGIN',
        payload: error.response,
      })
    }
  }
}

export const logOutUserAccount = ({ callback }) => {
  return async (dispatch) => {
    dispatch({
      type: 'PENDING',
    })
    try {
      const res = await api.post('/user/logout')
      removeTokenInLocalStorage('auth')
      callback(res.data.success)
      dispatch({
        type: 'POST_USER_LOGOUT',
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const userPostAPI = ({ dataUser, callback }) => {
  return async (dispatch) => {
    dispatch({
      type: 'PENDING',
    })
    try {
      const res = await api.post('/user/register', dataUser)
      saveTokenInLocalStorage('auth', res.data)
      callback(res.data)
      dispatch({
        type: 'ADD_ACCOUNT_USER',
        payload: res.data,
      })
    } catch (error) {
      const err = error.response
      dispatch({
        type: 'ERROR_REGISTER',
        payload: err.data,
      })
    }
  }
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'PENDING':
      return { ...state, loading: true }
    case 'POST_USER_LOGIN':
      handleError('LOGIN_SUCCESS')
      return { ...state, data: action.payload, loading: false }
    case 'POST_USER_LOGOUT':
      return { ...state, loading: false }
    case 'ADD_ACCOUNT_USER':
      handleError('REGISTER_SUCCESS')
      return { ...state, data: action.payload, loading: false }
    case 'ERROR_REGISTER':
      const errorFormat = action.payload.slice(0, action.payload.indexOf('{'))
      handleError(errorFormat)
      return { ...state, error: errorFormat }
    case 'ERROR_LOGIN':
      const err = action.payload
      handleError(err.data)
      return { ...state, error: action.payload }
    default:
      return state
  }
}

export default authReducer
