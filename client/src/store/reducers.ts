import { combineReducers } from 'redux'
import userReducer from './reducers/user'
import languageReducer from './reducers/lang'

export interface IAction {
  type: string
  payload: any
}

export default combineReducers({
  user: userReducer,
  lang: languageReducer
})
