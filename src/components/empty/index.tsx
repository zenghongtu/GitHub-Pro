import img from '@/assets/spidertocat.png';
import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { FC } from 'react';
import { AtButton } from 'taro-ui';
import styles from './index.module.scss';

const Empty: FC = () => {
  return (
    <View className={styles.wrap}>
      <View className={styles.inner}>
        <Image src={img} className={styles.img}></Image>
        <View className={styles.desc}>没有数据</View>
        <View>
          <AtButton
            size="small"
            type="primary"
            onClick={() => {
              Taro.startPullDownRefresh();
            }}
          >
            重试
          </AtButton>
        </View>
      </View>
    </View>
  );
};

export default Empty;
