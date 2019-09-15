import { useState, useEffect, useRef, usePullDownRefresh } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import events from '@/utils/event_bus'
import { PULL_DOWN_REFRESH_EVENT } from '@/constants'

function useRequest<T>(
  params: any,
  request: (params: any) => Promise<T | null>
): [T | null, () => void] | [] {
  const [currData, setData] = useState<T | null>(null)
  const [count, setCount] = useState(0)
  const pagePullDownRef = useRef('')

  useEffect(() => {
    request(params).then(data => {
      if (data) {
        setData(data)
      }
    })
  }, [count])

  usePullDownRefresh(() => {
    refresh()
    setTimeout(() => {
      Taro.stopPullDownRefresh()
    }, 0)
  })

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

  const refresh = () => {
    setCount(count + 1)
  }

  return [currData, refresh]
}

export default useRequest
