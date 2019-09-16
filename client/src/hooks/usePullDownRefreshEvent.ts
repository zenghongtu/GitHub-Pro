import {
  useState,
  useEffect,
  useRef,
  useDidShow,
  useReachBottom,
  useDidHide,
  usePullDownRefresh
} from '@tarojs/taro'

import events from '@/utils/event_bus'
import { PULL_DOWN_REFRESH_EVENT } from '../constants'
import { getUniqueId } from '@/utils/common'

function usePullDownRefreshEvent() {
  const pageRef = useRef(getUniqueId())
  usePullDownRefresh(() => {
    events.trigger(PULL_DOWN_REFRESH_EVENT, pageRef.current)
  })

  return null
}

export default usePullDownRefreshEvent
