import { View } from '@tarojs/components';
import { AtLoadMore } from 'taro-ui';
import 'taro-ui/dist/style/components/activity-indicator.scss';
import 'taro-ui/dist/style/components/loading.scss';
import styles from './index.module.scss';

const LoadMore = ({ hasMore }: { hasMore: boolean }) => {
  const status = hasMore ? 'loading' : 'noMore';
  return (
    <View className={styles.wrap}>
      <AtLoadMore
        loadingText="努力加载中..."
        noMoreText="没有更多~"
        status={status}
      />
    </View>
  );
};

export default LoadMore;
