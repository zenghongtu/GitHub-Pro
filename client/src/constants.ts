export interface IDefaultParams {
  per_page?: number
  page?: number
}
export const defaultParams: IDefaultParams = {
  per_page: 30,
  page: 1
}

export const REACH_BOTTOM_EVENT = 'reach_bottom_event'
