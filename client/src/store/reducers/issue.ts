import { UPDATE_ISSUE_INFO, CLEAR_ISSUE_INFO } from '../constatnts'

import { IAction } from '../reducers'

interface IssueState {
  info: any
}
const INITIAL_STATE: IssueState = {
  info: null
}

const issueReducer = (state = INITIAL_STATE, action: IAction) => {
  const { type, payload } = action
  switch (type) {
    case UPDATE_ISSUE_INFO:
      return { ...state, info: payload }
    case CLEAR_ISSUE_INFO:
      return { ...state, info: null }
    default:
      return state
  }
}

export default issueReducer
