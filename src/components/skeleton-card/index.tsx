import { View } from '@tarojs/components';
import { FC, ReactNode } from 'react';
import Empty from '../empty';

const SkeletonCard: FC<{
  children: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
}> = ({ children, isLoading, isError }) => {
  // TODO skeleton replace loading
  return (
    <View>
      {/* {isLoading && (
        <AtIcon prefixClass="fa" value="clock" size="30" color="#F00"></AtIcon>
      )} */}
      {isError && <Empty />}
      {!isError && !isLoading && children}
    </View>
  );
};

export default SkeletonCard;
