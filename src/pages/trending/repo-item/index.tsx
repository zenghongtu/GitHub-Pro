import FontIcon from '@/components/font-icon';
import { TrendingRepo } from '@/services/trending';
import { Image, Text, View } from '@tarojs/components';
import { ITouchEvent } from '@tarojs/components/types/common';
import Taro from '@tarojs/taro';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import './index.scss';

const RepoItem = ({
  repo,
  index,
  duractionText,
}: {
  repo: TrendingRepo;
  index: number;
  duractionText: string;
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
    <View className="card-wrap" onClick={handleCardClick}>
      <View className="card-top">
        <View className="info">
          <View className="name">
            <View className="index"> {index + 1}</View>
            {name}
          </View>
          <View className="description">{description}</View>
        </View>
        <View className="author" onClick={handleAuthorClick}>
          <Image src={avatar} className="avatar"></Image>
          <View className="author-name">{author}</View>
        </View>
      </View>
      <View className="card-bottom">
        <View className="meta-item">
          <Text
            className="language-color"
            style={{ background: languageColor || '#000000' }}
          ></Text>
          {language || 'null'}
        </View>
        <View className="meta-item">
          <FontIcon styleProps={{ fontSize: '16px' }} value="star"></FontIcon>
          {stars}
        </View>
        <View className="meta-item">
          <FontIcon
            styleProps={{ fontSize: '16px' }}
            value="git-repo-forked"
          ></FontIcon>
          {forks}
        </View>
        <View className="meta-item">
          {currentPeriodStars} stars {duractionText}
        </View>
      </View>
    </View>
  );
};

const areEqual = ({ repo: prevRepo }: any, { repo }: any) => {
  return (
    prevRepo && prevRepo.name === repo.name && prevRepo.author === repo.author
  );
};

export default memo(RepoItem, areEqual);
