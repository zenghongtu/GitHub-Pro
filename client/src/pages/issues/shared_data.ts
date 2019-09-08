const shared_data = { issue: null }

export const setIssueData = data => {
  shared_data.issue = data
}

export const getIssueData = () => {
  return shared_data.issue
}
