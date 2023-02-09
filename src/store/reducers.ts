import { combineReducers } from 'redux';
import issueReducer from './reducers/issue';
import languageReducer from './reducers/lang';
import userReducer from './reducers/user';

export interface IAction {
  type: string;
  payload: any;
}

export default combineReducers({
  user: userReducer,
  lang: languageReducer,
  issue: issueReducer,
});
