import UserItem from '@/components/user-item';
import useRequestWIthMore from '@/hooks/useRequestWIthMore';
import { getRepoStars } from '@/services/repos';
import Taro, { useReachBottom, useRouter } from '@tarojs/taro';
import { useEffect } from 'react';

const Stars = () => {
  const {
    params: { owner, repo },
  } = useRouter();
  const full_name = `${owner}/${repo}`;

  const [data, hasMore, refresh, getMore] = useRequestWIthMore<any, any>(
    { full_name },
    getRepoStars,
  );

  useEffect(() => {
    const title = `${full_name} - Stars`;
    Taro.setNavigationBarTitle({ title });
  }, []);

  useReachBottom(() => {
    getMore!();
  });

  return <UserItem data={data} hasMore={hasMore}></UserItem>;
};

export default Stars;
