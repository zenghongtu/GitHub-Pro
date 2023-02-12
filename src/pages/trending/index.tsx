import SkeletonCard from '@/components/skeleton-card';
import useTrending from '@/hooks/useTrending';
import { Block, View } from '@tarojs/components';
import Taro, { usePullDownRefresh, useShareAppMessage } from '@tarojs/taro';
import { useState } from 'react';
import { AtDrawer, AtTabs, AtTabsPane } from 'taro-ui';
import { TrendingRequestParams } from 'types/trending';
import FabButton from '../../components/fab-button';
import styles from './index.module.scss';
import MyLanguage, { defaultLang } from './language';
import RepoItem from './repo-item';

export interface LanguageParams {
  language: string;
  title: string;
}

const tabList = [
  { title: '今日', value: 'daily' },
  { title: '本周', value: 'weekly' },
  { title: '本月', value: 'monthly' },
];

const tabs = [];

const currLang = Taro.getStorageSync('current') || defaultLang;

const defaultTrendingParams = {
  since: 'daily',
  language: currLang,
};

const Trending = () => {
  const [currTab, setCurrTab] = useState<number>(0);

  const [params, setParams] = useState<TrendingRequestParams>(
    defaultTrendingParams,
  );

  const [showLangDrawer, setShowLangDrawer] = useState<boolean>(false);

  const { data, isLoading, isError, refetch } = useTrending(params);

  usePullDownRefresh(() => {
    refetch();
  });

  useShareAppMessage((res) => {
    return {
      title: `GitHub Trending`,
      path: `/pages/trending/index`,
    };
  });

  const handleClickTab = (val) => {
    setCurrTab(val);

    setParams({ ...params, since: tabList[val].value });
    Taro.pageScrollTo({ scrollTop: 0 });
  };

  const handleToggleLangDrawer = (isShow) => () => {
    setShowLangDrawer(isShow);
  };

  const handleChangeLang = ({ language, title }: LanguageParams) => {
    Taro.setStorageSync('current', language);
    Taro.setNavigationBarTitle({ title });
    setParams({ ...params, language });
    setShowLangDrawer(false);
  };

  return (
    <Block>
      <View className={styles.wrap}>
        <View className={styles.header}>
          <AtTabs current={currTab} tabList={tabList} onClick={handleClickTab}>
            {tabList.map((tab, idx) => {
              const durationText = tabList[idx].value;

              return (
                <AtTabsPane key={tab.title} current={currTab} index={idx}>
                  <View>
                    <SkeletonCard
                      key={Object.values(params).join('-')}
                      isLoading={isLoading}
                      isError={isError}
                    >
                      {data?.map((repo, index) => {
                        return (
                          <RepoItem
                            key={repo.url}
                            repo={repo}
                            index={index}
                            durationText={durationText}
                          ></RepoItem>
                        );
                      })}
                    </SkeletonCard>
                  </View>
                </AtTabsPane>
              );
            })}
          </AtTabs>
        </View>

        <FabButton onClick={handleToggleLangDrawer(true)}></FabButton>
        <AtDrawer
          show={showLangDrawer}
          right
          mask
          onClose={handleToggleLangDrawer(false)}
        >
          <View>
            <MyLanguage
              curLang={params.language!}
              onChangeLang={handleChangeLang}
            ></MyLanguage>
          </View>
        </AtDrawer>
      </View>
    </Block>
  );
};

export default Trending;
