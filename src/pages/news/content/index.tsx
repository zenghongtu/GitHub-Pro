import ActivityItem, { ActivityItemDataType } from '@/components/activity-item';
import Empty from '@/components/empty';
import LoadMore from '@/components/load-more';
import SkeletonCard from '@/components/skeleton-card';
import {
  useActivityListPublicEvents,
  useActivityListReceivedEventsForUser,
} from '@/github/githubComponents';
import useInfiniteGithubRequest from '@/hooks/useInfiniteGithubRequest';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect } from 'react';
import styles from './index.module.scss';

const NewContent = ({ username }) => {
  const { data, hasMore, isError, isLoading } =
    useInfiniteGithubRequest<ActivityItemDataType>(
      !username
        ? useActivityListPublicEvents
        : useActivityListReceivedEventsForUser,
      { pathParams: { username } },
    );

  useEffect(() => {
    const title = username ? 'Received News' : 'Global News';
    Taro.setNavigationBarTitle({ title });
  }, [username]);

  return (
    <SkeletonCard isError={isError} isLoading={isLoading}>
      {data?.length > 0 ? (
        <View className={styles['content-wrap']}>
          {data.map((item) => {
            return <ActivityItem item={item} key={item.id}></ActivityItem>;
          })}
          <LoadMore hasMore={hasMore}></LoadMore>
        </View>
      ) : (
        <Empty></Empty>
      )}
    </SkeletonCard>
  );
};

export default NewContent;
