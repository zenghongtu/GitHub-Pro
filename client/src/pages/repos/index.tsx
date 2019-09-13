import Taro, {
  Component,
  Config,
  useState,
  useEffect,
  useRouter
} from '@tarojs/taro'
import { View, Text, Block, Button } from '@tarojs/components'
import './index.scss'
import useRequest from '../../hooks/useRequest'
import { getRepo, getReadme } from '../../services/repos'
import Empty from '../../components/empty'
import Readme from './readme'
import { AtList, AtListItem, AtAvatar, AtDivider } from 'taro-ui'
import { getFormatDate, getTimeAgo } from '../../utils/date'
import { bytesToSize } from '../../utils/size'
import Avatar from '@/components/avatar'
import FontIcon from '@/components/font-icon'
import ListItem from './list-item'
import { LANGUAGE_COLOR_MAP } from '../my-languages/languages'

const Repo = () => {
  const {
    params: { owner = 'zenghongtu', repo = 'mob' }
  } = useRouter()

  const full_name = `${owner}/${repo}`
  const [repoInfo, refresh] = useRequest<Repo>(full_name, getRepo)

  const [showReadme, setShowReadme] = useState(false)

  useEffect(() => {
    if (repoInfo) {
      setTimeout(() => {
        setShowReadme(true)
      })
    }
  }, [repoInfo])

  const handleNavTo = url => e => {
    Taro.navigateTo({ url })
  }

  const handleReloadIconClick = () => {
    setShowReadme(false)
    setTimeout(() => {
      setShowReadme(true)
    }, 100)
  }

  const renderInfo = repoInfo => {
    const {
      id,
      node_id,
      name,
      full_name,
      private: is_private,
      owner,
      html_url,
      description,
      fork,
      url,
      forks_url,
      keys_url,
      collaborators_url,
      teams_url,
      hooks_url,
      issue_events_url,
      events_url,
      assignees_url,
      branches_url,
      tags_url,
      blobs_url,
      git_tags_url,
      git_refs_url,
      trees_url,
      statuses_url,
      languages_url,
      stargazers_url,
      contributors_url,
      subscribers_url,
      subscription_url,
      commits_url,
      git_commits_url,
      comments_url,
      issue_comment_url,
      contents_url,
      compare_url,
      merges_url,
      archive_url,
      downloads_url,
      issues_url,
      pulls_url,
      milestones_url,
      notifications_url,
      labels_url,
      releases_url,
      deployments_url,
      created_at,
      updated_at,
      pushed_at,
      git_url,
      ssh_url,
      clone_url,
      svn_url,
      homepage,
      size,
      stargazers_count,
      watchers_count,
      language,
      has_issues,
      has_projects,
      has_downloads,
      has_wiki,
      has_pages,
      forks_count,
      mirror_url,
      archived,
      disabled,
      open_issues_count,
      license,
      forks,
      open_issues,
      watchers,
      default_branch,
      permissions,
      allow_squash_merge,
      allow_merge_commit,
      allow_rebase_merge,
      network_count,
      subscribers_count
    } = repoInfo!

    const {
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
    } = owner

    const authorUrl = `/pages/developer/index?name=${login}`
    const filesUrl = `/pages/repos/files/index?owner=${login}&repo=${name}`
    const activityUrl = `/pages/activity/index?name=${login}`
    const issuesUrl = `/pages/issues/index?owner=${login}&repo=${name}`
    const commitsUrl = `/pages/commits/index?owner=${login}&repo=${name}`

    // TODO fix
    const contributorsUrl = `/pages/developer/index?name=${owner.login}`

    return (
      <Block>
        <View className="header">
          <Avatar
            className="avatar-img"
            username={login}
            size={28}
            circle={false}
            url={avatar_url}
          ></Avatar>
          <View>
            <View className="full-name">
              <Text className="login" onClick={handleNavTo(authorUrl)}>
                {login}{' '}
              </Text>
              /<Text className="name"> {name}</Text>
            </View>
            <View className="desc">{description}</View>
            {/* <View className="meta">
              <Text className="language">Language: {language}</Text>, size:{' '}
              {bytesToSize(size)}
            </View> */}
            {/* <View className="meta">Created {getTimeAgo(created_at)}</View> */}
            <View className="meta">Updated {getTimeAgo(pushed_at)}</View>
          </View>
        </View>

        <View className="divider"></View>
        <View className="repo-num">
          <View className="num-item">
            <View className="num">{subscribers_count.toLocaleString()}</View>
            <View className="label">watchs</View>
          </View>
          <View className="num-item">
            <View className="num">{stargazers_count.toLocaleString()}</View>
            <View className="label">stars</View>
          </View>
          <View className="num-item">
            <View className="num">{forks_count.toLocaleString()}</View>
            <View className="label">forks</View>
          </View>
        </View>

        <View className="repo-info">
          <AtList hasBorder={false}>
            <ListItem
              onClick={handleNavTo(filesUrl)}
              title={language}
              icon="code"
              color={LANGUAGE_COLOR_MAP[language]}
              extraText={`${bytesToSize(size)}`}
            ></ListItem>
            <ListItem
              onClick={handleNavTo(activityUrl)}
              title="Activity"
              icon="activity"
              color="#F44337"
            ></ListItem>
            <ListItem
              onClick={handleNavTo(issuesUrl)}
              title="Issues"
              icon="info"
              color="#EC407A"
              extraText={`${open_issues_count}`}
            ></ListItem>
            <ListItem
              hasBorder={false}
              title="License"
              arrow={null}
              icon="book"
              color="#26ca7e"
              extraText={license.name || 'null'}
            ></ListItem>
            {/* <AtListItem
              hasBorder={true}
              title="Pull requests"
              extraText={default_branch}
            ></AtListItem> */}
          </AtList>
        </View>

        <View className="repo-info">
          <AtList hasBorder={false}>
            <ListItem
              onClick={handleNavTo(commitsUrl)}
              title="Commits"
              icon="git-commit"
              color="#3D76FF"
            ></ListItem>
            <ListItem
              onClick={handleNavTo(contributorsUrl)}
              icon="people"
              color="#F99501"
              title="Contributors"
            ></ListItem>
            <ListItem
              hasBorder={false}
              title="Readme"
              arrow={null}
              icon="book-open"
              color="#3D76FF"
              rightIcon={'reload'}
              onRightClick={handleReloadIconClick}
            ></ListItem>
            {/* <ListItem
              hasBorder={true}
              title="Branch"
              extraText={default_branch}
            ></ListItem> */}
          </AtList>
        </View>
      </Block>
    )
  }

  return (
    <View className="wrap">
      <View className="repo">
        {repoInfo ? renderInfo(repoInfo) : <Empty></Empty>}
      </View>
      {repoInfo && (
        <View className="readme">
          {showReadme && <Readme full_name={full_name}></Readme>}
        </View>
      )}
    </View>
  )
}

Repo.config = {
  navigationBarTitleText: 'Repository'
}

export default Repo
