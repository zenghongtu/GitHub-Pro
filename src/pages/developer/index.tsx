import UserInfo from '@/components/user-info';
import useRequest from '@/hooks/useRequest';
import { follow } from '@/services/user';
import { getUser, IUser } from '@/services/users';
import { Block } from '@tarojs/components';
import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro';
import { useEffect, useState } from 'react';

const Developer = () => {
  const {
    params: { name },
  } = useRouter();
  const [userInfo, refreshUserInfo] = useRequest<IUser>(name, getUser);
  const [isFollowing, setFollow] = useState<boolean>(false);

  useEffect(() => {
    const title = `Developer`;
    Taro.setNavigationBarTitle({ title });
  }, []);

  useEffect(() => {
    follow.is(name).then((isFollowing) => {
      setFollow(isFollowing);
    });
  }, []);

  const handleFollowBtnClick = () => {
    if (isFollowing) {
      follow.delete(name).then((isSuccess) => {
        if (isSuccess) {
          setFollow(false);
        }
      });
    } else {
      follow.put(name).then((isSuccess) => {
        if (isSuccess) {
          setFollow(true);
        }
      });
    }
  };

  useShareAppMessage((res) => {
    const title = `[${userInfo!.login}] ${userInfo!.bio}`;

    return {
      title,
      path: `/pages/developer/index?name=${name}`,
    };
  });

  return (
    <Block>
      <UserInfo
        userInfo={userInfo}
        isCurrent={false}
        isFollowing={isFollowing}
        onFollowClick={handleFollowBtnClick}
      ></UserInfo>
    </Block>
  );
};

export default Developer;
