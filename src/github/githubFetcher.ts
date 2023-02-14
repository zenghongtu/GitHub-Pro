import Taro from '@tarojs/taro';
import { GithubContext } from './githubContext';

const baseUrl = 'https://api.github.com';

export type ErrorWrapper<TError> =
  | TError
  | { status: 'unknown'; payload: string };

export type GithubFetcherOptions<TBody, THeaders, TQueryParams, TPathParams> = {
  url: string;
  method: string;
  body?: TBody;
  headers?: THeaders;
  queryParams?: TQueryParams;
  pathParams?: TPathParams;
  signal?: AbortSignal;
} & GithubContext['fetcherOptions'];

let token = Taro.getStorageSync('authorization');

export async function githubFetch<
  TData,
  TError,
  TBody extends {} | FormData | undefined | null,
  THeaders extends {},
  TQueryParams extends {},
  TPathParams extends {},
>({
  url,
  method,
  body,
  headers,
  pathParams,
  queryParams,
}: GithubFetcherOptions<
  TBody,
  THeaders,
  TQueryParams,
  TPathParams
>): Promise<TData> {
  try {
    const requestHeaders: TaroGeneral.IAnyObject = {
      Authorization: token || (token = Taro.getStorageSync('authorization')),
      ...headers,
    };

    const { data, errMsg, header, statusCode } = await Taro.request({
      url: `${baseUrl}${resolveUrl(url, queryParams, pathParams)}`,
      data: body,
      method: method.toUpperCase() as any,
      header: requestHeaders,
    });

    if (statusCode >= 200 && statusCode < 300) {
      return data;
    }

    if (statusCode === 401) {
      Taro.setStorageSync('username', '');
      Taro.setStorageSync('authorization', '');
      throw new Error('Token 无效或未登录！');
    }

    if (statusCode === 403) {
      throw new Error('接口请求受限，请登录或稍后尝试！');
    }
    throw new Error(errMsg);
  } catch (err) {
    console.log('err: ', err);
    Taro.showToast({
      title: err.message || '请求失败，请稍后尝试~',
      icon: 'none',
      duration: 3000,
      mask: true,
    });
    throw err;
  } finally {
    Taro.stopPullDownRefresh();
  }
}

const resolveUrl = (
  url: string,
  queryParams: Record<string, string> = {},
  pathParams: Record<string, string> = {},
) => {
  let query = new URLSearchParams(queryParams).toString();
  if (query) query = `?${query}`;
  return url.replace(/\{\w*\}/g, (key) => pathParams[key.slice(1, -1)]) + query;
};
