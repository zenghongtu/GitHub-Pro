import SkeletonCard from '@/components/skeleton-card';
import UserInfo from '@/components/user-info';
import { useUsersGetAuthenticated } from '@/github/githubComponents';
import { LOGOUT } from '@/store/constatnts';
import Taro, { usePullDownRefresh, useShareAppMessage } from '@tarojs/taro';
import { useDispatch } from 'react-redux';

const ProfileContent = () => {
  const dispatch = useDispatch();
  const {
    data: userInfo,
    refetch,
    isError,
    isLoading,
  } = useUsersGetAuthenticated({});

  useShareAppMessage((res) => {
    const title = `[${userInfo!.login}] ${userInfo!.bio}`;

    return {
      title,
      path: `/pages/developer/index?name=${userInfo!.login}`,
    };
  });

  usePullDownRefresh(() => {
    refetch();
  });

  const handleLogout = () => {
    Taro.showModal({
      content: '确认退出?',
      cancelText: 'No',
      cancelColor: '#fb3e3b',
      confirmText: 'Yes',
      confirmColor: '#007afb',

      success(res) {
        if (res.confirm) {
          dispatch({ type: LOGOUT });
          Taro.switchTab({ url: '/pages/trending/index' });
        } else if (res.cancel) {
        }
      },
    });
  };

  return (
    <SkeletonCard isError={isError} isLoading={isLoading}>
      <UserInfo userInfo={userInfo} onLogout={handleLogout}></UserInfo>
    </SkeletonCard>
  );
};

export default ProfileContent;
