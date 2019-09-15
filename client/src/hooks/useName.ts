import { useState, useEffect, useRef, useDidShow } from '@tarojs/taro'
import Taro from '@tarojs/taro'
import { getGlobalData } from '@/utils/global_data'

function useName() {
  const username = getGlobalData('username') as string
  const [name, setName] = useState(username)

  useDidShow(() => {
    const username = getGlobalData('username') as string
    if (username !== name) {
      setName(username)
    }
  })

  return [name]
}

export default useName
