import UserItem from '@/components/user-item';
import useRequestWIthMore from '@/hooks/useRequestWIthMore';
import { getUserFollowers } from '@/services/users';
import Taro, { useReachBottom, useRouter } from '@tarojs/taro';
import { useEffect } from 'react';

const Followers = () => {
  const {
    params: { name },
  } = useRouter();

  const [data, hasMore, refresh, getMore] = useRequestWIthMore<any, any>(
    name,
    getUserFollowers,
  );

  useEffect(() => {
    const title = `${name} - Followers`;
    Taro.setNavigationBarTitle({ title });
  }, []);

  useReachBottom(() => {
    getMore!();
  });

  return <UserItem data={data} hasMore={hasMore}></UserItem>;
};

export default Followers;
