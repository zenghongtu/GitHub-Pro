import { View } from '@tarojs/components';
import { ITouchEvent } from '@tarojs/components/types/common';
import { AtFab, AtIcon } from 'taro-ui';
import './index.scss';

interface FabButtonProps {
  icon?: string;
  prefixClass?: string;
  onClick: (e: ITouchEvent) => void;
}

const FabButton = ({
  icon = 'filter',
  prefixClass = '',
  onClick,
}: FabButtonProps) => {
  const props: any = { value: icon };
  if (prefixClass) {
    props.prefixClass = prefixClass;
  }
  return (
    <View className="fab-btn" onClick={onClick}>
      <AtFab size="small">
        <AtIcon {...props}></AtIcon>
      </AtFab>
    </View>
  );
};

export default FabButton;
