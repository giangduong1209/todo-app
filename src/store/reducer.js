import { combineReducers } from 'redux'
import authReducer from './auth'
import uploadAvatarReducer from './profile'
import taskReducer from './tasks'
import userInfoReducer from './user'

const reducer = combineReducers({
  userInfo: userInfoReducer,
  uploadAvatar: uploadAvatarReducer,
  auth: authReducer,
  tasks: taskReducer,
})

export default reducer
