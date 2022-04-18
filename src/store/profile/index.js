import api from '../../services/api'
import { handleError } from '../../services/handleError'

const initState = {
  avatar: '',
  loading: false,
  error: '',
}

export const uploadAvatar = ({ dataAvatar, callback }) => {
  return async (dispatch) => {
    dispatch({
      type: 'PENDING',
    })
    try {
      let formData = new FormData()
      formData.append('avatar', dataAvatar)
      const res = await api.post('/user/me/avatar', formData)
      dispatch({
        type: 'POST_USER_AVATAR',
        payload: res,
      })
      callback(res.data)
    } catch (error) {
      dispatch({
        type: 'ERROR_USER_AVATAR',
        payload: error,
      })
    }
  }
}

export const getUserAvatar = ({ idUser, callback }) => {
  return async (dispatch) => {
    dispatch({
      type: 'PENDING',
    })
    try {
      const res = await api.get(`/user/${idUser}/avatar`)
      dispatch({
        type: 'GET_USER_AVATAR',
        payload: res.config.baseURL + res.config.url,
      })
      callback(res.config.baseURL + res.config.url)
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteAvatar = ({ callback }) => {
  return async (dispatch) => {
    dispatch({
      type: 'PENDING',
    })
    try {
      const res = await api.delete('/user/me/avatar')
      dispatch({
        type: 'DELETE_USER_AVATAR',
        payload: res,
      })
      callback(res.data)
    } catch (error) {
      console.log(error)
    }
  }
}

const uploadAvatarReducer = (state = initState, action) => {
  switch (action.type) {
    case 'PENDING':
      return { ...state, loading: true }
    case 'POST_USER_AVATAR':
      handleError('POST_USER_AVATAR_SUCCESS')
      return { ...state, loading: false, avatar: action.payload }
    case 'DELETE_USER_AVATAR':
      return { ...state, loading: true, avatar: action.payload }
    case 'ERROR_USER_AVATAR':
      handleError('POST_USER_AVATAR_FAILED')
      return { ...state, loading: true, error: action.payload }
    case 'GET_USER_AVATAR':
      return { ...state, loading: false, avatar: action.payload }
    default:
      return state
  }
}

export default uploadAvatarReducer
