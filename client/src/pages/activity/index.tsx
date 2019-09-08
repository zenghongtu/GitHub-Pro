import Taro, { Component, Config, useEffect, useRouter } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import { IUserReceivedEvent, getUserEvents } from "../../services/users"
import Empty from "../../components/empty"
import ActivityItem from "./activity-item"
import NavBar from "../../components/navbar"

import useRequestWIthMore from "../../hooks/useRequestWIthMore"
import LoadMore from "@/components/load-more"

const Activity = () => {
  const {
    params: { name }
  } = useRouter()

  const [eventsData, hasMore, refresh] = useRequestWIthMore<IUserReceivedEvent>(
    name,
    getUserEvents
  )

  return (
    <View className="wrap">
      <NavBar title="Activity"></NavBar>
      {eventsData ? (
        eventsData.map(item => {
          return <ActivityItem item={item} key={item.id}></ActivityItem>
        })
      ) : (
        <Empty></Empty>
      )}
      {eventsData && <LoadMore hasMore={hasMore!}></LoadMore>}
    </View>
  )
}

export default Activity
