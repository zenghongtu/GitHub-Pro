import img from '@/assets/spidertocat.png';
import { Image, View } from '@tarojs/components';
import './index.scss';

const Empty = () => {
  return (
    <View className="wrap">
      <View className="inner">
        <Image src={img} className="img"></Image>
        <View className="desc">No Data.</View>
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
