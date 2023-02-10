import Empty from '@/components/empty';
import LoadMore from '@/components/load-more';
import useRequestWIthMore from '@/hooks/useRequestWIthMore';
import { CommitItemData, getCommits } from '@/services/commits';
import { Block, View } from '@tarojs/components';
import Taro, { useRouter } from '@tarojs/taro';
import { useEffect } from 'react';
import CommitItem from './commit-item';

const Commits = () => {
  const {
    params: { owner, repo },
  } = useRouter();
  const full_name = `${owner}/${repo}`;
  const [commitList, hasMore, refresh] = useRequestWIthMore<
    CommitItemData,
    any
  >({ full_name }, getCommits);

  useEffect(() => {
    const title = full_name;
    Taro.setNavigationBarTitle({ title });
  }, []);

  return (
    <View>
      {commitList ? (
        <Block>
          {commitList.map((item) => {
            return <CommitItem commit={item} key={item.node_id}></CommitItem>;
          })}
          <LoadMore hasMore={!!hasMore}></LoadMore>
        </Block>
      ) : (
        <Empty></Empty>
      )}
    </View>
  );
};

export default Commits;
