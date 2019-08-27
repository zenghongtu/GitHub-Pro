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

import Info from "./info/index"
import { AtList, AtListItem } from "taro-ui"

const Profile = () => {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)

  const [userOrgs, setUserOrgs] = useState<IUserOrg[] | null>(null)

  useEffect(() => {
    getCurrentUser().then(data => {
      if (data) {
        setUserInfo(data)
        setGlobalData("userInfo", data)
      }
    })
  }, [])

  useEffect(() => {
    if (userInfo) {
      getUserOrgs(userInfo.login).then(data => {
        if (data) {
          setUserOrgs(data)
        }
      })
    }
  }, [userInfo])

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
      company,
      blog,
      location,
      email,
      hireable,
      bio,
      public_repos,
      public_gists,
      followers,
      following,
      created_at,
      updated_at
    } = userInfo!
    return (
      <View>
        <View className="header">
          <Image src={avatar_url}></Image>
          <View>
            <View>{login}</View>
            <View>{location}</View>
            <View>Joined at {new Date(created_at).toDateString()}</View>
          </View>
        </View>
        <AtList>
          <AtListItem arrow="right" title="Activity" />
          <AtListItem arrow="right" title="Starred" />
        </AtList>
        <View>
          <Info userInfo={userInfo} userOrgs={userOrgs}></Info>
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
