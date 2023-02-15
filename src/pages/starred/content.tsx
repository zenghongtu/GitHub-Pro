import LoadMore from '@/components/load-more';
import SkeletonCard from '@/components/skeleton-card';
import { useActivityListReposStarredByUser } from '@/github/githubComponents';
import useInfiniteGithubRequest from '@/hooks/useInfiniteGithubRequest';
import usePageScrollBackToTop from '@/hooks/usePageScrollBackToTop';
import { View } from '@tarojs/components';
import Empty from '../../components/empty';
import RepoItem from '../../components/repo-item';
import styles from './index.module.scss';

const StarredContent = ({ username }) => {
  const { data, hasMore, isError, isLoading } = useInfiniteGithubRequest(
    useActivityListReposStarredByUser,
    { pathParams: { username } },
  );

  const BackToTop = usePageScrollBackToTop();

  return (
    <View>
      <SkeletonCard isError={isError} isLoading={isLoading}>
        {data ? (
          <View className={styles['content-wrap']}>
            {data.map((item, idx) => {
              return <RepoItem key={item.id} repo={item}></RepoItem>;
            })}
            <LoadMore hasMore={hasMore}></LoadMore>
          </View>
        ) : (
          <Empty></Empty>
        )}
      </SkeletonCard>
      {BackToTop}
    </View>
  );
};

export default StarredContent;
