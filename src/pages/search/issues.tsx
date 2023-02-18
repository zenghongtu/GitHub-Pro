import LoadMore from '@/components/load-more';
import SkeletonCard from '@/components/skeleton-card';
import { defaultSearchParams } from '@/constants';
import { useSearchIssuesAndPullRequests } from '@/github/githubComponents';
import IssueItem from '@/pages/issues/issue-item';
import { View } from '@tarojs/components';
import { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { FC, useRef, useState } from 'react';

const issues: FC<{ keyword: string }> = ({ keyword }) => {
  const [queryParams, setQueryParams] = useState<any>({
    ...defaultSearchParams,
    per_page: 10,
    q: keyword,
  });

  const isMountedRef = useRef(false);
  const [hasMore, setHasMore] = useState(false);
  const [data, setData] = useState<any[]>([]);

  // FIXME isLoading 每次加载都为 true
  const { isError, isLoading, isFetching, refetch } =
    useSearchIssuesAndPullRequests(
      {
        queryParams,
      },
      {
        onSuccess(newData: any) {
          isMountedRef.current = true;

          newData = newData.items;
          console.log('newData: ', newData);

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
    setQueryParams({ ...defaultSearchParams, per_page: 10, q: keyword });
    // refetch();
  });

  return (
    <SkeletonCard
      isLoading={isLoading && !isMountedRef.current}
      isError={isError}
    >
      {data?.length > 0 && (
        <View>
          {data.map((item, idx) => {
            const full_name = item.repository_url
              .split('/')
              .reverse()
              .slice(0, 2)
              .reverse()
              .join('/');

            return (
              <IssueItem
                key={item.id}
                full_name={full_name}
                issue={item as any}
              ></IssueItem>
            );
          })}
          <LoadMore hasMore={hasMore}></LoadMore>
        </View>
      )}
    </SkeletonCard>
  );
};

export default issues;
