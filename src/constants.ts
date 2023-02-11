export interface IDefaultParams {
  per_page?: number;
  page?: number;
}
export const defaultParams: IDefaultParams = {
  per_page: 20,
  page: 1,
};

export const issueDefaultParams: IDefaultParams = {
  // 多了会 GG
  per_page: 10,
  page: 1,
};

export const REACH_BOTTOM_EVENT = 'reach_bottom_event';
export const PULL_DOWN_REFRESH_EVENT = 'pull_down_refresh_event';

export const THROTTLE_DELAY = 1500;

export const TRENDING_URL = 'https://trending.stayin.cn/';
