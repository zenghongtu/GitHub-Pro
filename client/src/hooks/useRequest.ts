import { useState, useEffect, useRef, usePullDownRefresh } from "@tarojs/taro"
import Taro from "@tarojs/taro"

function useRequest<T>(
  params: any,
  request: (params: any) => Promise<T | null>
): [T | null, () => void] | [] {
  const [currData, setData] = useState<T | null>(null)
  const [count, setCount] = useState(0)

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
    }, 100)
  })

  const refresh = () => {
    setCount(count + 1)
  }

  return [currData, refresh]
}

export default useRequest
