import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AtButton, AtInput, AtTabs, AtTabsPane } from 'taro-ui';
import logo from '../../assets/logo.png';
import { getCurrentUser } from '../../services/user';
import { LOGIN } from '../../store/constatnts';
import Base64 from '../../utils/base64';
import styles from './index.module.scss';

const ACCOUNT_INDEX = 0;
const TOKEN_INDEX = 1;

const tabList = [{ title: 'Account' }, { title: 'Token' }];

interface AuthInfoState {
  username?: string;
  password?: string;
  token?: string;
}

const Login = () => {
  const [currTab, setCurrTab] = useState<number>(0);
  const [authInfo, setAuthInfo] = useState<AuthInfoState>({});
  const handleChangeTab = (val) => {
    setCurrTab(val);
  };

  const dispatch = useDispatch();

  const handleInputChange = (val, e) => {
    const key = e.target.id;
    setAuthInfo({ ...authInfo, [key]: val });
  };

  const handleLoginBtnClick = () => {
    const { username, password, token } = authInfo;

    let authorization: string;
    if (currTab === ACCOUNT_INDEX) {
      if (!username || !password) {
        Taro.showToast({
          title: 'Username or Password is empty',
          icon: 'none',
        });
        return;
      }
      authorization = 'Basic ' + Base64.encode(`${username}:${password}`);
    } else {
      if (!token) {
        Taro.showToast({ title: 'Token is empty', icon: 'none' });
        return;
      }
      authorization = 'token ' + token;
    }

    getCurrentUser(authorization).then((data) => {
      if (data) {
        dispatch({
          type: LOGIN,
          payload: { username: data.login, token: authorization },
        });
        Taro.showToast({
          title: 'login success!',
          icon: 'success',
          duration: 1500,
        });

        setTimeout(() => {
          Taro.navigateBack();
        }, 1500);
      }
    });
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
          <AtTabs current={currTab} tabList={tabList} onClick={handleChangeTab}>
            <View className={styles['tabs-body']}>
              <AtTabsPane current={currTab} index={ACCOUNT_INDEX}>
                <View>
                  <AtInput
                    autoFocus
                    name="username"
                    // title="Username"
                    type="text"
                    placeholder="Username"
                    value={authInfo['username']}
                    onChange={handleInputChange}
                  />
                  <AtInput
                    name="password"
                    // title="Password"
                    type="password"
                    placeholder="Password"
                    value={authInfo['password']}
                    onChange={handleInputChange}
                  />
                </View>
              </AtTabsPane>
              <AtTabsPane current={currTab} index={TOKEN_INDEX}>
                <View>
                  <AtInput
                    name="token"
                    // title="Token"
                    type="text"
                    placeholder="Token"
                    value={authInfo['token']}
                    onChange={handleInputChange}
                  />
                </View>
              </AtTabsPane>
            </View>
          </AtTabs>

          <View className={styles['login-btn-container']}>
            <AtButton
              className={styles['login-btn']}
              size="small"
              type="primary"
              // circle
              onClick={handleLoginBtnClick}
            >
              Login
            </AtButton>
          </View>
          <View className={styles.desc}>
            账号密码等数据只会在本地保存，不会上传到服务器的，放心使用~😎
          </View>
        </View>
      </View>
    </View>
  );
};

export default Login;
