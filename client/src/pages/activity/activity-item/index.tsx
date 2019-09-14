import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { IUserReceivedEvent } from '../../../services/users'
import { getTimeAgo } from '@/utils/date'
import Avatar from '@/components/avatar'
import Author from '@/components/author'

const spacesRegExp = new RegExp('[\r\n\t]+', 'g')
const refsHeadsRegExp = new RegExp('refs/heads/')

const maxTextLength = 100

const truncateText = (text = '') => {
  let truncated = text.slice(0, maxTextLength)
  if (text.length >= maxTextLength) {
    truncated += '...'
  }
  return truncated
}

interface ActivityItemProps {
  item: IUserReceivedEvent
}

const ActivityItem = ({ item }: ActivityItemProps) => {
  if (!item) {
    return null
  }

  const renderEvent = () => {
    const {
      type,

      repo: { name },
      payload
    } = item

    switch (type) {
      case 'PushEvent': {
        const { ref, commits } = payload
        const _ref = ref!.replace(refsHeadsRegExp, '')
        const len = commits!.length

        return (
          <View>
            <View>
              Pushed to {_ref} at <Text className="repo-name">{name}</Text>
            </View>
            <View className="event-desc">
              {commits!.slice(0, 3).map(item => {
                const { message, sha } = item
                const commit = truncateText(message.replace(spacesRegExp, ''))
                const _sha = sha.substr(0, 8)
                return (
                  <View key={sha} className="commit">
                    <Text className="commit-sha">{_sha} </Text>
                    <Text className="commit-content"> {commit}</Text>
                  </View>
                )
              })}
              {len > 3 && (
                <View className="commit">
                  <Text className="commit-content"> ...</Text>
                </View>
              )}
            </View>
          </View>
        )
      }
      case 'IssuesEvent': {
        return (
          <View>
            <View>
              <Text className="event-action">{payload.action}</Text> issue{' '}
              <Text className="repo-name">{name}</Text>
            </View>
            <View className="event-desc">{payload.issue!.title}</View>
          </View>
        )
      }
      case 'PullRequestEvent': {
        const { pull_request, action } = payload
        const { title } = pull_request!
        return (
          <View>
            <View>
              {action} pull request <Text className="repo-name">{name}</Text>
            </View>
            <View>{title}</View>
          </View>
        )
      }
      case 'IssueCommentEvent': {
        const { comment, issue } = payload
        const { body } = comment!
        const detail = body.replace(spacesRegExp, ' ')
        const text = truncateText(detail)
        const number = issue!.number
        return (
          <View>
            <View>
              Created comment on #{number} in
              <Text className="repo-name"> {name}</Text>
            </View>
            <View className="event-desc">{text}</View>
          </View>
        )
      }
      case 'WatchEvent': {
        return (
          <View>
            <View>
              Starred <Text className="repo-name">{name}</Text>
            </View>
          </View>
        )
      }
      case 'PublicEvent': {
        return (
          <View>
            <View>
              Open sourced <Text className="repo-name">{name}</Text>
            </View>
          </View>
        )
      }
      case 'ForkEvent': {
        const { forkee } = payload
        return (
          <View>
            <View>
              Forked {forkee!.full_name} from{' '}
              <Text className="repo-name">{name}</Text>
            </View>
          </View>
        )
      }
      case 'CreateEvent': {
        return (
          <View>
            <View>
              Created {payload.ref_type} {payload.ref || ''} at
              <Text className="repo-name"> {name}</Text>
            </View>
            <View className="event-desc">{payload.description}</View>
          </View>
        )
      }
      case 'DeleteEvent': {
        return (
          <View>
            <View>
              Deleted {payload.ref_type} {payload.ref} at
              <Text className="repo-name"> {name}</Text>
            </View>
            <View>{payload.description}</View>
          </View>
        )
      }
      case 'MemberEvent': {
        return (
          <View>
            <View>
              {payload.action} permissions of {payload.member!.login} to
              {payload.repository!.full_name}
            </View>
          </View>
        )
      }
      case 'PullRequestReviewCommentEvent': {
        const comment = payload.comment
        const body = comment!.body
        const detail = body.replace(spacesRegExp, ' ')
        const text = truncateText(detail)
        return (
          <View>
            <View>
              Reviewed pull request in <Text className="repo-name">{name}</Text>
            </View>
            <View className="event-desc">{text}</View>
          </View>
        )
      }
      case 'GollumEvent': {
        const page = payload.pages![0]
        const { action, page_name } = page
        return (
          <View>
            <View>
              {action} {page_name} <Text className="repo-name">{name}</Text>
            </View>
          </View>
        )
      }
      case 'ReleaseEvent': {
        return (
          <View>
            <View>
              Released {payload.release.name || payload.release!.tag_name} at{' '}
              <Text className="repo-name">{name}</Text>
            </View>
          </View>
        )
      }
      case 'CommitCommentEvent': {
        const comment = payload.comment

        return (
          <View>
            <View>
              Commented on commit <Text className="repo-name">{name}</Text> @{' '}
              {comment!.commit_id.substring(0, 8)}
            </View>
          </View>
        )
      }
    }
    const text = JSON.stringify(item)
    return (
      <View>
        <View className="event-desc">{text}</View>
      </View>
    )
  }

  const {
    actor: { avatar_url, display_login, login },
    repo: { name },
    created_at
  } = item

  const handleCardClick = () => {
    Taro.navigateTo({ url: `/pages/repos/index?full_name=${name}` })
  }
  return (
    <View className="item-wrap" onClick={handleCardClick}>
      <Author
        login={login}
        size="28"
        url={avatar_url}
        created_at={created_at}
      ></Author>

      <View className="event-wrap">{renderEvent()}</View>
    </View>
  )
}

export default ActivityItem
