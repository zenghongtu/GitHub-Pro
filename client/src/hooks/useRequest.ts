import { useState, useEffect, useRef } from "@tarojs/taro"

function useRequest<T>(
  url: any,
  request: (url: any) => Promise<T | null>
): [T | null, () => void] | [] {
  const [currData, setData] = useState<T | null>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    request(url).then(data => {
      if (data) {
        setData(data)
      }
    })
  }, [count])

  const refresh = () => {
    setCount(count + 1)
  }
  // TODO handle no more repos
  return [currData, refresh]
}

export default useRequest
