import Taro, {
  Component,
  Config,
  useState,
  useEffect,
  useReachBottom
} from '@tarojs/taro'
import { View, Image } from '@tarojs/components'

import './index.scss'
import { getGlobalData, setGlobalData } from '../../utils/global_data'
import { IUserOrg, getUserOrgs } from '../../services/users'
import { getCurrentUser, IUserInfo } from '../../services/user'
import Empty from '../../components/empty'

import { AtList, AtButton } from 'taro-ui'
import { getFormatDate, getTimeAgo } from '@/utils/date'
import { showLoginTips, copyText } from '@/utils/common'
import Avatar from '@/components/avatar'
import ListItem from '@/components/list-item'

const Profile = () => {
  const username = getGlobalData('username') as string
  if (!username) {
    showLoginTips()
  }
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)

  // const [userOrgs, setUserOrgs] = useState<IUserOrg[] | null>(null)

  useEffect(() => {
    getCurrentUser().then(data => {
      if (data) {
        setUserInfo(data)
        setGlobalData('username', data.login)
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

  const handleNavTo = (url: string) => () => {
    Taro.navigateTo({ url })
  }
  const handleSwitchTo = (url: string) => () => {
    Taro.switchTab({ url })
  }

  const handleCopy = (text: string) => () => {
    copyText(text)
  }

  const handleLogout = () => {
    Taro.showModal({
      content: 'Are you sure?',
      cancelText: 'No',
      cancelColor: '#fb3e3b',
      confirmText: 'Yeah',
      confirmColor: '#007afb',

      success(res) {
        if (res.confirm) {
          setGlobalData('username', '')
          setGlobalData('authorization', '')
          Taro.navigateBack()
        } else if (res.cancel) {
        }
      }
    })
  }

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
      company = '',
      blog = '',
      location = '',
      email = '',
      hireable,
      bio = '',
      public_repos,
      public_gists,
      followers = 0,
      following = 0,
      created_at,
      updated_at
    } = userInfo!
    const style: React.CSSProperties = { padding: '6px', fontSize: '16px' }

    return (
      <View className="wrap">
        <View className="header">
          <Avatar circle={false} size="70" url={avatar_url}></Avatar>
          <View className="basic">
            <View className="name">
              {name || login} ({login})
            </View>

            <View className="bio">{bio}</View>
            <View className="Joined">Joined at {getTimeAgo(created_at)}</View>
          </View>
        </View>
        <View className="divide"></View>
        <View className="info meta">
          <View className="nav">
            <View className="nav-item">
              <View className="item-count">
                {public_repos.toLocaleString()}
              </View>
              <View className="item-label">repositories</View>
            </View>
            <View className="nav-item">
              <View className="item-count">{followers.toLocaleString()}</View>
              <View className="item-label">followers</View>
            </View>
            <View className="nav-item">
              <View className="item-count">{following.toLocaleString()}</View>
              <View className="item-label">following</View>
            </View>

            {/* <View className="nav-item">
              <View className="item-count">{public_gists}</View>
              <View className="item-label">Gists</View>
            </View> */}
          </View>
        </View>
        <View className="info">
          <ListItem
            hasBorder={true}
            icon="activity"
            arrow="right"
            title="Activity"
            style={style}
            color="#3B85F6"
            onClick={handleNavTo(`/pages/activity/index?name=${login}`)}
          />
          <ListItem
            hasBorder={false}
            arrow="right"
            title="Issues"
            icon="info"
            // @ts-ignore
            style={{ ...style, fontWeight: '800' }}
            color="#EC407A"
            onClick={handleNavTo(`/pages/profile/issues`)}
          />
        </View>

        <View className="info">
          <ListItem
            arrow={null}
            hasBorder={true}
            title="Email"
            icon="email"
            color="#F99501"
            style={style}
            extraText={email}
            onClick={handleCopy(email)}
          ></ListItem>
          <ListItem
            arrow={null}
            hasBorder={true}
            title="Blog"
            icon="link"
            color="#3F9FFF"
            style={style}
            extraText={blog}
            onClick={handleCopy(blog)}
          ></ListItem>
          <ListItem
            arrow={null}
            icon="people"
            hasBorder={true}
            title="Company"
            color="#F44337"
            style={style}
            extraText={company}
            onClick={handleCopy(company)}
          ></ListItem>
          <ListItem
            icon="location"
            arrow={null}
            hasBorder={false}
            title="Location"
            color="#2F63CD"
            style={style}
            extraText={location}
            onClick={handleCopy(location)}
          ></ListItem>
        </View>
        <View className="info">
          <AtList hasBorder={false}>
            <ListItem
              icon="fankui"
              color="#ff9324"
              // @ts-ignore
              style={{ ...style, fontWeight: '800' }}
              hasBorder={true}
              arrow="right"
              title="Feedback"
              onClick={handleNavTo(
                `/pages/repos/index?owner=zenghongtu&repo=GitHub-Pro`
              )}
            />
            <ListItem
              icon="guanyu"
              color="#f23d7a"
              style={style}
              hasBorder={false}
              arrow="right"
              title="About"
              onClick={handleNavTo(
                `/pages/repos/index?owner=zenghongtu&repo=GitHub-Pro`
              )}
            />
          </AtList>
        </View>
        <View className="logout">
          <AtButton
            onClick={handleLogout}
            customStyle={{ background: '#fb3e3b', border: 'none' }}
            type="primary"
          >
            Logout
          </AtButton>
        </View>
      </View>
    )
  }

  return <View>{userInfo ? renderUserInfo() : <Empty></Empty>}</View>
}

export default Profile
