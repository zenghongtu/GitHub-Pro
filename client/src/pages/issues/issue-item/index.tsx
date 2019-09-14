import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import { Issue } from '@/services/issues'
import { getFormatDate, getTimeAgo } from '../../../utils/date'
import { setIssueData } from '../shared_data'
import FontIcon from '@/components/font-icon'
import Avatar from '@/components/avatar'

interface IssueItemProps {
  issue: Issue
  full_name?: string
}
const IssueItem = ({ issue, full_name: _full_name }: IssueItemProps) => {
  if (!issue) {
    return null
  }
  const {
    url,
    repository_url,
    labels_url,
    comments_url,
    events_url,
    html_url,
    id,
    node_id,
    number,
    title,
    user: {
      login,
      avatar_url,
      gravatar_id,
      followers_url,
      following_url,
      gists_url,
      starred_url,
      subscriptions_url,
      organizations_url,
      repos_url,
      received_events_url,
      type,
      site_admin
    },
    labels,
    state,
    locked,
    assignee,
    assignees,
    milestone,
    comments,
    created_at,
    updated_at,
    closed_at,
    author_association,
    body,
    pull_request,
    repository
  } = issue
  const full_name = _full_name || repository!.full_name
  const handleNavTo = () => {
    setIssueData(issue)
    const url = `/pages/issues/issue-detail/index?full_name=${full_name}&number=${number}`
    Taro.navigateTo({ url })
  }

  return (
    <View className="wrap" onClick={handleNavTo}>
      <Avatar url={avatar_url} size="28"></Avatar>
      <View className="info">
        <View className="top">
          <Text className="login">{login}</Text>
          <Text className="create">{getTimeAgo(created_at)}</Text>
        </View>
        <View className="title">{title}</View>
        <View className="bottom">
          <View className="number">#{number}</View>
          <View className="comments">
            <FontIcon
              value="comment"
              styleProps={{ fontSize: '15px', marginRight: '5px' }}
            ></FontIcon>
            <Text>{comments}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default IssueItem
