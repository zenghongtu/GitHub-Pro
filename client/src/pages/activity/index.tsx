import Taro, { Component, Config, useEffect } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import { IUserReceivedEvent, getUserEvents } from "../../services/users"
import Empty from "../../components/empty"
import ActivityItem from "./activity-item"
import NavBar from "../../components/navbar"
import { getGlobalData } from "../../utils/global_data"
import { IUserInfo } from "../../services/user"
import useRequest from "../../hooks/useReqeust"
interface IActivity {
  eventsData: IUserReceivedEvent[] | null
}

const Activity = () => {
  const userInfo = getGlobalData("userInfo") as IUserInfo
  const [eventsData, refresh] = useRequest<IUserReceivedEvent>(
    userInfo.login!,
    getUserEvents
  )

  return (
    <View>
      <NavBar title="Activity"></NavBar>
      {eventsData &&
        eventsData.map(item => {
          return <ActivityItem item={item} key={item.id}></ActivityItem>
        })}
    </View>
  )
}

export default Activity
