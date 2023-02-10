import Empty from '@/components/empty';
import LoadMore from '@/components/load-more';
import RepoItem from '@/components/repo-item';
import useRequestWIthMore from '@/hooks/useRequestWIthMore';
import { getCurrentUserRepos } from '@/services/user';
import { getUserRepos } from '@/services/users';
import { View } from '@tarojs/components';
import Taro, { useReachBottom, useRouter } from '@tarojs/taro';
import { useEffect } from 'react';

const RepoList = () => {
  const {
    params: { name, isCurrent },
  } = useRouter();

  // can't use if..else..
  const funcMap = {
    true: getCurrentUserRepos,
    false: getUserRepos,
  };

  let func = funcMap[isCurrent];

  const [repoList, hasMore, refresh, getMoreData] = useRequestWIthMore<any>(
    name,
    func,
  );

  useEffect(() => {
    const title = `${name} - Repositories`;
    Taro.setNavigationBarTitle({ title });
  }, []);

  useReachBottom(() => {
    getMoreData!();
  });

  return (
    <View>
      <View>
        {repoList ? (
          repoList.map((item, idx) => {
            return <RepoItem key={item.id} repo={item}></RepoItem>;
          })
        ) : (
          <Empty></Empty>
        )}
      </View>
      {repoList && <LoadMore hasMore={hasMore!}></LoadMore>}
    </View>
  );
};

export default RepoList;
