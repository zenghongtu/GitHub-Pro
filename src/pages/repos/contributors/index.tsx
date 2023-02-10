import UserItem from '@/components/user-item';
import useRequestWIthMore from '@/hooks/useRequestWIthMore';
import { Contributor, getContributors } from '@/services/repos';
import Taro, { useReachBottom, useRouter } from '@tarojs/taro';
import { useEffect } from 'react';

const Contributors = () => {
  const {
    params: { owner, repo },
  } = useRouter();
  const full_name = `${owner}/${repo}`;

  const [contributors, hasMore, refresh, getMore] = useRequestWIthMore<
    Contributor,
    any
  >({ full_name }, getContributors);

  useEffect(() => {
    const title = `${full_name} - Contributors`;
    Taro.setNavigationBarTitle({ title });
  }, []);

  useReachBottom(() => {
    getMore!();
  });

  return <UserItem data={contributors} hasMore={hasMore}></UserItem>;
};

export default Contributors;
