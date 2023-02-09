import LoadMore from '@/components/load-more';
import Markdown from '@/components/markdown';
import { View } from '@tarojs/components';
import useRequest from '../../../hooks/useRequest';
import { getRawReadme } from '../../../services/repos';
import './index.scss';

const Readme = ({ full_name }) => {
  const [md, refreshMD] = useRequest<string | null>(full_name, getRawReadme);

  return (
    <View>
      {md ? (
        <Markdown md={md} full_name={full_name}></Markdown>
      ) : (
        // <Empty></Empty>
        <LoadMore hasMore={true}></LoadMore>
      )}
    </View>
  );
};

export default Readme;
