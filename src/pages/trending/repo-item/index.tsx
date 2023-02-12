import FontIcon from '@/components/font-icon';
import { Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { memo } from 'react';
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
  const handleCardClick = () => {
    const url = `/pages/repos/index?owner=${author}&repo=${name}`;
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
          <View className={styles.nameWrap}>
            <View className={styles.index}> {index + 1}</View>
            <View className={styles.name}>
              {author}/{name}
            </View>
          </View>
          <View className={styles.description}>{description}</View>
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
            styleProps={{ fontSize: '16px', color: '#0062c9' }}
            value="star"
          ></FontIcon>
          {currentPeriodStars} {durationText}
        </View>
      </View>
    </View>
  );
};

const areEqual = ({ repo: prevRepo }: any, { repo }: any) => {
  return prevRepo?.url === repo.url;
};

export default memo(RepoItem, areEqual);
