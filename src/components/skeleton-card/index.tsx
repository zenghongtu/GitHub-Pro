import monaLoadingGif from '@/assets/mona-loading.gif';
import { Block, Image, Text, View } from '@tarojs/components';
import { FC, ReactNode } from 'react';
import Empty from '../empty';
import styles from './index.module.scss';

const SkeletonCard: FC<{
  children: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
}> = ({ children, isLoading, isError }) => {
  // TODO skeleton replace loading
  return (
    <Block>
      {isLoading ? (
        <View className={styles.loading}>
          <Image
            mode="widthFix"
            style={{ width: '90px' }}
            src={monaLoadingGif}
          ></Image>
          <View>
            <Text>努力加载..</Text>
          </View>
        </View>
      ) : isError ? (
        <Empty></Empty>
      ) : (
        children
      )}
    </Block>
  );
};

export default SkeletonCard;
