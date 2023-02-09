import img from '@/assets/stormtroopocat.png';
import { Image, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtButton } from 'taro-ui';
import './index.scss';

const NoAuthority = () => {
  return (
    <View className="wrap">
      <View className="inner">
        <Image src={img} className="img"></Image>
        <View className="desc">This page required login to view</View>
        <View className="login">
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
