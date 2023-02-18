import Empty from '@/components/empty';
import LoadMore from '@/components/load-more';
import SkeletonCard from '@/components/skeleton-card';
import { useReposListCommits } from '@/github/githubComponents';
import useInfiniteGithubRequest from '@/hooks/useInfiniteGithubRequest';
import { Block } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useEffect } from 'react';
import CommitItem from './commit-item';

const Commits = () => {
  const {
    params: { owner, repo },
  } = useRouter();
  const full_name = `${owner}/${repo}`;

  const {
    data: commitList,
    hasMore,
    isError,
    isLoading,
  } = useInfiniteGithubRequest(useReposListCommits, {
    pathParams: { owner, repo },
  });

  useEffect(() => {
    const title = full_name;
    Taro.setNavigationBarTitle({ title });
  }, []);

  return (
    <SkeletonCard isLoading={isLoading} isError={isError}>
      {commitList ? (
        <Block>
          {commitList.map((item) => {
            return <CommitItem commit={item} key={item.node_id}></CommitItem>;
          })}
          <LoadMore hasMore={!!hasMore}></LoadMore>
        </Block>
      ) : (
        <Empty></Empty>
      )}
    </SkeletonCard>
  );
};

export default Commits;
