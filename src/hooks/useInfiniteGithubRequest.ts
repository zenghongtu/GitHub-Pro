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
    getItems,
  }: {
    pathParams?: InitParamsType;
    queryParams?: InitParamsType;
    getItems?: (data: any) => T[];
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
      onSuccess(newData: any) {
        isMountedRef.current = true;

        if (getItems) {
          newData = getItems(newData);
        }

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
    queryParams,
    hasMore: hasMore && !isError,
    // 第2页不显示错误
    isError: isError && !(queryParams.page > 1),
    isLoading: isLoading && !isMountedRef.current,
  };
};

export default useInfiniteGithubRequest;
