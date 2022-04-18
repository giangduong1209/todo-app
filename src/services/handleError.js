import { NotificationManager } from 'react-notifications'
export const handleError = (type) => {
  switch (type) {
    case 'E11000 duplicate key error collection: todo-list.users index: email_1 dup key: ':
      NotificationManager.error('Email is already exits.', 'Opps!', 2000)
      break
    case 'REGISTER_SUCCESS':
      NotificationManager.success(
        'Your account has been created successfully.',
        'Congrats!',
        1000
      )
      break
    case 'Unable to login':
      NotificationManager.error(
        "Your password is incorect or this account doesn't exits. Please try again.",
        'Opps',
        2000
      )
      break
    case 'LOGIN_SUCCESS':
      NotificationManager.success(
        'Congrats! Login is successfull.',
        'Welcome!',
        1000
      )
      break
    case 'POST_USER_AVATAR_SUCCESS':
      NotificationManager.success(
        'Your changes have been successfully saved!',
        'Congratulations',
        1000
      )
      break
    case 'POST_USER_AVATAR_FAILED':
      NotificationManager.error('Upload failed!', 'Opps', 1000)
      break

    case 'POST_USER_INFO_SUCCESS':
      NotificationManager.success(
        'Your changes have been successfully saved!',
        'Congratulations',
        1000
      )
      break
  }
}
