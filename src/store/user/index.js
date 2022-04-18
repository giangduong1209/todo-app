import api from '../../services/api'
import { handleError } from '../../services/handleError'

const initState = {
  data: [],
  loading: false,
  error: '',
}

export const updateUserInfo = ({ dataUser, callback }) => {
  return async (dispatch) => {
    dispatch({
      type: 'PENDING',
    })
    try {
      const res = await api.put('/user/me', dataUser)
      callback(res.data)
      dispatch({
        type: 'POST_USER_INFO',
        payload: res,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

const userInfoReducer = (state = initState, action) => {
  switch (action.type) {
    case 'PENDING':
      return { ...state, loading: true }
    case 'POST_USER_INFO':
      handleError('POST_USER_INFO_SUCCESS')
      return { ...state, data: action.payload, loading: false }
    default:
      return state
  }
}

export default userInfoReducer
