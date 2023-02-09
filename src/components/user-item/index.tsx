import { Block, View } from '@tarojs/components';
import Author from '../author';
import Empty from '../empty';
import LoadMore from '../load-more';
import './index.scss';

const UserItem = ({ data, hasMore }: any) => {
  return (
    <View>
      {data ? (
        <Block>
          {data.map((user) => {
            const node_id = user.node_id;
            const login = user.login;
            const avatar_url = user.avatar_url;
            return (
              <View key={node_id} className="user">
                <Author login={login} url={avatar_url}></Author>
              </View>
            );
          })}
          {data && <LoadMore hasMore={!!hasMore}></LoadMore>}
        </Block>
      ) : (
        <Empty></Empty>
      )}
    </View>
  );
};

export default UserItem;
