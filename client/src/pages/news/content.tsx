import Taro, { Component, Config, useDidShow, useEffect } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import './index.scss'
import useRequestWIthMore from '@/hooks/useRequestWIthMore'
import ActivityItem from '../../components/activity-item'
import { getUserReceivedEvents, IUserReceivedEvent } from '@/services/users'
import LoadMore from '@/components/load-more'
import Empty from '@/components/empty'
import { getEvents } from '@/services/github'

const funcMap = {
  false: getEvents,
  true: getUserReceivedEvents
}
const NewContent = ({ username }) => {
  const func = funcMap['' + !!username]
  // TODO fix request after login
  const [eventsData, hasMore, refresh] = useRequestWIthMore<
    IUserReceivedEvent,
    any
    // ' '占位
  >(username || ' ', func)

  useEffect(() => {
    const title = username ? 'Received News' : 'Global News'
    Taro.setNavigationBarTitle({ title })
  }, [username])

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
