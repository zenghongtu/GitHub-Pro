import NoAuthority from '@/components/no-authority';
import usePullDownRefreshEvent from '@/hooks/usePullDownRefreshEvent';
import useReachBottomEvent from '@/hooks/useReachBottomEvent';
import { View } from '@tarojs/components';
import { useSelector } from 'react-redux';
import StarredContent from './content';
import './index.scss';

const StarredRepos = () => {
  const username = useSelector<any, any>((state) => state.user.username);

  useReachBottomEvent();
  usePullDownRefreshEvent();

  return (
    <View>
      {username ? (
        <StarredContent username={username}></StarredContent>
      ) : (
        <NoAuthority></NoAuthority>
      )}
    </View>
  );
};

export default StarredRepos;
