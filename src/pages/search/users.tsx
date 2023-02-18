import Author from '@/components/author';
import LoadMore from '@/components/load-more';
import SkeletonCard from '@/components/skeleton-card';
import { defaultSearchParams } from '@/constants';
import { useSearchUsers } from '@/github/githubComponents';
import { View } from '@tarojs/components';
import { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { FC, useRef, useState } from 'react';
import styles from './index.module.scss';

const users: FC<{ keyword: string }> = ({ keyword }) => {
  const [queryParams, setQueryParams] = useState<any>({
    ...defaultSearchParams,
    q: keyword,
  });

  const isMountedRef = useRef(false);
  const [hasMore, setHasMore] = useState(false);
  const [data, setData] = useState<any[]>([]);

  // FIXME isLoading 每次加载都为 true
  const { isError, isLoading, isFetching, refetch } = useSearchUsers(
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
      isError={isError}
      isLoading={isLoading && !isMountedRef.current}
    >
      {data?.length > 0 && (
        <View>
          {data.map((item) => {
            const login = item.login;
            const avatar_url = item.avatar_url;
            return (
              <View key={login} className={styles['user-item']}>
                <Author login={login} url={avatar_url}></Author>
              </View>
            );
          })}
          <LoadMore hasMore={hasMore}></LoadMore>
        </View>
      )}
    </SkeletonCard>
  );
};

export default users;
