import { useState, useEffect, useRef, useReachBottom } from "@tarojs/taro"

import { defaultParams } from "../constants"

function useRequest<T>(
  username: string,
  request: (username: string, params: any) => Promise<any>
): [T[] | null, () => void] | [] {
  if (!username) {
    console.error("useRequest no username")
    return []
  }

  const pageRef = useRef(1)
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

  useReachBottom(() => {
    getMoreData()
  })

  const getMoreData = () => {
    const page = (pageRef.current += 1)
    setParams({ ...params, page })
  }
  const refresh = () => {
    const page = (pageRef.current = 1)
    setParams({ ...params, page })
  }
  // TODO handle no more repos
  return [currData, refresh]
}

export default useRequest
