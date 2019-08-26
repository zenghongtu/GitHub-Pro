import Taro, { Component, Config, useEffect } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import { IUserReceivedEvent } from "../../services/users"
import { IUserInfo } from "../../services/user"
import Empty from "../empty"
import ActivityItem from "../activity-item"
interface IActivity {
  eventsData: IUserReceivedEvent[] | null
}

const Activity = ({ eventsData }: IActivity) => {
  if (!eventsData) {
    return <Empty></Empty>
  }

  return (
    <View>
      {eventsData.map(item => {
        return <ActivityItem item={item} key={item.id}></ActivityItem>
      })}
    </View>
  )
}

export default Activity
