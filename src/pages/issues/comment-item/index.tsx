import Author from '@/components/author';
import Markdown from '@/components/markdown';
import { View } from '@tarojs/components';
import { memo } from 'react';
import styles from './index.module.scss';

const CommentItem = ({ comment, full_name }) => {
  if (!comment) {
    return null;
  }
  const {
    url,
    html_url,
    issue_url,
    id,
    node_id,
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
      events_url,
      received_events_url,
      type,
      site_admin,
    },
    created_at,
    updated_at,
    author_association,
    body,
  } = comment;

  return (
    <View className={styles.wrap}>
      <View className={styles.author}>
        <Author url={avatar_url} login={login} created_at={created_at}></Author>
      </View>
      <View className={styles.content}>
        <Markdown md={body} full_name={full_name}></Markdown>
      </View>
    </View>
  );
};

const areEqual = (prevProps: any, props: any) => {
  return prevProps && prevProps.comment.id === props.comment.id;
};

export default memo(CommentItem, areEqual);
