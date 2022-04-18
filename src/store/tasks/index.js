import api from '../../services/api'

const initState = {
  data: [],
  loading: false,
  error: '',
}

export const getAllTask = () => {
  return async (dispatch) => {
    dispatch({
      type: 'PENDING',
    })
    try {
      const res = await api.get('/task')
      dispatch({
        type: 'GET_ALL_TASK',
        payload: res,
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getTaskById = ({ id, callback }) => {
  return async (dispatch) => {
    dispatch({
      type: 'PENDING',
    })
    try {
      const res = await api.get(`/task/${id}`)
      dispatch({
        type: 'GET_ID_TASK',
        payload: res.data,
      })
      callback(res.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export const addNewTask = ({ dataTask, callback }) => {
  return async (dispatch) => {
    dispatch({
      type: 'PENDING',
    })
    try {
      const res = await api.post('/task', {
        description: dataTask,
      })
      dispatch({
        type: 'ADD_NEW_TASK',
        payload: res.data,
      })
      dispatch(getAllTask())
      callback(res.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateStatusTask = ({
  id,
  dataStatusTask,
  // dataDescription,
  callback,
}) => {
  return async (dispatch) => {
    dispatch({
      type: 'PENDING',
    })
    try {
      const res = await api.put(`/task/${id}`, {
        // description: dataDescription,
        completed: dataStatusTask,
      })
      dispatch({
        type: 'EDIT_STATUS_TASK',
        payload: res.data,
      })
      dispatch(getAllTask())
      callback(res.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteTask = ({ id, callback }) => {
  return async (dispatch) => {
    dispatch({
      type: 'PENDING',
    })
    try {
      const res = await api.delete(`/task/${id}`)
      dispatch({
        type: 'DELETE_USER_TASK',
        payload: res.data,
      })
      dispatch(getAllTask())
      callback(res.data)
    } catch (error) {
      console.log(error)
    }
  }
}

const taskReducer = (state = initState, action) => {
  switch (action.type) {
    case 'PENDING':
      return { ...state, loading: true }
    case 'ADD_NEW_TASK':
      return { ...state, data: action.payload, loading: false }
    case 'GET_ALL_TASK':
      return { ...state, data: action.payload, loading: false }
    case 'EDIT_STATUS_TASK':
      return { ...state, data: action.payload, loading: false }
    case 'GET_ID_TASK':
      return { ...state, data: action.payload, loading: false }
    case 'DELETE_USER_TASK':
      return { ...state, data: action.payload, loading: false }
    default:
      return state
  }
}

export default taskReducer
