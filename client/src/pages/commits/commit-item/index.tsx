import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import { Issue } from '@/services/issues'
import { getFormatDate, getTimeAgo } from '../../../utils/date'
import { CommitItemData } from '@/services/commits'
import Avatar from '@/components/avatar'
import FontIcon from '@/components/font-icon'
import { ITouchEvent } from '@tarojs/components/types/common'

interface CommitItemProps {
  commit: CommitItemData
  full_name?: string
}
const CommitItem = ({ commit, full_name = '' }: CommitItemProps) => {
  if (!commit) {
    return null
  }
  const {
    sha,
    node_id,
    commit: {
      committer: { name, email, date },
      message,
      tree,
      comment_count,
      verification
    },
    url,
    html_url,
    comments_url,
    author,
    committer: {
      login,
      id,
      avatar_url,
      gravatar_id,
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
      site_admin
    },
    parents
  } = commit

  const handleClick = () => {
    Taro.showToast({ title: 'Developing', icon: 'none' })
  }

  const handleNavTo = (e: ITouchEvent) => {
    e.preventDefault()
    const url = `/pages/developer/index?name=${login}`
    Taro.navigateTo({ url })
  }

  const shortSha = sha.slice(0, 8)
  return (
    <View className="wrap" onClick={handleClick}>
      <Avatar url={avatar_url} username={login}></Avatar>
      <View className="info">
        <View className="top">
          <Text className="login" onClick={handleNavTo}>
            {login}
          </Text>
          <Text className="create">{getTimeAgo(date)}</Text>
        </View>
        <View className="title">{message}</View>
        <View className="bottom">
          <Text className="number">{shortSha}</Text>
          <View className="comments">
            <FontIcon
              value="comment"
              styleProps={{ fontSize: '15px', marginRight: '5px' }}
            ></FontIcon>
            <Text>{comment_count}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default CommitItem
