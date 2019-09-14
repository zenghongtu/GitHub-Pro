import Taro, {
  Component,
  Config,
  useState,
  useEffect,
  useRouter,
  useShareAppMessage
} from '@tarojs/taro'
import { View, Text, Block, Button } from '@tarojs/components'
import './index.scss'
import useRequest from '../../hooks/useRequest'
import { getRepo, getReadme, Repo } from '../../services/repos'
import Empty from '../../components/empty'
import Readme from './readme'
import {
  AtList,
  AtListItem,
  AtAvatar,
  AtDivider,
  AtActionSheet,
  AtActionSheetItem,
  AtFloatLayout
} from 'taro-ui'
import { getFormatDate, getTimeAgo } from '../../utils/date'
import { bytesToSize } from '../../utils/size'
import Avatar from '@/components/avatar'
import FontIcon from '@/components/font-icon'
import ListItem from '../../components/list-item'
import { LANGUAGE_COLOR_MAP } from '../my-languages/languages'
import FabButton from '@/components/fab-button'
import { ITouchEvent } from '@tarojs/components/types/common'
import { starred } from '@/services/user'
import { githubHttpsUrl } from '@/utils/repo'
import { copyText } from '@/utils/common'

const Repository = () => {
  const {
    params: { owner, repo, full_name: _full_name }
  } = useRouter()

  const full_name = _full_name || `${owner}/${repo}`
  const [repoInfo, refresh] = useRequest<Repo>(full_name, getRepo)

  const [showReadme, setShowReadme] = useState(false)
  const [showActions, setShowAction] = useState(false)
  const [isStarred, setIsStarred] = useState(false)

  useShareAppMessage(res => {
    handleClose()

    const title = `[${full_name}] ${repoInfo!.description}`
    setTimeout(() => {
      return {
        title,
        path: `/pages/repos/index?full_name=${full_name}`
      }
    }, 1000)
  })

  useEffect(() => {
    starred.is(full_name).then(res => {
      setIsStarred(res)
    })
  }, [])

  useEffect(() => {
    if (repoInfo) {
      setTimeout(() => {
        setShowReadme(true)
      })
    }
  }, [repoInfo])

  const exeFunc = (func, cb) => {
    handleClose()
    func(full_name).then(res => {
      cb()
      Taro.showToast({ title: 'Success', icon: 'success' })
    })
  }

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

    const params = `owner=${login}&repo=${name}`
    const authorUrl = `/pages/developer/index?name=${login}`
    const filesUrl = `/pages/repos/files/index?${params}`
    const activityUrl = `/pages/activity/repo?${params}`
    const issuesUrl = `/pages/issues/index?${params}`
    const commitsUrl = `/pages/commits/index?${params}`
    const contributorsUrl = `/pages/repos/contributors/index?${params}`

    return (
      <Block>
        <View className="header">
          <Avatar
            className="avatar-img"
            username={login}
            size={45}
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
            <View className="num">
              {Number(subscribers_count).toLocaleString()}
            </View>
            <View className="label">watchs</View>
          </View>
          <View className="num-item">
            <View className="num">
              {Number(stargazers_count).toLocaleString()}
            </View>
            <View className="label">stars</View>
          </View>
          <View className="num-item">
            <View className="num">{Number(forks_count).toLocaleString()}</View>
            <View className="label">forks</View>
          </View>
        </View>

        <View className="repo-info">
          <AtList hasBorder={false}>
            <ListItem
              onClick={handleNavTo(filesUrl)}
              title={language}
              icon="code"
              color={LANGUAGE_COLOR_MAP[language] || '#002eb0'}
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
              extraText={(license && license.name) || ''}
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
              color="#2AB09D"
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

  const handleClose = () => {
    setShowAction(false)
  }

  const handleFabClick = (e: ITouchEvent) => {
    e.stopPropagation()
    setShowAction(true)
  }

  const handleActionClick = (label: string) => (e: ITouchEvent) => {
    if (!repoInfo) {
      return
    }

    switch (label) {
      case 'star':
        if (isStarred) {
          exeFunc(starred.delete, () => {
            setIsStarred(false)
          })
        } else {
          exeFunc(starred.put, () => {
            setIsStarred(true)
          })
        }
        return
      case 'save':
        Taro.showToast({ title: 'developing...', icon: 'none' })
        return
      case 'copy':
        const data = `${githubHttpsUrl}/${full_name}`
        handleClose()

        setTimeout(() => {
          copyText(data)
        }, 500)

        return
      case 'share':
        return
      // case 'fork':
      //   const { fork } = repoInfo
      //   if (fork) {
      //     Taro.showToast({ title: 'It has been Forked', icon: 'none' })
      //   }
      //   return

      default:
        return
    }
  }

  const IconStyleProps: React.CSSProperties = {
    borderRadius: '50%',
    padding: '5px',
    color: 'white',
    background: '#fb4d28',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.05)'
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
      <FabButton
        prefixClass="icon"
        icon="events"
        onClick={handleFabClick}
      ></FabButton>
      <AtFloatLayout isOpened={showActions} title="" onClose={handleClose}>
        <View className="actions">
          <View className="action-item" onClick={handleActionClick('star')}>
            <View className="icon-wrap">
              <FontIcon
                styleProps={{
                  ...IconStyleProps,
                  background: '#4c5bd3'
                }}
                value="star"
              ></FontIcon>
            </View>
            <View className="action-label">
              {isStarred ? 'unstar' : 'star'}
            </View>
          </View>
          {/* // TODO */}
          {/* <View className="action-item" onClick={handleActionClick('fork')}>
            <View>
              <FontIcon
                styleProps={{
                  ...IconStyleProps,
                  background: '#007dfb'
                }}
                value="git-repo-forked"
              ></FontIcon>
            </View>
            <View className="action-label">Fork</View>
          </View> */}
          {/* <View className="action-item" onClick={handleActionClick('watch')}>
            <View>
              <FontIcon
                styleProps={{
                  ...IconStyleProps,
                  background: '#fb4d28'
                }}
                value="eye"
              ></FontIcon>
            </View>
            <View className="action-label">Watch</View>
          </View> */}
          <View className="action-item" onClick={handleActionClick('save')}>
            <View className="icon-wrap">
              <FontIcon
                styleProps={{
                  ...IconStyleProps,
                  background: '#007dfb'
                }}
                value="baocuntupian"
              ></FontIcon>
            </View>
            <View className="action-label">save</View>
          </View>
          <View className="action-item" onClick={handleActionClick('copy')}>
            <View className="icon-wrap">
              <FontIcon
                styleProps={{
                  ...IconStyleProps,
                  background: '#EC407A'
                }}
                value="copy"
              ></FontIcon>
            </View>
            <View className="action-label">Copy</View>
          </View>
          <View className="action-item" onClick={handleActionClick('share')}>
            <Button className="share-btn" openType="share"></Button>
            <View className="icon-wrap">
              <FontIcon
                styleProps={{
                  ...IconStyleProps,
                  background: '#3F9FFF'
                }}
                value="link-external"
              ></FontIcon>
            </View>
            <View className="action-label">Share</View>
          </View>
        </View>
      </AtFloatLayout>
    </View>
  )
}

Repository.config = {
  navigationBarTitleText: 'Repository'
}

export default Repository
