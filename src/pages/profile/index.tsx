import NoAuthority from '@/components/no-authority';
import { Block } from '@tarojs/components';
import Taro, { usePullDownRefresh } from '@tarojs/taro';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ProfileContent from './content';

const Profile = () => {
  const username = useSelector<any, any>((state) => state.user.username);

  const [refreshCount, setRefreshCount] = useState(0);

  usePullDownRefresh(() => {
    setRefreshCount((refreshCount) => refreshCount + 1);
    setTimeout(() => {
      Taro.stopPullDownRefresh();
    });
  });

  return (
    <Block>
      {username ? (
        <ProfileContent
          username={username}
          refreshCount={refreshCount}
        ></ProfileContent>
      ) : (
        <NoAuthority></NoAuthority>
      )}
    </Block>
  );
};

export default Profile;
