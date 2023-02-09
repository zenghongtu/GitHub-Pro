import { getUniqueId } from '@/utils/common';
import events from '@/utils/event_bus';
import { usePullDownRefresh } from '@tarojs/taro';
import { useRef } from 'react';
import { PULL_DOWN_REFRESH_EVENT } from '../constants';

function usePullDownRefreshEvent() {
  const pageRef = useRef(getUniqueId());
  usePullDownRefresh(() => {
    events.trigger(PULL_DOWN_REFRESH_EVENT, pageRef.current);
  });

  return null;
}

export default usePullDownRefreshEvent;
