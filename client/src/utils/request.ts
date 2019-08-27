import Taro from "@tarojs/taro"
import { getGlobalData } from "./global_data"

const BASE_URL = "https://api.github.com"

type Method =
  | "OPTIONS"
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "TRACE"
  | "CONNECT"

export const request = (
  url: string,
  data?: any,
  method: Method = "GET",
  headers = {}
) => {
  const option = {
    url,
    data,
    method,
    header: {
      ...headers,
      Authorization: getGlobalData("authorization")
    }
  }
  Taro.showLoading({ title: "loading.." })
  return Taro.request(option)
    .then(({ statusCode, data }) => {
      if (statusCode >= 200 && statusCode < 300) {
        return data
      }
      const msg = `code ${statusCode}`
      throw new Error(msg)
    })
    .catch(({ message }) => {
      Taro.showToast({
        title: message,
        icon: "none",
        duration: 3000,
        mask: true
      })
      return null
    })
    .finally(() => {
      Taro.hideLoading()
    })
}

export default {
  get<T>(url = "/", data = {}, headers = {}): Promise<T> {
    return request(BASE_URL + url, data, "GET", headers)
  },

  post<T>(url = "/", data = {}): Promise<T> {
    return request(BASE_URL + url, data, "POST")
  },

  put<T>(url = "/", data = {}): Promise<T> {
    return request(BASE_URL + url, data, "PUT")
  },

  delete<T>(url = "/", data = {}): Promise<T> {
    return request(BASE_URL + url, data, "DELETE")
  }
}
