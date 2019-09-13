import Taro, { Component, Config, useRouter, useEffect } from '@tarojs/taro'
import { View, Image, Text, Block } from '@tarojs/components'
import './index.scss'
import useRequestWIthMore from '@/hooks/useRequestWIthMore'
import { getIssueComments, Issue, IssueComment } from '@/services/issues'
import Empty from '@/components/empty'
import CommentItem from '../comment-item'
import Markdown from '@/components/markdown'
import { getIssueData, setIssueData } from '../shared_data'
import Author from '@/components/author'
import LoadMore from '@/components/load-more'
import FabButton from '@/components/fab-button'

const IssueDetail = () => {
  const {
    params: { full_name, number }
  } = useRouter()

  const data = getIssueData()

  if (!data) {
    return null
  }

  useEffect(() => {
    const title = full_name
    Taro.setNavigationBarTitle({ title })
  }, [])

  useEffect(() => {
    return () => {
      setIssueData(null)
    }
  }, [])

  const {
    url,
    repository_url,
    labels_url,
    comments_url,
    events_url,
    html_url,
    id,
    node_id,
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
  } = data as Issue

  const [commentList, hasMore, refresh] = useRequestWIthMore<
    IssueComment | null,
    any
  >({ full_name, number }, getIssueComments)

  const handleFabBtnClick = () => {
    Taro.navigateTo({
      url: `/pages/issues/create-comment/index?full_name=${full_name}&number=${number}`
    })
  }

  return (
    <View className="wrap">
      <View className="header">
        <View className="title">{title}</View>
        <View className="meta">
          #{number} {state} {comments} comments
        </View>
      </View>
      <View className="content">
        <Author url={avatar_url} login={login} created_at={created_at}></Author>
        <View className="body">
          <Markdown md={body} full_name={full_name}></Markdown>
        </View>
      </View>

      {commentList ? (
        <View className="comment-list">
          {commentList.map((item, idx) => {
            return (
              <CommentItem
                key={item!.id}
                comment={item}
                full_name={full_name}
              ></CommentItem>
            )
          })}
          <LoadMore hasMore={!!hasMore}></LoadMore>
        </View>
      ) : (
        <Empty></Empty>
      )}
      <FabButton icon="add" onClick={handleFabBtnClick}></FabButton>
    </View>
  )
}

export default IssueDetail
