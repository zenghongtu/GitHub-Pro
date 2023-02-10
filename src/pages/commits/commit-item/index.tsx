import Avatar from '@/components/avatar';
import FontIcon from '@/components/font-icon';
import { CommitItemData } from '@/services/commits';
import { Text, View } from '@tarojs/components';
import { ITouchEvent } from '@tarojs/components/types/common';
import Taro from '@tarojs/taro';
import { getTimeAgo } from '../../../utils/date';
import styles from './index.module.scss';

interface CommitItemProps {
  commit: CommitItemData;
  full_name?: string;
}
const CommitItem = ({ commit, full_name = '' }: CommitItemProps) => {
  if (!commit) {
    return null;
  }
  const {
    sha,
    node_id,
    commit: {
      committer: { name, email, date },
      message,
      tree,
      comment_count,
      verification,
    },
    url,
    html_url,
    comments_url,
    author,
    committer: {
      login,
      id,
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
    parents,
  } = commit;

  const handleClick = () => {
    Taro.showToast({ title: 'Developing', icon: 'none' });
  };

  const handleNavTo = (e: ITouchEvent) => {
    e.preventDefault();
    const url = `/pages/developer/index?name=${login}`;
    Taro.navigateTo({ url });
  };

  const shortSha = sha.slice(0, 8);
  return (
    <View className={styles.wrap} onClick={handleClick}>
      <Avatar url={avatar_url} username={login}></Avatar>
      <View className={styles.info}>
        <View className={styles.top}>
          <Text className={styles.login} onClick={handleNavTo}>
            {login}
          </Text>
          <Text className={styles.create}>{getTimeAgo(date)}</Text>
        </View>
        <View className={styles.title}>{message}</View>
        <View className={styles.bottom}>
          <Text className={styles.number}>{shortSha}</Text>
          <View className={styles.comments}>
            <FontIcon
              value="comment"
              styleProps={{ fontSize: '15px', marginRight: '5px' }}
            ></FontIcon>
            <Text>{comment_count}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CommitItem;
