import Taro from "@tarojs/taro"

const BASE_URL = "https://api.github.com"

let Authorization: string = Taro.getStorageSync("Authorization")

type Method =
  | "OPTIONS"
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "TRACE"
  | "CONNECT"

export const request = (url: string, data?: any, method: Method = "GET") => {
  const option = {
    url,
    data,
    method,
    header: {
      Authorization:
        Authorization || (Authorization = Taro.getStorageSync("Authorization"))
    }
  }

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
}

export default {
  get(url = "/") {
    return request(BASE_URL + url)
  },

  post(url = "/", data = {}) {
    return request(BASE_URL + url, data, "POST")
  },

  put(url = "/", data = {}) {
    return request(BASE_URL + url, data, "PUT")
  },

  delete(url = "/") {
    return request(BASE_URL + url, "DELETE")
  }
}
