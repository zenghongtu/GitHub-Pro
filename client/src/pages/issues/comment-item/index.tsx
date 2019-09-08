import Taro, { Component, Config } from "@tarojs/taro"
import { View, Text, Image } from "@tarojs/components"
import Markdown from "@/components/markdown"
import "./index.scss"

import Author from "@/components/author"

const CommentItem = ({ comment, full_name }) => {
  const {
    url,
    html_url,
    issue_url,
    id,
    node_id,
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
      events_url,
      received_events_url,
      type,
      site_admin
    },
    created_at,
    updated_at,
    author_association,
    body
  } = comment

  return (
    <View className="wrap">
      <View className="author">
        <Author url={avatar_url} login={login} created_at={created_at}></Author>
      </View>
      <View className="content">
        <Markdown md={body} full_name={full_name}></Markdown>
      </View>
    </View>
  )
}

export default CommentItem
