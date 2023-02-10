import img from '@/assets/spidertocat.png';
import { Image, View } from '@tarojs/components';
import styles from './index.module.scss';

const Empty = () => {
  return (
    <View className={styles.wrap}>
      <View className={styles.inner}>
        <Image src={img} className={styles.img}></Image>
        <View className={styles.desc}>No Data.</View>
        {/* <View>
          <AtButton
            size="small"
            type="primary"
            onClick={() => {
              Taro.startPullDownRefresh()
            }}
          >
            retry
          </AtButton>
        </View> */}
      </View>
    </View>
  );
};

export default Empty;
