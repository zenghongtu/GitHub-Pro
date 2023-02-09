import { PULL_DOWN_REFRESH_EVENT } from '@/constants';
import events from '@/utils/event_bus';
import { usePullDownRefresh } from '@tarojs/taro';
import { useEffect, useRef, useState } from 'react';

function useRequest<T>(
  params: any,
  request: (params: any) => Promise<T | null>,
): [T | null, () => void] | [] {
  const [currData, setData] = useState<T | null>(null);
  const [count, setCount] = useState(0);
  const pagePullDownRef = useRef('');

  useEffect(() => {
    request(params).then((data) => {
      if (data) {
        setData(data);
      }
    });
  }, [count]);

  usePullDownRefresh(() => {
    refresh();
  });

  useEffect(() => {
    events.on(PULL_DOWN_REFRESH_EVENT, (page: string) => {
      if (!pagePullDownRef.current) {
        pagePullDownRef.current = page;
      } else if (pagePullDownRef.current !== page) {
        return;
      }
      refresh();
    });
    return () => {
      events.off(PULL_DOWN_REFRESH_EVENT);
    };
  }, []);

  const refresh = () => {
    setCount(count + 1);
  };

  return [currData, refresh];
}

export default useRequest;
