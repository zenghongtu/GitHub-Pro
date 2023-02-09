import { Block, Image } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { memo } from 'react';
import './index.scss';

interface AvatarProps {
  url: string;
  className?: string;
  username?: string;
  circle?: boolean;
  size?: string | number;
}
const Avatar = ({
  url,
  className = '',
  username = '',
  circle = true,
  size = 40,
}: AvatarProps) => {
  const width = size + 'px';
  const styleProps: any = {
    width,
    height: width,
  };

  if (!circle) {
    styleProps.borderRadius = +size / 4 + 'px';
  }

  const handleImgClick = () => {
    if (!username) {
      return;
    }
    const url = `/pages/developer/index?name=${username}`;
    Taro.navigateTo({ url });
  };

  return (
    <Block>
      <Image
        onClick={handleImgClick}
        className={`avatar ${className}`}
        style={styleProps}
        src={url}
      ></Image>
    </Block>
  );
};

const areEqual = (prevProps: any, props: any) => {
  return prevProps.url === props.url;
};

export default memo(Avatar, areEqual);
