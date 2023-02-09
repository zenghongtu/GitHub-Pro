import Empty from '@/components/empty';
import LoadMore from '@/components/load-more';
import RepoItem from '@/components/repo-item';
import useRequestWIthMore from '@/hooks/useRequestWIthMore';
import { IStarred } from '@/services/user';
import { getUserStarred } from '@/services/users';
import { View } from '@tarojs/components';
import Taro, { useReachBottom, useRouter } from '@tarojs/taro';
import { useEffect } from 'react';
import './index.scss';

const StarredRepoList = () => {
  const {
    params: { name },
  } = useRouter();

  const [starredRepos, hasMore, refresh, getMoreData] =
    useRequestWIthMore<IStarred>(name, getUserStarred);

  useEffect(() => {
    const title = `${name} - Starred`;
    Taro.setNavigationBarTitle({ title });
  }, []);

  useReachBottom(() => {
    getMoreData!();
  });

  return (
    <View>
      <View>
        {starredRepos ? (
          starredRepos.map((item, idx) => {
            return <RepoItem key={item.id} repo={item}></RepoItem>;
          })
        ) : (
          <Empty></Empty>
        )}
      </View>
      {starredRepos && <LoadMore hasMore={hasMore!}></LoadMore>}
    </View>
  );
};

export default StarredRepoList;
