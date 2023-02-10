import Avatar from '@/components/avatar';
import FontIcon from '@/components/font-icon';
import { Issue } from '@/services/issues';
import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { UPDATE_ISSUE_INFO } from '../../../store/constatnts';
import { getTimeAgo } from '../../../utils/date';
import styles from './index.module.scss';

interface IssueItemProps {
  issue: Issue;
  full_name?: string;
}
const IssueItem = ({ issue, full_name: _full_name }: IssueItemProps) => {
  if (!issue) {
    return null;
  }

  const dispatch = useDispatch();

  const {
    url,
    repository_url,
    labels_url,
    comments_url,
    events_url,
    html_url,
    id,
    node_id,
    number,
    title,
    user: {
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
      site_admin,
    },
    labels,
    state,
    locked,
    assignee,
    assignees,
    milestone,
    comments,
    created_at,
    updated_at,
    closed_at,
    author_association,
    body,
    pull_request,
    repository,
  } = issue;

  const full_name = _full_name || repository!.full_name;
  const handleNavTo = () => {
    dispatch({ type: UPDATE_ISSUE_INFO, payload: issue });
    const url = `/pages/issues/issue-detail/index?full_name=${full_name}&number=${number}`;
    Taro.navigateTo({ url });
  };

  return (
    <View className={styles.wrap} onClick={handleNavTo}>
      <Avatar url={avatar_url} size="28"></Avatar>
      <View className={styles.info}>
        <View className={styles.top}>
          <Text className={styles.login}>{login}</Text>
          <Text className={styles.create}>{getTimeAgo(created_at)}</Text>
        </View>
        <View className={styles.title}>{title}</View>
        <View className={styles.bottom}>
          <View className={styles.number}>#{number}</View>
          <View className={styles.comments}>
            <FontIcon
              value="comment"
              styleProps={{ fontSize: '15px', marginRight: '5px' }}
            ></FontIcon>
            <Text>{comments}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const areEqual = (prevProps: any, props: any) => {
  return prevProps && prevProps.issue.id === props.issue.id;
};

export default memo(IssueItem, areEqual);
