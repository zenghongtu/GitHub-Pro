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
): [T[] | null, boolean, () => void] | [] {
  if (!username) {
    console.error("useRequestWIthMore: no username")
    return []
  }

  const [currData, setData] = useState<T[] | null>(null)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [params, setParams] = useState(defaultParams)

  useEffect(() => {
    request(username, params).then(data => {
      if (data) {
        if (currData) {
          setData([...currData, ...data])
        } else {
          setData(data)
        }
        if (data.length < params.per_page) {
          setHasMore(false)
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
    setHasMore(true)
    setParams({ ...params, page: 1 })
  }

  return [currData, hasMore, refresh]
}

export default useRequestWIthMore
