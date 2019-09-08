import Taro, { Component, Config } from "@tarojs/taro"
import { View, Image, Text } from "@tarojs/components"
import "./index.scss"
import { Issue } from "@/services/issues"
import { getFormatDate } from "../../../utils/date"

interface IssueItemProps {
  issue: Issue
}
const IssueItem = ({ issue }: IssueItemProps) => {
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
    pull_request
  } = issue

  return (
    <View className="wrap">
      <View className="avatar">
        <Image className="avatar-img" src={avatar_url}></Image>
      </View>
      <View className="info">
        <View className="top">
          <Text className="login">{login}</Text>
          <Text className="create">{getFormatDate(created_at)}</Text>
        </View>
        <View className="title">{title}</View>
        <View className="bottom">
          <Text className="number">#{number}</Text>
          <Text className="comments">{comments}</Text>
        </View>
      </View>
    </View>
  )
}

export default IssueItem
