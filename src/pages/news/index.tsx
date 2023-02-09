import usePullDownRefreshEvent from '@/hooks/usePullDownRefreshEvent';
import useReachBottomEvent from '@/hooks/useReachBottomEvent';
import { View } from '@tarojs/components';
import { useSelector } from 'react-redux';
import NewContent from './content';
import './index.scss';

const News = () => {
  const username = useSelector<any, any>((state) => state.user.username);

  useReachBottomEvent();
  usePullDownRefreshEvent();

  return (
    <View className="wrap">
      <NewContent username={username}></NewContent>
    </View>
  );
};

export default News;
