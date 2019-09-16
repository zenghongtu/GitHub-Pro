import { combineReducers } from 'redux'
import userReducer from './reducers/user'

export interface IAction {
  type: string
  payload: any
}

export default combineReducers({
  user: userReducer
})
