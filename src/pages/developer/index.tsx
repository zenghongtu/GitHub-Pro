import SkeletonCard from '@/components/skeleton-card';
import UserInfo from '@/components/user-info';
import {
  useUsersCheckPersonIsFollowedByAuthenticated,
  useUsersFollow,
  useUsersGetByUsername,
  useUsersUnfollow,
} from '@/github/githubComponents';
import { Block } from '@tarojs/components';
import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro';
import { useEffect, useState } from 'react';

const Developer = () => {
  const {
    params: { name },
  } = useRouter();
  const username = name!;
  const {
    data: userInfo,
    isError,
    isLoading,
  } = useUsersGetByUsername({
    pathParams: { username },
  });

  const [isFollowing, setIsFollowing] = useState(false);

  useUsersCheckPersonIsFollowedByAuthenticated(
    {
      pathParams: { username },
    },
    {
      enabled: !!username,
      onSuccess(data) {
        const isFollowing = !data && data !== null;
        setIsFollowing(isFollowing);
      },
    },
  );

  const { mutateAsync: unFollow } = useUsersUnfollow();

  const { mutateAsync: updateFollow } = useUsersFollow();

  useEffect(() => {
    const title = `Developer`;
    Taro.setNavigationBarTitle({ title });
  }, []);

  const handleFollowBtnClick = () => {
    if (isFollowing) {
      unFollow({ pathParams: { username } }).then((data) => {
        if (!data && data !== null) {
          setIsFollowing(false);
        }
      });
    } else {
      updateFollow({ pathParams: { username } }).then((data) => {
        if (!data && data !== null) {
          setIsFollowing(true);
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
      <SkeletonCard isError={isError} isLoading={isLoading}>
        <UserInfo
          userInfo={userInfo}
          isCurrent={false}
          isFollowing={isFollowing}
          onFollowClick={handleFollowBtnClick}
        ></UserInfo>
      </SkeletonCard>
    </Block>
  );
};

export default Developer;
