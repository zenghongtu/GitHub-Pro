import Taro, { Component, Config, useDidShow } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import './index.scss'
import useRequestWIthMore from '@/hooks/useRequestWIthMore'
import ActivityItem from '../activity/activity-item'
import { getUserReceivedEvents, IUserReceivedEvent } from '@/services/users'
import LoadMore from '@/components/load-more'
import Empty from '@/components/empty'

const NewContent = ({ username }) => {
  const [eventsData, hasMore, refresh] = useRequestWIthMore<
    IUserReceivedEvent,
    any
  >(username, getUserReceivedEvents)

  return (
    <Block>
      {eventsData ? (
        <View className="content-wrap">
          {eventsData.map(item => {
            return (
              <ActivityItem
                item={item as IUserReceivedEvent}
                key={item.id}
              ></ActivityItem>
            )
          })}
          <LoadMore hasMore={!!hasMore}></LoadMore>
        </View>
      ) : (
        <Empty></Empty>
      )}
    </Block>
  )
}

export default NewContent
