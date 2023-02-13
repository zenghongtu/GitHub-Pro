import { SearchReposResponse } from '@/github/githubComponents';
import { Text, View } from '@tarojs/components';
import { ITouchEvent } from '@tarojs/components/types/common';
import Taro from '@tarojs/taro';
import { memo } from 'react';
import { LANGUAGE_COLOR_MAP } from '../../pages/my-languages/languages';
import FontIcon from '../font-icon';
import styles from './index.module.scss';

interface RepoItemProps {
  repo: SearchReposResponse['items'][number];
}

const RepoItem = ({ repo }: RepoItemProps) => {
  if (!repo) {
    return null;
  }
  const {
    id,
    node_id,
    name,
    full_name,
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
  } = repo;

  const { avatar_url, login } = owner || {};

  const handleNameClick = (e: ITouchEvent) => {
    e.stopPropagation();
    const url = `/pages/developer/index?name=${login}`;
    Taro.navigateTo({ url });
  };

  const handleCardClick = () => {
    const url = `/pages/repos/index?owner=${login}&repo=${name}`;

    Taro.navigateTo({ url });
  };

  return (
    <View className={styles['repo-wrap']} onClick={handleCardClick}>
      {/* <Avatar url={avatar_url} size="40" username={login}></Avatar> */}
      <View className={styles.info}>
        <View className={styles.top}>
          <Text className={styles.name}>{full_name}</Text>
          <Text className={styles.language}>{language || ''}</Text>
          <Text
            className={styles['lang-color']}
            style={{ background: LANGUAGE_COLOR_MAP[language!] }}
          ></Text>
        </View>
        <View className={styles.desc}>{description || ''}</View>
        <View className={styles.bottom}>
          <View className={styles['meta-item']}>
            <FontIcon size="14" value="star"></FontIcon>
            <Text style={{ fontWeight: 400 }}>{stargazers_count}</Text>
          </View>
          <View className={styles['meta-item']}>
            <FontIcon size="14" value="git-repo-forked"></FontIcon>
            <Text style={{ fontWeight: 400 }}>{forks_count}</Text>
          </View>
          <View className={styles['meta-item']} onClick={handleNameClick}>
            Updated on{' '}
            <Text style={{ fontWeight: 400 }}>{updated_at.slice(0, 10)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const areEqual = ({ repo: prevRepo }: any, { repo }: any) => {
  return prevRepo && prevRepo.full_name === repo.full_name;
};

export default memo(RepoItem, areEqual);
