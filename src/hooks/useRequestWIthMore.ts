import events from '@/utils/event_bus';
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { useEffect, useRef, useState } from 'react';
import {
  defaultParams,
  PULL_DOWN_REFRESH_EVENT,
  REACH_BOTTOM_EVENT,
} from '../constants';

function useRequestWIthMore<T, S = string>(
  data: S,
  request: (data: S, params: any | null) => Promise<T[] | null>,
): [T[] | null, boolean, () => void, () => void] | [] {
  if (!data) {
    // bug?
    console.warn('useRequestWIthMore: no data');
    return [];
  }

  const [currData, setData] = useState<T[] | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [params, setParams] = useState(defaultParams);
  // 存储唯一 id 用于匹配消息
  const pageReachBottomRef = useRef('');
  const pagePullDownRef = useRef('');
  const loadingRef = useRef(false);

  useEffect(() => {
    if (hasMore) {
      loadingRef.current = true;
      request(data, params)
        .then((data) => {
          if (data) {
            if (currData) {
              setData([...currData, ...data]);
            } else {
              setData(data);
            }
            if (data.length < params.per_page!) {
              setHasMore(false);
            }
          }
        })
        .finally(() => {
          loadingRef.current = false;
          Taro.stopPullDownRefresh();
          Taro.hideLoading();
        });
    }
  }, [params]);

  usePullDownRefresh(() => {
    refresh();
  });

  useEffect(() => {
    events.on(REACH_BOTTOM_EVENT, (page: string) => {
      if (loadingRef.current) {
        return;
      }
      if (!pageReachBottomRef.current) {
        pageReachBottomRef.current = page;
      } else if (pageReachBottomRef.current !== page) {
        return;
      }
      getMoreData();
    });
    return () => {
      events.off(REACH_BOTTOM_EVENT);
    };
  }, []);

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

  useReachBottom(() => {
    if (loadingRef.current) {
      return;
    }
    getMoreData();
  });

  const getMoreData = () => {
    setParams((params) => ({ ...params, page: params.page! + 1 }));
  };

  const refresh = () => {
    setData(null);
    setHasMore(true);
    setParams({ ...params, page: 1 });
  };

  return [currData, hasMore, refresh, getMoreData];
}

export default useRequestWIthMore;
