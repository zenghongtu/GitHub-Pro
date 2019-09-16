import Taro, {
  Component,
  Config,
  useRouter,
  useEffect,
  usePullDownRefresh,
  useState
} from '@tarojs/taro'
import { View, Image, Text, Block } from '@tarojs/components'
import './index.scss'
import useRequestWIthMore from '@/hooks/useRequestWIthMore'
import {
  getIssueComments,
  Issue,
  IssueComment,
  getIssueDetail
} from '@/services/issues'
import Empty from '@/components/empty'
import CommentItem from '../comment-item'
import Markdown from '@/components/markdown'
import Author from '@/components/author'
import LoadMore from '@/components/load-more'
import FabButton from '@/components/fab-button'
import { useSelector, useDispatch } from '@tarojs/redux'
import { CLEAR_ISSUE_INFO } from '@/store/constatnts'

const IssueDetail = () => {
  const {
    params: { full_name, number }
  } = useRouter()

  const issue = useSelector<any, any>(state => state.issue.info)

  const [issueData, setIssue] = useState(issue)

  const [commentList, hasMore, refresh] = useRequestWIthMore<
    IssueComment | null,
    any
  >({ full_name, number }, getIssueComments)

  const dispatch = useDispatch()

  useEffect(() => {
    const title = full_name
    Taro.setNavigationBarTitle({ title })
  }, [])

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_ISSUE_INFO })
    }
  }, [])

  useEffect(() => {
    if (!issueData) {
      getIssueDetail({ full_name, number }).then(resData => {
        if (resData) {
          setIssue(resData)
        }
      })
    }
  }, [])

  usePullDownRefresh(() => {
    refresh!()
  })

  const handleFabBtnClick = () => {
    Taro.navigateTo({
      url: `/pages/issues/create-comment/index?full_name=${full_name}&number=${number}`
    })
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
    title,
    user,
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
  } = (issueData as Issue) || {}

  const { login, avatar_url, gravatar_id, type, site_admin } = user || {}

  if (!login) {
    return <Empty></Empty>
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
