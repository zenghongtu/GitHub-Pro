import { View } from '@tarojs/components';
import { ITouchEvent } from '@tarojs/components/types/common';
import { ReactNode } from 'react';
import { AtFab, AtIcon } from 'taro-ui';
import styles from './index.module.scss';

interface FabButtonProps {
  icon?: string;
  prefixClass?: string;
  children?: ReactNode;
  size?: 'small' | 'normal';
  onClick: (e: ITouchEvent) => void;
}

const FabButton = ({
  icon = 'filter',
  prefixClass = '',
  onClick,
  children,
  size = 'small',
}: FabButtonProps) => {
  const props: any = { value: icon };
  if (prefixClass) {
    props.prefixClass = prefixClass;
  }
  return (
    <View className={styles['fab-btn']} onClick={onClick}>
      <AtFab size={size}>{children || <AtIcon {...props}></AtIcon>}</AtFab>
    </View>
  );
};

export default FabButton;
