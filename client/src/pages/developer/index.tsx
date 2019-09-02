import Taro, {
  Component,
  Config,
  useState,
  useEffect,
  useReachBottom,
  useRouter
} from "@tarojs/taro"
import { View, Image } from "@tarojs/components"

import "./index.scss"
import NavBar from "../../components/navbar"
import { getGlobalData, setGlobalData } from "../../utils/global_data"
import { IUserOrg, getUserOrgs, getUser, IUser } from "@/services/users"
import { getCurrentUser, IUserInfo, follow } from "@/services/user"
import Empty from "../../components/empty"

import { AtList, AtListItem, AtButton } from "taro-ui"
import useRequest from "@/hooks/useRequest"
import { getFormatDate } from "@/utils/date"

const Developer = () => {
  const {
    params: { name }
  } = useRouter()
  const [userInfo, refreshUserInfo] = useRequest<IUser>(name, getUser)
  const [isFollowing, setFollow] = useState<boolean>(false)

  useEffect(() => {
    follow.is(name).then(isFollowing => {
      setFollow(isFollowing)
    })
  }, [])

  // const [userOrgs, setUserOrgs] = useState<IUserOrg[] | null>(null)

  // useEffect(() => {
  //   if (userInfo) {
  //     getUserOrgs(userInfo.login).then(data => {
  //       if (data) {
  //         setUserOrgs(data)
  //       }
  //     })
  //   }
  // }, [userInfo])

  const handleFollowBtnClick = () => {
    if (isFollowing) {
      follow.delete(name).then(isSuccess => {
        if (isSuccess) {
          setFollow(false)
        }
      })
    } else {
      follow.put(name).then(isSuccess => {
        if (isSuccess) {
          setFollow(true)
        }
      })
    }
  }

  const renderUserInfo = isFollowing => {
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
              <View className="item-label">repositories</View>
            </View>
            {/* <View className="nav-item">
              <View className="item-count">{public_gists}</View>
              <View className="item-label">Gists</View>
            </View> */}
          </View>
          <View className="action-btn">
            <AtButton
              className="btn"
              type="primary"
              full={false}
              size="small"
              circle
              onClick={handleFollowBtnClick}
            >
              {isFollowing ? "unfollow" : "follow"}
            </AtButton>
            <AtButton
              className="btn"
              openType="share"
              type="primary"
              full={false}
              size="small"
              circle
            >
              share
            </AtButton>
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
      </View>
    )
  }

  return (
    <View>
      <NavBar isGoBackBtn></NavBar>
      {userInfo ? renderUserInfo(isFollowing) : <Empty></Empty>}
    </View>
  )
}

export default Developer
