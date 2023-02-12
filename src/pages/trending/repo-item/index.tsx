import FontIcon from '@/components/font-icon';
import { Image, Text, View } from '@tarojs/components';
import { ITouchEvent } from '@tarojs/components/types/common';
import Taro from '@tarojs/taro';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { TrendingRepoData } from 'types/trending';
import styles from './index.module.scss';

const RepoItem = ({
  repo,
  index,
  durationText,
}: {
  repo: TrendingRepoData;
  index: number;
  durationText: string;
}) => {
  if (!repo) {
    return null;
  }
  const username = useSelector<any, any>((state) => state.user.username);

  const handleCardClick = () => {
    const url = `/pages/repos/index?owner=${author}&repo=${name}`;
    Taro.navigateTo({
      url,
    });
  };

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

  const {
    author,
    name,
    avatar,
    url,
    description,
    language,
    languageColor,
    stars,
    forks,
    currentPeriodStars,
    builtBy,
  } = repo;

  return (
    <View className={styles['card-wrap']} onClick={handleCardClick}>
      <View className={styles['card-top']}>
        <View className={styles.info}>
          <View className={styles.name}>
            <View className={styles.index}> {index + 1}</View>
            {name}
          </View>
          <View className={styles.description}>{description}</View>
        </View>
        <View className={styles.author} onClick={handleAuthorClick}>
          <Image src={avatar} className={styles.avatar}></Image>
          <View className={styles['author-name']}>{author}</View>
        </View>
      </View>
      <View className={styles['card-bottom']}>
        <View className={styles['meta-item']}>
          <Text
            className={styles['language-color']}
            style={{ background: languageColor || '#000000' }}
          ></Text>
          {language || 'null'}
        </View>
        <View className={styles['meta-item']}>
          <FontIcon styleProps={{ fontSize: '16px' }} value="star"></FontIcon>
          {stars}
        </View>
        <View className={styles['meta-item']}>
          <FontIcon
            styleProps={{ fontSize: '16px' }}
            value="git-repo-forked"
          ></FontIcon>
          {forks}
        </View>
        <View className={styles['meta-item']}>
          <FontIcon
            styleProps={{ fontSize: '16px', color: 'yellow' }}
            value="star"
          ></FontIcon>
          {currentPeriodStars} this {durationText}
        </View>
      </View>
    </View>
  );
};

const areEqual = ({ repo: prevRepo }: any, { repo }: any) => {
  return prevRepo?.url === repo.url;
};

export default memo(RepoItem, areEqual);
