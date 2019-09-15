import {
  useState,
  useEffect,
  useRef,
  useDidShow,
  useReachBottom,
  useDidHide
} from '@tarojs/taro'
import Taro from '@tarojs/taro'
import events from '@/utils/event_bus'
import { REACH_BOTTOM_EVENT, THROTTLE_DELAY } from '../constants'
import { getUniqueId } from '@/utils/common'

function useReachBottomEvent() {
  const pageRef = useRef(getUniqueId())
  const timerRef = useRef(0)

  useReachBottom(() => {
    // TODO 判断前面一页是否加载完成
    const prev = timerRef.current
    const curr = +Date.now()
    if (!prev || curr - prev > THROTTLE_DELAY) {
      events.trigger(REACH_BOTTOM_EVENT, pageRef.current)
      timerRef.current = curr
    } else {
      console.log('wait...')
    }
  })

  return null
}

export default useReachBottomEvent
