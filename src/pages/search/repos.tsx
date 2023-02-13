import LoadMore from '@/components/load-more';
import RepoItem from '@/components/repo-item';
import SkeletonCard from '@/components/skeleton-card';
import { defaultSearchParams } from '@/constants';
import { SearchReposResponse, useSearchRepos } from '@/github/githubComponents';
import useInfiniteGithubRequest from '@/hooks/useInfiniteGithubRequest';
import { View } from '@tarojs/components';
import { FC } from 'react';

const repos: FC<{ keyword: string }> = ({ keyword }) => {
  const { data, isLoading, isError, hasMore } = useInfiniteGithubRequest<
    SearchReposResponse['items'][number]
  >(useSearchRepos, {
    queryParams: { ...defaultSearchParams, q: keyword },
    getItems: (data) => data.items,
  });

  return (
    <SkeletonCard isLoading={isLoading} isError={isError}>
      {data?.length > 0 && (
        <View>
          {data.map((item, idx) => {
            return <RepoItem key={item.id} repo={item as any}></RepoItem>;
          })}
          <LoadMore hasMore={hasMore}></LoadMore>
        </View>
      )}
    </SkeletonCard>
  );
};

export default repos;
