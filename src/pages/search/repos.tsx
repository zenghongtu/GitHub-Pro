import LoadMore from '@/components/load-more';
import RepoItem from '@/components/repo-item';
import SkeletonCard from '@/components/skeleton-card';
import { defaultSearchParams } from '@/constants';
import { useSearchRepos } from '@/github/githubComponents';
import { View } from '@tarojs/components';
import { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { FC, useRef, useState } from 'react';

const repos: FC<{ keyword: string }> = ({ keyword }) => {
  const [queryParams, setQueryParams] = useState<any>({
    ...defaultSearchParams,
    q: keyword,
  });

  const isMountedRef = useRef(false);
  const [hasMore, setHasMore] = useState(false);
  const [data, setData] = useState<any[]>([]);

  // FIXME isLoading 每次加载都为 true
  const { isError, isLoading, isFetching, refetch } = useSearchRepos(
    {
      queryParams,
    },
    {
      onSuccess(newData: any) {
        isMountedRef.current = true;

        newData = newData.items;

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
    setQueryParams({ ...defaultSearchParams, q: keyword });
    // refetch();
  });

  return (
    <SkeletonCard
      isLoading={isLoading && !isMountedRef.current}
      isError={isError}
    >
      {data?.length > 0 && (
        <View>
          {data?.map((item, idx) => {
            return <RepoItem key={item.id} repo={item as any}></RepoItem>;
          })}
          <LoadMore hasMore={hasMore}></LoadMore>
        </View>
      )}
    </SkeletonCard>
  );
};

export default repos;
