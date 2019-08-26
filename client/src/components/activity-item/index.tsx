import Taro, { Component, Config } from "@tarojs/taro"
import { View, Text, Image } from "@tarojs/components"
import "./index.scss"
import { IUserReceivedEvent } from "../../services/users"

const spacesRegExp = new RegExp("[\r\n\t]+", "g")
const refsHeadsRegExp = new RegExp("refs/heads/")

const maxTextLength = 100

const truncateText = (text = "") => {
  let truncated = text.slice(0, maxTextLength)
  if (text.length >= maxTextLength) {
    truncated += "..."
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
  const {
    id,
    type,
    actor: { avatar_url, display_login },
    repo: { name },
    payload,
    created_at,
    org
  } = item

  const renderAction = () => {
    const {
      id,
      type,
      actor,
      repo: { name },
      payload,
      created_at,
      org
    } = item

    switch (type) {
      case "PushEvent": {
        const { ref, commits } = payload
        const _ref = ref!.replace(refsHeadsRegExp, "")
        return (
          <View>
            <View>
              Pushed to {_ref} as {name}
            </View>
            <View>
              {commits!.map(item => {
                const { message, sha } = item
                const commit = truncateText(message.replace(spacesRegExp, ""))
                const _sha = sha.substr(0, 8)
                return (
                  <View key={sha}>
                    <Text>{_sha} </Text>
                    <Text> {commit}</Text>
                  </View>
                )
              })}
            </View>
          </View>
        )
      }
      case "IssuesEvent": {
        const { issue, action } = payload
        const { number, title } = issue!

        return (
          <View>
            <View>
              {action} issue {name}
            </View>
            <View>{title}</View>
          </View>
        )
      }
      case "PullRequestEvent": {
        const { pull_request, action } = payload
        const { title } = pull_request!
        return (
          <View>
            <View>
              {action} pull request {name}
            </View>
            <View>{title}</View>
          </View>
        )
      }
      case "IssueCommentEvent": {
        const { comment } = payload
        const { body } = comment!
        const detail = body.replace(spacesRegExp, " ")
        const text = truncateText(detail)
        return (
          <View>
            <View>Commented on issue {name}</View>
            <View>{text}</View>
          </View>
        )
      }
      case "WatchEvent": {
        return (
          <View>
            <View>Starred {name}</View>
          </View>
        )
      }
      case "PublicEvent": {
        return (
          <View>
            <View>Open sourced {name}</View>
          </View>
        )
      }
      case "ForkEvent": {
        const { forkee } = payload
        return (
          <View>
            <View>
              Forked {forkee!.full_name} from {name}
            </View>
          </View>
        )
      }
      case "CreateEvent": {
        return (
          <View>
            <View>
              Created {payload.ref_type} {payload.ref || ""} as {name}
            </View>
            <View>{payload.description}</View>
          </View>
        )
      }
      case "DeleteEvent": {
        return (
          <View>
            <View>
              Deleted {payload.ref_type} {payload.ref} at {name}
            </View>
            <View>{payload.description}</View>
          </View>
        )
      }
      case "MemberEvent": {
        return (
          <View>
            <View>
              {payload.action} permissions of {payload.member.login} to
              {payload.repository!.full_name}
            </View>
          </View>
        )
      }
      case "PullRequestReviewCommentEvent": {
        const comment = payload.comment
        const body = comment!.body
        const detail = body.replace(spacesRegExp, " ")
        const text = truncateText(detail)
        return (
          <View>
            <View>Reviewed pull request in {name}</View>
            <View>{text}</View>
          </View>
        )
      }
      case "GollumEvent": {
        const page = payload.pages[0]
        const { action, page_name } = page
        return (
          <View>
            <View>
              {action} {page_name} {name}
            </View>
          </View>
        )
      }
      case "ReleaseEvent": {
        return (
          <View>
            <View>
              Released {payload.release.name || payload.release.tag_name} at{" "}
              {name}
            </View>
          </View>
        )
      }
      case "CommitCommentEvent": {
        const comment = payload.comment

        return (
          <View>
            <View>
              Commented on commit {name} @ {comment!.commit_id.substring(0, 8)}
            </View>
          </View>
        )
      }
    }
    const text = JSON.stringify(item)
    return (
      <View>
        <View>{text}</View>
      </View>
    )
  }

  return (
    <View>
      <View>
        <Image src={avatar_url}></Image>
        <Text>{}</Text>
        <Text></Text>
      </View>
      <View>{renderAction()}</View>
    </View>
  )
}

export default ActivityItem
