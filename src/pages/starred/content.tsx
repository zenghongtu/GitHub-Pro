import LoadMore from '@/components/load-more';
import { View } from '@tarojs/components';
import Empty from '../../components/empty';
import RepoItem from '../../components/repo-item';
import useRequestWIthMore from '../../hooks/useRequestWIthMore';
import { IStarred } from '../../services/user';
import { getUserStarred } from '../../services/users';
import styles from './index.module.scss';

const StarredContent = ({ username }) => {
  const [starredRepos, hasMore, refresh] = useRequestWIthMore<IStarred>(
    username,
    getUserStarred,
  );

  return (
    <View>
      <View>
        {starredRepos ? (
          <View className={styles['content-wrap']}>
            {starredRepos.map((item, idx) => {
              return <RepoItem key={item.id} repo={item}></RepoItem>;
            })}
          </View>
        ) : (
          <Empty></Empty>
        )}
      </View>
      {starredRepos && <LoadMore hasMore={hasMore!}></LoadMore>}
    </View>
  );
};

export default StarredContent;
