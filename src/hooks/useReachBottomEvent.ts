import { getUniqueId } from '@/utils/common';
import events from '@/utils/event_bus';
import { useReachBottom } from '@tarojs/taro';
import { useRef } from 'react';
import { REACH_BOTTOM_EVENT, THROTTLE_DELAY } from '../constants';

function useReachBottomEvent() {
  const pageRef = useRef(getUniqueId());
  const timerRef = useRef(0);

  useReachBottom(() => {
    const prev = timerRef.current;
    const curr = +Date.now();
    if (!prev || curr - prev > THROTTLE_DELAY) {
      events.trigger(REACH_BOTTOM_EVENT, pageRef.current);
      timerRef.current = curr;
    } else {
      console.log('wait...');
    }
  });

  return null;
}

export default useReachBottomEvent;
