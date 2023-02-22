import { useUsersGetAuthenticated } from '@/github/githubComponents';
import { LOGIN } from '@/store/constatnts';
import { copyText } from '@/utils/common';
import { Block, Image, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AtButton, AtInput } from 'taro-ui';
import logo from '../../assets/logo.png';
import styles from './index.module.scss';

const Login = () => {
  const dispatch = useDispatch();

  const [token, setToken] = useState('');

  const authorization = `token ${token}`;
  const { refetch } = useUsersGetAuthenticated(
    { headers: { Authorization: authorization } },
    {
      enabled: false,
      onSuccess(data) {
        if (data) {
          dispatch({
            type: LOGIN,
            payload: { username: data.login, token: authorization },
          });
          Taro.showToast({
            title: '登录成功!',
            icon: 'success',
            duration: 1500,
          });

          setTimeout(() => {
            Taro.navigateBack();
          }, 1500);
        }
      },
    },
  );

  const handleInputChange = (val, e) => {
    setToken(val);
  };

  const handleLoginBtnClick = () => {
    if (!token) {
      Taro.showToast({ title: '请输入 Token！', icon: 'none' });
      return;
    }

    refetch();
  };

  return (
    <View className={styles['layout-container']}>
      <View className={styles['login-container']}>
        <View className={styles['login-header']}>
          <Image
            className={styles['logo-img']}
            mode="widthFix"
            src={logo}
          ></Image>
          <View>Welcome to GitHub Pro.</View>
        </View>
        <View className={styles['login-body']}>
          <View className={styles['tabs-body']}>
            <View>
              <AtInput
                name="token"
                type="text"
                placeholder="Token"
                value={token}
                onChange={handleInputChange}
              />
            </View>
          </View>
          <View className={styles['login-btn-container']}>
            <AtButton
              className={styles['login-btn']}
              size="small"
              type="primary"
              circle
              onClick={handleLoginBtnClick}
            >
              登录
            </AtButton>
          </View>
          <Block>Token 只会在本地保存，不会上传到服务器的，放心使用~😎</Block>
          <Block></Block>
          <View className={styles.desc}>
            <Text
              onClick={async () => {
                await copyText(
                  'https://github.com/settings/tokens/new?scopes=repo%2Cworkflow%2Cnotifications%2Cuser%2Cgist%2Cproject&description=Github%20Pro',
                );
              }}
            >
              https://github.com/settings/tokens/new (点击复制)
            </Text>

            <View>
              <Text>Expiration 选择 No expiration</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
