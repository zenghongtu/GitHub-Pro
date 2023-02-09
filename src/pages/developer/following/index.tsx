import UserItem from '@/components/user-item';
import useRequestWIthMore from '@/hooks/useRequestWIthMore';
import { getUserFollowing } from '@/services/users';
import Taro, { useReachBottom, useRouter } from '@tarojs/taro';
import { useEffect } from 'react';
import './index.scss';

const Following = () => {
  const {
    params: { name },
  } = useRouter();

  const [data, hasMore, refresh, getMore] = useRequestWIthMore<any, any>(
    name,
    getUserFollowing,
  );

  useEffect(() => {
    const title = `${name} - Following`;
    Taro.setNavigationBarTitle({ title });
  }, []);

  useReachBottom(() => {
    getMore!();
  });

  return <UserItem data={data} hasMore={hasMore}></UserItem>;
};

export default Following;
