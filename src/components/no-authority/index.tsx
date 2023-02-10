import img from '@/assets/stormtroopocat.png';
import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtButton } from 'taro-ui';
import styles from './index.module.scss';

const NoAuthority = () => {
  return (
    <View className={styles.wrap}>
      <View className={styles.inner}>
        <Image src={img} className={styles.img}></Image>
        <View className={styles.desc}>This page required login to view</View>
        <View className={styles.login}>
          <AtButton
            size="small"
            circle
            type="primary"
            onClick={() => {
              Taro.navigateTo({ url: `/pages/login/index` });
            }}
          >
            Go to Login
          </AtButton>
        </View>
      </View>
    </View>
  );
};

export default NoAuthority;
