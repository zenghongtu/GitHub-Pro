import Taro, {
  Component,
  Config,
  useState,
  useEffect,
  useReachBottom
} from "@tarojs/taro"
import { View, Image } from "@tarojs/components"

import "./index.scss"
import NavBar from "../../components/navbar"
import { getGlobalData, setGlobalData } from "../../utils/global_data"
import { IUserOrg, getUserOrgs } from "../../services/users"
import { getCurrentUser, IUserInfo } from "../../services/user"
import Empty from "../../components/empty"

import { AtList, AtListItem } from "taro-ui"
import useRequest from "@/hooks/useRequest"
import { getFormatDate } from "@/utils/date"

const Profile = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)

  // const [userOrgs, setUserOrgs] = useState<IUserOrg[] | null>(null)

  useEffect(() => {
    getCurrentUser().then(data => {
      if (data) {
        setUserInfo(data)
        setGlobalData("userInfo", data)
      }
    })
  }, [])

  // useEffect(() => {
  //   if (userInfo) {
  //     getUserOrgs(userInfo.login).then(data => {
  //       if (data) {
  //         setUserOrgs(data)
  //       }
  //     })
  //   }
  // }, [userInfo])

  const renderUserInfo = () => {
    const {
      login,
      id,
      node_id,
      avatar_url,
      gravatar_id,
      url,
      html_url,
      followers_url,
      following_url,
      gists_url,
      starred_url,
      subscriptions_url,
      organizations_url,
      repos_url,
      events_url,
      received_events_url,
      type,
      site_admin,
      name,
      company = "",
      blog = "",
      location = "",
      email = "",
      hireable,
      bio = "",
      public_repos,
      public_gists,
      followers = 0,
      following = 0,
      created_at,
      updated_at
    } = userInfo!
    return (
      <View className="wrap">
        <View className="header">
          <Image className="avatar" src={avatar_url}></Image>
          <View className="basic">
            <View className="name">{name}</View>
            <View className="login">@{login}</View>
            <View className="Joined">
              Joined at {getFormatDate(created_at)}
            </View>
          </View>
        </View>
        <View className="bio">{bio}</View>
        <View className="info meta">
          <View className="nav">
            <View className="nav-item">
              <View className="item-count">{followers}</View>
              <View className="item-label">followers</View>
            </View>
            <View className="nav-item">
              <View className="item-count">{following}</View>
              <View className="item-label">following</View>
            </View>
            <View className="nav-item">
              <View className="item-count">{public_repos}</View>
              <View className="item-label">repos</View>
            </View>
            {/* <View className="nav-item">
              <View className="item-count">{public_gists}</View>
              <View className="item-label">Gists</View>
            </View> */}
          </View>
        </View>
        <View className="info">
          <AtList hasBorder={false}>
            <AtListItem hasBorder={true} arrow="right" title="Activity" />
            <AtListItem hasBorder={false} arrow="right" title="Starred" />
          </AtList>
        </View>

        <View className="info">
          <AtList hasBorder={false}>
            <AtListItem
              className="info-list-item"
              hasBorder={true}
              title="Email"
              extraText={email}
            ></AtListItem>
            <AtListItem
              className="info-list-item"
              hasBorder={true}
              title="Blog"
              extraText={blog}
            ></AtListItem>
            <AtListItem
              className="info-list-item"
              hasBorder={true}
              title="Company"
              extraText={company}
            >
              >
            </AtListItem>
            <AtListItem
              className="info-list-item"
              hasBorder={false}
              title="Location"
              extraText={location}
            >
              >
            </AtListItem>
          </AtList>
        </View>
        <View className="info">
          <AtList hasBorder={false}>
            <AtListItem hasBorder={true} arrow="right" title="Feedback" />
            <AtListItem hasBorder={false} arrow="right" title="About" />
          </AtList>
        </View>
      </View>
    )
  }

  return (
    <View>
      <NavBar isGoBackBtn></NavBar>
      {userInfo ? renderUserInfo() : <Empty></Empty>}
    </View>
  )
}

export default Profile
