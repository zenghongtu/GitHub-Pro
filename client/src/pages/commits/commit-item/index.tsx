import Taro, { Component, Config } from "@tarojs/taro"
import { View, Image, Text } from "@tarojs/components"
import "./index.scss"
import { Issue } from "@/services/issues"
import { getFormatDate } from "../../../utils/date"
import { CommitItemData } from "@/services/commits"

interface CommitItemProps {
  commit: CommitItemData
  full_name?: string
}
const CommitItem = ({ commit, full_name = "" }: CommitItemProps) => {
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

  const handleNavTo = () => {
    Taro.showToast({ title: "Developing", icon: "none" })
  }
  const shortSha = sha.slice(0, 8)
  return (
    <View className="wrap" onClick={handleNavTo}>
      <View className="avatar">
        <Image className="avatar-img" src={avatar_url}></Image>
      </View>
      <View className="info">
        <View className="top">
          <Text className="login">{login}</Text>
          <Text className="create">{getFormatDate(date)}</Text>
        </View>
        <View className="title">{message}</View>
        <View className="bottom">
          <Text className="number">{shortSha}</Text>
          <Text className="comments">{comment_count}</Text>
        </View>
      </View>
    </View>
  )
}

export default CommitItem
