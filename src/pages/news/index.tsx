import { View } from '@tarojs/components';
import { useSelector } from 'react-redux';
import NewContent from './content';

const News = () => {
  const username = useSelector<any, any>((state) => state.user.username);

  return (
    <View>
      <NewContent username={username}></NewContent>
    </View>
  );
};

export default News;
