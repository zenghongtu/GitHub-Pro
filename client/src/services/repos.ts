import request from "../utils/request"

export interface Repo {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: Owner
  html_url: string
  description: string
  fork: boolean
  url: string
  forks_url: string
  keys_url: string
  collaborators_url: string
  teams_url: string
  hooks_url: string
  issue_events_url: string
  events_url: string
  assignees_url: string
  branches_url: string
  tags_url: string
  blobs_url: string
  git_tags_url: string
  git_refs_url: string
  trees_url: string
  statuses_url: string
  languages_url: string
  stargazers_url: string
  contributors_url: string
  subscribers_url: string
  subscription_url: string
  commits_url: string
  git_commits_url: string
  comments_url: string
  issue_comment_url: string
  contents_url: string
  compare_url: string
  merges_url: string
  archive_url: string
  downloads_url: string
  issues_url: string
  pulls_url: string
  milestones_url: string
  notifications_url: string
  labels_url: string
  releases_url: string
  deployments_url: string
  created_at: string
  updated_at: string
  pushed_at: string
  git_url: string
  ssh_url: string
  clone_url: string
  svn_url: string
  homepage: string
  size: number
  stargazers_count: number
  watchers_count: number
  language: string
  has_issues: boolean
  has_projects: boolean
  has_downloads: boolean
  has_wiki: boolean
  has_pages: boolean
  forks_count: number
  mirror_url?: any
  archived: boolean
  disabled: boolean
  open_issues_count: number
  license: License
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
  permissions: Permissions
  allow_squash_merge: boolean
  allow_merge_commit: boolean
  allow_rebase_merge: boolean
  network_count: number
  subscribers_count: number
}

interface Permissions {
  admin: boolean
  push: boolean
  pull: boolean
}

interface License {
  key: string
  name: string
  spdx_id: string
  url: string
  node_id: string
}

interface Owner {
  login: string
  id: number
  node_id: string
  avatar_url: string
  gravatar_id: string
  url: string
  html_url: string
  followers_url: string
  following_url: string
  gists_url: string
  starred_url: string
  subscriptions_url: string
  organizations_url: string
  repos_url: string
  events_url: string
  received_events_url: string
  type: string
  site_admin: boolean
}

export const getRepo = (full_name: string) => {
  return request.get<Repo | null>(`/repos/${full_name}`)
}
export const getReadme = (full_name: string) => {
  return request.get<Repo | null>(`/repos/${full_name}/readme`,, {})
}

export const getRawReadme = (full_name: string) => {
  return request.get<string | null>(
    `/repos/${full_name}/readme`,
    {},
    { Accept: "application/vnd.github.v3.raw" }
  )
}

export interface File {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url?: string;
  type: string;
  _links: Links;
}

interface Links {
  self: string;
  git: string;
  html: string;
}

export const getContents =(url:string) => {
  return request.get<File[] | null>(
    url,
  )
}

export const getRawContent =(full_file_path:string) => {
  return request.get<string | null>(
    `/repos/${full_file_path}`,
    {},
    { Accept: "application/vnd.github.v3.raw" }
  )
}
