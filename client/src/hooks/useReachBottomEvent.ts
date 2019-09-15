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
import { REACH_BOTTOM_EVENT } from '../constants'
import { getUniqueId } from '@/utils/common'

function useReachBottomEvent() {
  const pageRef = useRef(getUniqueId())
  useReachBottom(() => {
    events.trigger(REACH_BOTTOM_EVENT, pageRef.current)
  })

  return null
}

export default useReachBottomEvent
