import LoadMore from '@/components/load-more';
import { getRepoEvents, RepoEvent } from '@/services/repos';
import { View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useEffect } from 'react';
import ActivityItem from '../../components/activity-item';
import Empty from '../../components/empty';
import useRequestWIthMore from '../../hooks/useRequestWIthMore';
import { IUserReceivedEvent } from '../../services/users';
import './index.scss';

const RepoActivity = () => {
  const {
    params: { owner, repo },
  } = useRouter();

  const full_name = `${owner}/${repo}`;

  const [eventsData, hasMore, refresh] = useRequestWIthMore<RepoEvent, any>(
    { full_name },
    getRepoEvents,
  );

  useEffect(() => {
    const title = full_name;
    Taro.setNavigationBarTitle({ title });
  }, []);

  return (
    <View className="wrap">
      {eventsData ? (
        eventsData.map((item) => {
          return (
            <ActivityItem
              item={item as IUserReceivedEvent}
              key={item.id}
            ></ActivityItem>
          );
        })
      ) : (
        <Empty></Empty>
      )}
      {eventsData && <LoadMore hasMore={hasMore!}></LoadMore>}
    </View>
  );
};

export default RepoActivity;
