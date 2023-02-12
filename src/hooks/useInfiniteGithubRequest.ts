import { defaultParams } from '@/constants';
import { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { useRef, useState } from 'react';

type InitParamsType = {
  [x: string]: any;
};

const useInfiniteGithubRequest = <
  T extends any = any,
  U extends Function = any,
>(
  useRequest: U,
  {
    pathParams: initPathParams,
    queryParams: initQueryParams = defaultParams,
  }: {
    pathParams: InitParamsType;
    queryParams?: InitParamsType;
  },
) => {
  const [queryParams, setQueryParams] = useState({ ...initQueryParams });

  const isMountedRef = useRef(false);
  const [hasMore, setHasMore] = useState(false);
  const [data, setData] = useState<T[]>([]);

  // FIXME isLoading 每次加载都为 true
  const { isError, isLoading, refetch } = useRequest(
    {
      queryParams,
      pathParams: initPathParams,
    },
    {
      onSuccess(newData: T[]) {
        isMountedRef.current = true;
        if (newData?.length >= queryParams.per_page!) {
          setHasMore(true);
        }
        if (queryParams.page! > 1) {
          setData([...data, ...newData]);
        } else {
          setData(newData);
        }
      },
    },
  );

  useReachBottom(() => {
    if (hasMore) {
      setQueryParams({ ...queryParams, page: queryParams.page! + 1 });
    }
  });

  usePullDownRefresh(() => {
    setQueryParams({ ...initQueryParams });
    // refetch();
  });

  return {
    data,
    hasMore,
    isError,
    isLoading: isLoading && !isMountedRef.current,
  };
};

export default useInfiniteGithubRequest;
