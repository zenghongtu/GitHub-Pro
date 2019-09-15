import {
  useState,
  useEffect,
  useRef,
  useReachBottom,
  usePullDownRefresh
} from '@tarojs/taro'

import {
  defaultParams,
  REACH_BOTTOM_EVENT,
  PULL_DOWN_REFRESH_EVENT
} from '../constants'
import Taro from '@tarojs/taro'
import events from '@/utils/event_bus'

function useRequestWIthMore<T, S = string>(
  data: S,
  request: (data: S, params: any | null) => Promise<T[] | null>
): [T[] | null, boolean, () => void, () => void] | [] {
  if (!data) {
    console.warn('useRequestWIthMore: no data')
    return []
  }

  const [currData, setData] = useState<T[] | null>(null)
  const [hasMore, setHasMore] = useState<boolean>(true)
  const [params, setParams] = useState(defaultParams)
  // 存储唯一 id 用于比对，防止消息乱窜
  const pageReachBottomRef = useRef('')
  const pagePullDownRef = useRef('')

  useEffect(() => {
    if (hasMore) {
      request(data, params).then(data => {
        if (data) {
          if (currData) {
            setData([...currData, ...data])
          } else {
            setData(data)
          }
          if (data.length < params.per_page!) {
            setHasMore(false)
          }
        }
      })
    }
  }, [params])

  usePullDownRefresh(() => {
    refresh()
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    }, 0)
  })

  useEffect(() => {
    events.on(REACH_BOTTOM_EVENT, (page: string) => {
      if (!pageReachBottomRef.current) {
        pageReachBottomRef.current = page
      } else if (pageReachBottomRef.current !== page) {
        return
      }
      getMoreData()
    })
    return () => {
      events.off(REACH_BOTTOM_EVENT)
    }
  }, [])

  useEffect(() => {
    events.on(PULL_DOWN_REFRESH_EVENT, (page: string) => {
      if (!pagePullDownRef.current) {
        pagePullDownRef.current = page
      } else if (pagePullDownRef.current !== page) {
        return
      }
      refresh()
    })
    return () => {
      events.off(PULL_DOWN_REFRESH_EVENT)
    }
  }, [])

  useReachBottom(() => {
    // TODO add throttle
    console.log('reach')
    getMoreData()
  })

  const getMoreData = () => {
    setParams(params => ({ ...params, page: params.page! + 1 }))
  }

  const refresh = () => {
    setData(null)
    setHasMore(true)
    setParams({ ...params, page: 1 })
  }

  return [currData, hasMore, refresh, getMoreData]
}

export default useRequestWIthMore
