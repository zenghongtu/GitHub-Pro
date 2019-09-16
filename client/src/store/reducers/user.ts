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
      const { username, token } = payload
      Taro.setStorageSync('username', username)

      token && Taro.setStorageSync('authorization', token)

      return { ...state, username }
    case LOGOUT:
      Taro.setStorageSync('username', '')
      Taro.setStorageSync('authorization', '')
      return { ...state, username: '' }
    default:
      return state
  }
}

export default userReducer
