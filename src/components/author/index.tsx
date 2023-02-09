import { getTimeAgo } from '@/utils/date';
import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { memo } from 'react';
import Avatar from '../avatar';
import './index.scss';

interface AuthorProps {
  login: string;
  url: string;
  size?: number | string;
  created_at?: string;
}
const Author = ({ login, url, size, created_at = '' }: AuthorProps) => {
  const handleLoginClick = () => {
    const url = `/pages/developer/index?name=${login}`;
    Taro.navigateTo({ url });
  };

  return (
    <View
      className="author"
      style={
        !!created_at ? undefined : { alignItems: 'center', paddingLeft: '20px' }
      }
    >
      <Avatar size={size} username={login} url={url}></Avatar>
      <Text className="login" onClick={handleLoginClick}>
        {login}
      </Text>
      {!!created_at && (
        <Text className="create-at">{getTimeAgo(created_at)}</Text>
      )}
    </View>
  );
};

const areEqual = ({ login: prevLogin }: any, { login }: any) => {
  return prevLogin === login;
};

export default memo(Author, areEqual);
