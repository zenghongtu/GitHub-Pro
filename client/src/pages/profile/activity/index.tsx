import Taro, { Component, Config, useEffect } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import {
  getUserReceivedEvents,
  IUserInfo,
  IUserReceivedEvent
} from "../../../services/user"
import Empty from "../../../components/empty"
import ActivityItem from "../../../components/activity-item"
interface IActivity {
  userReceivedEvents: IUserReceivedEvent[] | null
}

const Activity = ({ userReceivedEvents }: IActivity) => {
  if (!userReceivedEvents) {
    return <Empty></Empty>
  }

  return (
    <View>
      {userReceivedEvents.map(item => {
        return <ActivityItem item={item} key={item.id}></ActivityItem>
      })}
    </View>
  )
}

export default Activity
