import { View } from '@tarojs/components';
import './index.scss';

import LoadMore from '@/components/load-more';
import Empty from '../../components/empty';
import RepoItem from '../../components/repo-item';
import useRequestWIthMore from '../../hooks/useRequestWIthMore';
import { IStarred } from '../../services/user';
import { getUserStarred } from '../../services/users';

const StarredContent = ({ username }) => {
  const [starredRepos, hasMore, refresh] = useRequestWIthMore<IStarred>(
    username,
    getUserStarred,
  );

  return (
    <View>
      <View>
        {starredRepos ? (
          <View className="content-wrap">
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
