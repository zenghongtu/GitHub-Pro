import {
  useState,
  useEffect,
  useRef,
  useReachBottom,
  usePullDownRefresh
} from "@tarojs/taro"

import { defaultParams } from "../constants"
import Taro from "@tarojs/taro"

function useRequestWIthMore<T>(
  username: string,
  request: (username: string, params: any | null) => Promise<T[] | null>
): [T[] | null, () => void] | [] {
  if (!username) {
    console.error("useRequestWIthMore: no username")
    return []
  }

  const [currData, setData] = useState<T[] | null>(null)
  const [params, setParams] = useState(defaultParams)

  useEffect(() => {
    request(username, params).then(data => {
      if (data) {
        if (currData) {
          setData([...currData, ...data])
        } else {
          setData(data)
        }
      }
    })
  }, [params])

  usePullDownRefresh(() => {
    refresh()
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    }, 100)
  })

  useReachBottom(() => {
    getMoreData()
  })

  const getMoreData = () => {
    setParams(params => ({ ...params, page: params.page + 1 }))
  }

  const refresh = () => {
    setData(null)
    setParams({ ...params, page: 1 })
  }

  // TODO handle no more repos
  return [currData, refresh]
}

export default useRequestWIthMore
