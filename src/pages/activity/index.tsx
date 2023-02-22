import { View } from '@tarojs/components';
import { usePullDownRefresh, useReachBottom, useRouter } from '@tarojs/taro';
import ActivityItem from '../../components/activity-item';
import Empty from '../../components/empty';
import { getUserEvents, IUserReceivedEvent } from '../../services/users';
import styles from './index.module.scss';

import LoadMore from '@/components/load-more';
import useRequestWIthMore from '../../hooks/useRequestWIthMore';

const Activity = () => {
  const {
    params: { name },
  } = useRouter<{ name: string }>();

  const [eventsData, hasMore, refresh, getMoreData] =
    useRequestWIthMore<IUserReceivedEvent>(name, getUserEvents);

  usePullDownRefresh(() => {
    refresh!();
  });

  useReachBottom(() => {
    getMoreData!();
  });

  return (
    <View className={styles.wrap}>
      {eventsData ? (
        eventsData.map((item) => {
          return <ActivityItem item={item} key={item.id}></ActivityItem>;
        })
      ) : (
        <Empty></Empty>
      )}
      {eventsData && <LoadMore hasMore={hasMore!}></LoadMore>}
    </View>
  );
};

Activity.config = {
  navigationBarTitleText: 'Activity',
};

export default Activity;
