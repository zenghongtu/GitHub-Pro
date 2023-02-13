import FontIcon from '@/components/font-icon';
import { Image, ITouchEvent, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { FC, memo } from 'react';
import { useSelector } from 'react-redux';
import { TrendingDeveloperData } from 'types/trending';
import styles from './index.module.scss';

const UserItem: FC<{ data: TrendingDeveloperData; index: number }> = ({
  data,
  index,
}) => {
  const { avatar, name, repo, url, username: author, sponsorUrl } = data;

  const username = useSelector<any, any>((state) => state.user.username);

  const handleAuthorClick = (e: ITouchEvent) => {
    e.stopPropagation();
    let url: string;
    if (username === author) {
      url = `/pages/profile/index`;
    } else {
      url = `/pages/developer/index?name=${author}`;
    }

    Taro.navigateTo({
      url,
    });
  };

  const handleRepoClick = () => {
    if (repo?.url) {
      const [repoName, owner] = repo.url.split('/').reverse();
      const url = `/pages/repos/index?owner=${owner}&repo=${repoName}`;
      Taro.navigateTo({
        url,
      });
    }
  };

  return (
    <View className={styles.cardWrap}>
      <View className={styles.author} onClick={handleAuthorClick}>
        <View className={styles.index}> {index + 1}</View>
        <Image src={`${avatar}?s=96&v=4`} className={styles.avatar}></Image>
        <View className={styles.nameWrap}>
          <View className={styles.name}>{name}</View>
          <View className={styles.authorName}>{author}</View>
        </View>
      </View>
      <View className={styles.repo} onClick={handleRepoClick}>
        {repo && (
          <View>
            <Text className={styles.repoName}>
              <FontIcon
                size="14"
                value="hot"
                styleProps={{ color: 'red' }}
              ></FontIcon>
              {repo.name}
            </Text>
            <Text className={styles.description}>{repo.description}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default memo(
  UserItem,
  (prev, curr) => prev?.data.url === curr?.data.url,
);
