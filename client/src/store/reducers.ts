import { combineReducers } from 'redux'
import userReducer from './reducers/user'

export interface IAction {
  type: string
  payload: string
}

export default combineReducers({
  user: userReducer
})
