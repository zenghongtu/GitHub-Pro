import request from '../utils/request'
import { Issue } from '@/services/issues'
import { IDefaultParams } from '@/constants'

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
  return request.get<IUserInfo | null>('/user')
}

export interface IStarred {
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
  homepage?: string
  size: number
  stargazers_count: number
  watchers_count: number
  language?: string
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
  permissions: Permissions
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
  url?: string
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

export interface starredParams {
  per_page: number
  page: number
}
export const getStarred = (params: starredParams) => {
  return request.get<IStarred[] | null>('/user/starred', params)
}

export const follow = {
  is: async (username: string): Promise<boolean> => {
    return request.get(`/user/following/${username}`).then(data => {
      if (!data && data !== null) {
        return true
      }
      return false
    })
  },
  delete: async (username: string): Promise<boolean> => {
    return request.delete(`/user/following/${username}`).then(data => {
      if (!data && data !== null) {
        return true
      }
      return false
    })
  },
  put: async (username: string): Promise<boolean> => {
    return request.put(`/user/following/${username}`).then(data => {
      if (!data && data !== null) {
        return true
      }
      return false
    })
  }
}

export const starred = {
  is: async (full_name: string): Promise<boolean> => {
    return request.get(`/user/starred/${full_name}`).then(data => {
      if (!data && data !== null) {
        return true
      }
      return false
    })
  },
  delete: async (full_name: string): Promise<boolean> => {
    return request.delete(`/user/starred/${full_name}`).then(data => {
      if (!data && data !== null) {
        return true
      }
      return false
    })
  },
  put: async (full_name: string): Promise<boolean> => {
    return request.put(`/user/starred/${full_name}`).then(data => {
      if (!data && data !== null) {
        return true
      }
      return false
    })
  }
}

export const forks = {
  is: async (full_name: string): Promise<boolean> => {
    return request.get(`/user/starred/${full_name}`).then(data => {
      if (!data && data !== null) {
        return true
      }
      return false
    })
  },
  delete: async (full_name: string): Promise<boolean> => {
    return request.delete(`/user/starred/${full_name}`).then(data => {
      if (!data && data !== null) {
        return true
      }
      return false
    })
  },
  put: async (full_name: string): Promise<boolean> => {
    return request.put(`/user/starred/${full_name}`).then(data => {
      if (!data && data !== null) {
        return true
      }
      return false
    })
  }
}

export const getUserIssues = (params: any) => {
  return request.get<Issue[] | null>('/user/issues', params)
}

export const getCurrentUserRepos = (name, params: IDefaultParams) => {
  return request.get<any | null>('/user/repos', params)
}
