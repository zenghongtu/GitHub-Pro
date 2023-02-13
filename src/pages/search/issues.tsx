import LoadMore from '@/components/load-more';
import SkeletonCard from '@/components/skeleton-card';
import { defaultSearchParams } from '@/constants';
import {
  SearchIssuesAndPullRequestsResponse,
  useSearchIssuesAndPullRequests,
} from '@/github/githubComponents';
import useInfiniteGithubRequest from '@/hooks/useInfiniteGithubRequest';
import IssueItem from '@/pages/issues/issue-item';
import { View } from '@tarojs/components';
import { FC } from 'react';

const issues: FC<{ keyword: string }> = ({ keyword }) => {
  const { data, isLoading, isError, hasMore } = useInfiniteGithubRequest<
    SearchIssuesAndPullRequestsResponse['items'][number]
  >(useSearchIssuesAndPullRequests, {
    queryParams: { ...defaultSearchParams, q: keyword },
    getItems: (data) => data.items,
  });

  return (
    <SkeletonCard isLoading={isLoading} isError={isError}>
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
