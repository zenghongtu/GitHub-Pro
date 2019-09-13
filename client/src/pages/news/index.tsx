import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import './index.scss'
import useRequestWIthMore from '@/hooks/useRequestWIthMore'
import { IUserReceivedEvent, getUserReceivedEvents } from '@/services/users'
import Empty from '@/components/empty'
import ActivityItem from '../activity/activity-item'
import LoadMore from '@/components/load-more'
import { getGlobalData } from '@/utils/global_data'
import { showLoginTips } from '@/utils/common'

const News = () => {
  const username = getGlobalData('username') as string
  if (!username) {
    showLoginTips()
  }

  const [eventsData, hasMore, refresh] = useRequestWIthMore<
    IUserReceivedEvent,
    any
  >(username, getUserReceivedEvents)

  return (
    <View className="wrap">
      {eventsData ? (
        <Block>
          {eventsData.map(item => {
            return (
              <ActivityItem
                item={item as IUserReceivedEvent}
                key={item.id}
              ></ActivityItem>
            )
          })}
          <LoadMore hasMore={!!hasMore}></LoadMore>
        </Block>
      ) : (
        <Empty></Empty>
      )}
    </View>
  )
}

export default News
