import request from '../utils/request';

export interface Issue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: Label[];
  state: string;
  locked: boolean;
  assignee?: any;
  assignees: any[];
  milestone?: any;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string;
  author_association: string;
  body: string;
  pull_request?: Pullrequest;
  repository?: {
    full_name: string;
  };
}

interface Pullrequest {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
}

interface Label {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
}

interface User {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

export const getIssues = (full_name: string, params) => {
  return request.get<Issue[] | null>(`/repos/${full_name}/issues`, params, {
    Accept: 'application/vnd.github.VERSION.raw+json',
  });
};

export const getIssueDetail = ({ full_name, number }, params = {}) => {
  return request.get<Issue | null>(
    `/repos/${full_name}/issues/${number}`,
    params,
    { Accept: 'application/vnd.github.VERSION.raw+json' },
  );
};

export interface IssueComment {
  url: string;
  html_url: string;
  issue_url: string;
  id: number;
  node_id: string;
  user: User;
  created_at: string;
  updated_at: string;
  author_association: string;
  body: string;
}

export const getIssueComments = ({ full_name, number }, params = {}) => {
  return request.get<IssueComment[] | null>(
    `/repos/${full_name}/issues/${number}/comments`,
    params,
    { Accept: 'application/vnd.github.VERSION.raw+json' },
  );
};

export const createIssue = ({ full_name }, data) => {
  return request.post<Issue | null>(`/repos/${full_name}/issues`, data);
};

export const createIssueComment = ({ full_name, number }, data) => {
  return request.post<IssueComment | null>(
    `/repos/${full_name}/issues/${number}/comments`,
    data,
  );
};
