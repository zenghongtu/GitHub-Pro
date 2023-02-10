import Taro from '@tarojs/taro';

let BASE_URL = 'https://api.github.com';

// TODO 目前不做缓存
const isDev = process.env.NODE_ENV === 'development' && false;

let token = Taro.getStorageSync('authorization');

type Method =
  | 'OPTIONS'
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'TRACE'
  | 'CONNECT';

export const request = (
  url: string,
  data?: any,
  method: Method = 'GET',
  headers = {},
) => {
  if (isDev) {
    const data = Taro.getStorageSync(url);
    if (data) {
      return Promise.resolve(data);
    }
  }

  const option = {
    url,
    data,
    method,
    header: {
      Authorization: token || (token = Taro.getStorageSync('authorization')),
      ...headers,
    },
  };

  if (
    (data && data.page > 1) ||
    url.endsWith('/readme') ||
    url.includes('/user/starred')
  ) {
    // TODO
  } else {
    Taro.showLoading({ title: 'loading..' });
  }
  return Taro.request(option)
    .then(({ statusCode, data }) => {
      if (statusCode >= 200 && statusCode < 300) {
        if (isDev) {
          Taro.setStorageSync(url, data);
        }
        return data;
      }
      // TODO refactor
      if (
        (statusCode === 404 && url.includes('/user/following')) ||
        url.includes('/user/starred')
      ) {
        return null;
      }
      if (statusCode === 401) {
        // TODO
        if (
          url.includes('/user/starred') ||
          (url.includes('/user') && method === 'GET')
        ) {
          return null;
        }
        throw new Error(`Error 401: Required Login!`);
      }
      if (statusCode === 403) {
        throw new Error(`Error 403: API rate limit exceeded, required login!`);
      }
      const msg = `Error: code ${statusCode}`;
      throw new Error(msg);
    })
    .catch(({ message }) => {
      Taro.showToast({
        title: message || 'error(─‿─)',
        icon: 'none',
        duration: 1500,
        mask: true,
      });
      return null;
    })
    .finally(() => {
      Taro.stopPullDownRefresh();
      Taro.hideLoading();
    });
};

export default {
  get<T>(url = '/', data = {}, headers = {}): Promise<T> {
    return request(BASE_URL + url, data, 'GET', headers);
  },

  post<T>(url = '/', data = {}): Promise<T> {
    return request(BASE_URL + url, data, 'POST');
  },

  put<T>(url = '/', data = {}): Promise<T> {
    return request(BASE_URL + url, data, 'PUT');
  },

  delete<T>(url = '/', data = {}): Promise<T> {
    return request(BASE_URL + url, data, 'DELETE');
  },
};
