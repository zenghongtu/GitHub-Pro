import img from '@/assets/spidertocat.png';
import { Image, Text, View } from '@tarojs/components';
import { FC } from 'react';
import styles from './index.module.scss';

const Empty: FC = () => {
  return (
    <View className={styles.wrap}>
      <View className={styles.inner}>
        <Image src={img} className={styles.img}></Image>
        <View className={styles.desc}>
          <Text>没有数据~</Text>
          <View>
            <Text className={styles.tips}>试试下拉刷新</Text>
          </View>
        </View>
        {/* <View>
          <AtButton
            size="small"
            type="primary"
            onClick={() => {
              Taro.startPullDownRefresh();
            }}
          >
            重试
          </AtButton>
        </View> */}
      </View>
    </View>
  );
};

export default Empty;
