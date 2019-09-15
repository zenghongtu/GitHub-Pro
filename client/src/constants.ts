export interface IDefaultParams {
  per_page?: number
  page?: number
}
export const defaultParams: IDefaultParams = {
  per_page: 15,
  page: 1
}

export const REACH_BOTTOM_EVENT = 'reach_bottom_event'
export const PULL_DOWN_REFRESH_EVENT = 'pull_down_refresh_event'
