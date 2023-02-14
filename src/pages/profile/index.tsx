import NoAuthority from '@/components/no-authority';
import { Block } from '@tarojs/components';
import { useSelector } from 'react-redux';
import ProfileContent from './content';

const Profile = () => {
  const username = useSelector<any, any>((state) => state.user.username);

  return (
    <Block>
      {username ? (
        <ProfileContent></ProfileContent>
      ) : (
        <NoAuthority></NoAuthority>
      )}
    </Block>
  );
};

export default Profile;
