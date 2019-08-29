import Taro, { Component, Config, useState } from "@tarojs/taro"
import { View, Text, Block, Button } from "@tarojs/components"
import "./index.scss"
import useRequest from "../../hooks/useRequest"
import { getRepo, Repo, getReadme } from "../../services/repos"
import Empty from "../../components/empty"
import NavBar from "../../components/navbar"
import Readme from "./readme"

const full_name = "zenghongtu/Mob"
const RepoDetail = () => {
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
        <View>{name}</View>
        <View>{description}</View>
        <View>
          {language} size:{size}
        </View>
        {default_branch}
        <View>
          <Text>Info</Text>
          <Text>Files</Text>
          <Text>commits</Text>
          <Text>activity</Text>
        </View>
        <View>
          <View>
            <Text>{owner.login}</Text>
            <Text>{name}</Text>
          </View>
          <View>
            {created_at}
            {pushed_at}
          </View>
          <View>
            <View>{stargazers_count}</View>
            <View>{open_issues_count}</View>
            <View>{forks_count}</View>
            <View>{watchers_count}</View>
          </View>
        </View>
      </Block>
    )
  }

  return (
    <View>
      <NavBar isGoBackBtn></NavBar>
      <View>{repoInfo ? renderInfo() : <Empty></Empty>}</View>
      <View>{showReadme && <Readme full_name={full_name}></Readme>}</View>
      <View>
        <Button
          onClick={() => {
            setShowReadme(true)
          }}
        >
          more
        </Button>
      </View>
    </View>
  )
}

export default RepoDetail
