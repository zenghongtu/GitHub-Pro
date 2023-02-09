import Empty from '@/components/empty';
import LoadMore from '@/components/load-more';
import useRequestWIthMore from '@/hooks/useRequestWIthMore';
import { getEvents } from '@/services/github';
import { getUserReceivedEvents, IUserReceivedEvent } from '@/services/users';
import { Block, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect } from 'react';
import ActivityItem from '../../components/activity-item';
import './index.scss';

const funcMap = {
  false: getEvents,
  true: getUserReceivedEvents,
};
const NewContent = ({ username }) => {
  const func = funcMap['' + !!username];
  // TODO fix request after login
  const [eventsData, hasMore, refresh] = useRequestWIthMore<
    IUserReceivedEvent,
    any
    // ' '占位
  >(username || ' ', func);

  useEffect(() => {
    const title = username ? 'Received News' : 'Global News';
    Taro.setNavigationBarTitle({ title });
  }, [username]);

  return (
    <Block>
      {eventsData ? (
        <View className="content-wrap">
          {eventsData.map((item) => {
            return (
              <ActivityItem
                item={item as IUserReceivedEvent}
                key={item.id}
              ></ActivityItem>
            );
          })}
          <LoadMore hasMore={!!hasMore}></LoadMore>
        </View>
      ) : (
        <Empty></Empty>
      )}
    </Block>
  );
};

export default NewContent;
