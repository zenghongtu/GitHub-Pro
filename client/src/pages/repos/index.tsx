import Taro, { Component, Config, useState, useEffect } from "@tarojs/taro"
import { View, Text, Block, Button } from "@tarojs/components"
import "./index.scss"
import useRequest from "../../hooks/useRequest"
import { getRepo, Repo, getReadme } from "../../services/repos"
import Empty from "../../components/empty"
import NavBar from "../../components/navbar"
import Readme from "./readme"
import { AtIcon, AtList, AtListItem } from "taro-ui"
import { getFormatDate } from "../../utils/date"
import { bytesToSize } from "../../utils/size"

const full_name = "zenghongtu/Mob"
const Repo = () => {
  const [repoInfo, refresh] = useRequest<Repo>(full_name, getRepo)

  const [showReadme, setShowReadme] = useState(false)

  const renderInfo = () => {
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

    return (
      <Block>
        <View className="header">
          <View className="name">{name}</View>
          <View className="desc">{description}</View>
          <View className="meta">
            <Text className="language">Language: {language}</Text>, size:{" "}
            {bytesToSize(size)}
          </View>
          <View className="meta">
            Created at {getFormatDate(created_at)}, Latest commit{" "}
            {getFormatDate(pushed_at)}
          </View>
        </View>
        <View className="repo-action">
          <View className="action-item">
            <View className="action-icon">
              <AtIcon value="star"></AtIcon>
            </View>
            {stargazers_count}
          </View>
          <View className="action-item">
            <View className="action-icon">
              <AtIcon value="star"></AtIcon>
            </View>
            {forks_count}
          </View>
          <View className="action-item">
            <View className="action-icon">
              <AtIcon value="star"></AtIcon>
            </View>
            {subscribers_count}
          </View>
          <View className="action-item">
            <View className="action-icon">
              <AtIcon value="star"></AtIcon>
            </View>
            share
          </View>
          <View className="action-item">
            <View className="action-icon">
              <AtIcon value="star"></AtIcon>
            </View>
            save
          </View>

          <View className="action-item">
            <View className="action-icon">
              <AtIcon value="star"></AtIcon>
            </View>
            copy
          </View>
        </View>

        <View className="repo-info">
          <AtList hasBorder={false}>
            <AtListItem
              className="info-list-item"
              hasBorder={true}
              title="Author"
              arrow="right"
              extraText={owner.login}
            ></AtListItem>
            <AtListItem
              className="info-list-item"
              hasBorder={true}
              title="Files"
              arrow="right"
            ></AtListItem>
            <AtListItem
              className="info-list-item"
              hasBorder={true}
              title="Activity"
              arrow="right"
            ></AtListItem>
            <AtListItem
              className="info-list-item info-issues"
              hasBorder={true}
              title="Issues"
              arrow="right"
              extraText={`${open_issues_count}`}
            ></AtListItem>
          </AtList>
        </View>

        <View className="repo-info">
          <AtList hasBorder={false}>
            <AtListItem
              className="info-list-item"
              hasBorder={true}
              title="Commits"
              arrow="right"
            ></AtListItem>
            <AtListItem
              className="info-list-item"
              hasBorder={true}
              title="Contributors"
              arrow="right"
            ></AtListItem>
            {/* <AtListItem
              className="info-list-item"
              hasBorder={true}
              title="Branch"
              extraText={default_branch}
            ></AtListItem> */}

            <AtListItem
              className="info-list-item"
              hasBorder={false}
              title="License"
              extraText={license.name}
            ></AtListItem>
          </AtList>
        </View>
      </Block>
    )
  }

  useEffect(() => {
    if (repoInfo) {
      setTimeout(() => {
        setShowReadme(true)
      })
    }
  }, [repoInfo])

  return (
    <View className="wrap">
      <NavBar isGoBackBtn></NavBar>
      <View className="repo">{repoInfo ? renderInfo() : <Empty></Empty>}</View>
      {repoInfo && (
        <View className="readme">
          <View className="title">README</View>
          {showReadme && <Readme full_name={full_name}></Readme>}
        </View>
      )}
    </View>
  )
}

export default Repo
