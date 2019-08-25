import request from "../utils/request"

export interface IUserInfo {
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
  name: string
  company: string
  blog: string
  location: string
  email: string
  hireable?: any
  bio: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export const getCurrentUser = () => {
  return request.get<IUserInfo | null>("/user")
}

export interface IUserOrg {
  login: string
  id: number
  node_id: string
  url: string
  repos_url: string
  events_url: string
  hooks_url: string
  issues_url: string
  members_url: string
  public_members_url: string
  avatar_url: string
  description: string
}

export const getUserOrgs = (username: string) => {
  return request.get<IUserOrg[]>(`/users/${username}/orgs`)
}

export interface IUserReceivedEvent {
  id: string
  type: string
  actor: Actor
  repo: Repo
  payload: Payload
  public: boolean
  created_at: string
  org?: Org
}

interface Org {
  id: number
  login: string
  gravatar_id: string
  url: string
  avatar_url: string
}

interface Payload {
  action?: string
  ref?: string
  ref_type?: string
  master_branch?: string
  description?: string
  pusher_type?: string
  push_id?: number
  size?: number
  distinct_size?: number
  head?: string
  before?: string
  commits?: Commit[]
  forkee?: Forkee
  issue?: Issue
  comment?: Comment
  repository?: Repository
  number?: number
  pull_request?: Pullrequest
  sender?: User
  member: Member
  pages: Page[]
  release: Release
}

interface Comment {
  url: string
  html_url: string
  id: number
  node_id: string
  user: User
  position?: any
  line?: any
  path?: any
  commit_id: string
  created_at: string
  updated_at: string
  author_association: string
  body: string
}

interface Release {
  url: string
  assets_url: string
  upload_url: string
  html_url: string
  id: number
  node_id: string
  tag_name: string
  target_commitish: string
  name?: any
  draft: boolean
  author: Author
  prerelease: boolean
  created_at: string
  published_at: string
  assets: any[]
  tarball_url: string
  zipball_url: string
  body?: any
}

interface Author {
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

interface Page {
  page_name: string
  title: string
  summary?: any
  action: string
  sha: string
  html_url: string
}

interface Member {
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

interface Pullrequest {
  url: string
  id: number
  node_id: string
  html_url: string
  diff_url: string
  patch_url: string
  issue_url: string
  number: number
  state: string
  locked: boolean
  title: string
  user: User
  body: string
  created_at: string
  updated_at: string
  closed_at?: any
  merged_at?: any
  merge_commit_sha?: any
  assignee?: any
  assignees: any[]
  requested_reviewers: any[]
  requested_teams: any[]
  labels: any[]
  milestone?: any
  commits_url: string
  review_comments_url: string
  review_comment_url: string
  comments_url: string
  statuses_url: string
  head: Head
  base: Head
  _links: Links
  author_association: string
  draft: boolean
  merged: boolean
  mergeable?: any
  rebaseable?: any
  mergeable_state: string
  merged_by?: any
  comments: number
  review_comments: number
  maintainer_can_modify: boolean
  commits: number
  additions: number
  deletions: number
  changed_files: number
}

interface Links {
  self: Self
  html: Self
  issue: Self
  comments: Self
  review_comments: Self
  review_comment: Self
  commits: Self
  statuses: Self
}

interface Self {
  href: string
}

interface Head {
  label: string
  ref: string
  sha: string
  user: User
  repo: Repository
}

interface Repository {
  id: number
  node_id: string
  name: string
  full_name: string
  private: boolean
  owner: User
  html_url: string
  description?: any
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
  homepage?: any
  size: number
  stargazers_count: number
  watchers_count: number
  language?: any
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
  license?: any
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
}

interface Issue {
  url: string
  repository_url: string
  labels_url: string
  comments_url: string
  events_url: string
  html_url: string
  id: number
  node_id: string
  number: number
  title: string
  user: User
  labels: Label[]
  state: string
  locked: boolean
  assignee: User
  assignees: User[]
  milestone: Milestone
  comments: number
  created_at: string
  updated_at: string
  closed_at?: any
  author_association: string
  body: string
}

interface Milestone {
  url: string
  html_url: string
  labels_url: string
  id: number
  node_id: string
  number: number
  title: string
  description: string
  creator: User
  open_issues: number
  closed_issues: number
  state: string
  created_at: string
  updated_at: string
  due_on: string
  closed_at: string
}

interface Label {
  id: number
  node_id: string
  url: string
  name: string
  color: string
  default: boolean
}

interface User {
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
interface Forkee {
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
  language?: any
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
  license?: License
  forks: number
  open_issues: number
  watchers: number
  default_branch: string
  public: boolean
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

interface Commit {
  sha: string
  author: Author
  message: string
  distinct: boolean
  url: string
}

interface Author {
  email: string
  name: string
}

interface Repo {
  id: number
  name: string
  url: string
}

interface Actor {
  id: number
  login: string
  display_login: string
  gravatar_id: string
  url: string
  avatar_url: string
}

export interface IUserReceivedEventsRequestData {
  per_page: number
  page: number
}
export const getUserReceivedEvents = (
  username: string,
  data?: IUserReceivedEventsRequestData
) => {
  return request.get<IUserReceivedEvent[] | null>(
    `/users/${username}/received_events`,
    data
  )
}
