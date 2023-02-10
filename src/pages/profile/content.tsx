import Empty from '@/components/empty';
import UserInfo from '@/components/user-info';
import { getCurrentUser, IUserInfo } from '@/services/user';
import { LOGIN, LOGOUT } from '@/store/constatnts';
import { Block } from '@tarojs/components';
import Taro, { useShareAppMessage } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const ProfileContent = ({ username, refreshCount }) => {
  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const dispatch = useDispatch();

  const getUser = () => {
    getCurrentUser().then((data) => {
      if (data) {
        setUserInfo(data);
        dispatch({ type: LOGIN, payload: { username: data.login } });
      }
    });
  };
  useEffect(() => {
    if (username) {
      getUser();
    }
  }, [refreshCount]);

  useShareAppMessage((res) => {
    const title = `[${userInfo!.login}] ${userInfo!.bio}`;

    return {
      title,
      path: `/pages/developer/index?name=${userInfo!.login}`,
    };
  });

  const handleLogout = () => {
    Taro.showModal({
      content: 'Are you sure?',
      cancelText: 'No',
      cancelColor: '#fb3e3b',
      confirmText: 'Sure',
      confirmColor: '#007afb',

      success(res) {
        if (res.confirm) {
          dispatch({ type: LOGOUT });
          setUserInfo(null);
          Taro.switchTab({ url: '/pages/trending/index' });
        } else if (res.cancel) {
        }
      },
    });
  };

  return (
    <Block>
      {userInfo ? (
        <UserInfo userInfo={userInfo} onLogout={handleLogout}></UserInfo>
      ) : (
        <Empty></Empty>
      )}
    </Block>
  );
};

export default ProfileContent;
