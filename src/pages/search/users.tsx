import Author from '@/components/author';
import LoadMore from '@/components/load-more';
import SkeletonCard from '@/components/skeleton-card';
import { defaultSearchParams } from '@/constants';
import { SearchUsersResponse, useSearchUsers } from '@/github/githubComponents';
import useInfiniteGithubRequest from '@/hooks/useInfiniteGithubRequest';
import { View } from '@tarojs/components';
import { FC } from 'react';
import styles from './index.module.scss';

const users: FC<{ keyword: string }> = ({ keyword }) => {
  const { data, isError, isLoading, hasMore } = useInfiniteGithubRequest<
    SearchUsersResponse['items'][number]
  >(useSearchUsers, {
    queryParams: { ...defaultSearchParams, q: keyword },
    getItems: (data) => data.items,
  });

  return (
    <SkeletonCard isError={isError} isLoading={isLoading}>
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
