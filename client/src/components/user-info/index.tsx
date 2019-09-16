import Taro, {
  Component,
  Config,
  useEffect,
  useReachBottom
} from '@tarojs/taro'
import { View, Text, Image, Block } from '@tarojs/components'
import './index.scss'

import Empty from '../empty'
import Avatar from '../avatar'
import { getTimeAgo } from '@/utils/date'
import { copyText } from '@/utils/common'
import { AtButton, AtList } from 'taro-ui'
import ListItem from '../list-item'

const UserInfo = ({
  userInfo,
  isFollowing,
  onFollowClick,
  onLogout,
  isCurrent = true
}: any) => {
  if (!userInfo) {
    return <Empty></Empty>
  }

  const handleNavTo = (url: string) => () => {
    Taro.navigateTo({ url })
  }

  const handleCopy = (text: string) => () => {
    copyText(text)
  }

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
          <View
            className="nav-item"
            onClick={handleNavTo(
              `/pages/developer/repos/index?isCurrent=${isCurrent}&name=${login}`
            )}
          >
            <View className="item-count">
              {Number(public_repos).toLocaleString()}
            </View>
            <View className="item-label">repositories</View>
          </View>
          <View
            className="nav-item"
            onClick={handleNavTo(
              `/pages/developer/followers/index?name=${login}`
            )}
          >
            <View className="item-count">
              {Number(followers).toLocaleString()}
            </View>
            <View className="item-label">followers</View>
          </View>
          <View
            className="nav-item"
            onClick={handleNavTo(
              `/pages/developer/following/index?name=${login}`
            )}
          >
            <View className="item-count">
              {Number(following).toLocaleString()}
            </View>
            <View className="item-label">following</View>
          </View>

          {/* <View className="nav-item">
              <View className="item-count">{public_gists}</View>
              <View className="item-label">Gists</View>
            </View> */}
        </View>
      </View>
      {!isCurrent && (
        <View className="action-btns">
          <AtButton
            className="btn"
            type="primary"
            full={false}
            size="small"
            circle
            onClick={onFollowClick}
          >
            {isFollowing ? 'unfollow' : 'follow'}
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
      )}

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
        {!isCurrent && (
          <ListItem
            hasBorder={true}
            icon="star"
            arrow="right"
            title="Starred"
            style={style}
            color="#01b09d"
            onClick={handleNavTo(
              `/pages/developer/starred/index?name=${login}`
            )}
          />
        )}

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
      {isCurrent && (
        <Block>
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
                  `/pages/issues/index?full_name=zenghongtu/GitHub-Pro`
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
              onClick={onLogout}
              customStyle={{ background: '#fb3e3b', border: 'none' }}
              type="primary"
            >
              Logout
            </AtButton>
          </View>
        </Block>
      )}
    </View>
  )
}

export default UserInfo
