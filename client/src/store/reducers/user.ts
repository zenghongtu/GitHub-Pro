import { LOGIN, LOGOUT } from '../constatnts'
import Taro from '@tarojs/taro'
import { IAction } from '../reducers'

const INITIAL_STATE: IUserState = {
  username: Taro.getStorageSync('username') || ''
}

interface IUserState {
  username: string
}

const userReducer = (state = INITIAL_STATE, action: IAction) => {
  const { type, payload } = action
  switch (type) {
    case LOGIN:
      return { ...state, username: payload }
    case LOGOUT:
      return { ...state, username: '' }
    default:
      return state
  }
}

export default userReducer
