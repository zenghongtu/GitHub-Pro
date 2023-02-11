import SkeletonCard from '@/components/skeleton-card';
import useTrending from '@/hooks/useTrending';
import { Block, View } from '@tarojs/components';
import Taro, { usePullDownRefresh, useShareAppMessage } from '@tarojs/taro';
import { useState } from 'react';
import { AtDrawer, AtTabs, AtTabsPane } from 'taro-ui';
import { TrendingRequestParams } from 'types/trending';
import FabButton from '../../components/fab-button';
import { TrendingRepo } from '../../services/trending';
import './index.scss';
import MyLanguage, { defaultLang } from './language';
import RepoItem from './repo-item';

export interface LanguageParams {
  language: string;
  title: string;
}

interface TrendingRepoState {
  [id: number]: TrendingRepo[] | null;
}

const tabList = [
  { title: '今日', value: 'daily' },
  { title: '本周', value: 'weekly' },
  { title: '本月', value: 'monthly' },
];

const durationTextList = ['today', 'week', 'month'];

const currLang = Taro.getStorageSync('current') || defaultLang;

const defaultTrendingParams = {
  since: 'daily',
  language: currLang,
};

const Trending = () => {
  // const [curLang, setLang] = useState<string>(currLang);
  const [currTab, setCurrTab] = useState<number>(0);

  const [params, setParams] = useState<TrendingRequestParams>(
    defaultTrendingParams,
  );

  const [showLangDrawer, setShowLangDrawer] = useState<boolean>(false);

  const { data, isLoading, isError, refetch } = useTrending(params);
  console.log('data: ', data);

  // useEffect(() => {
  //   const title = LANGUAGE_LIST.find((item) => item.value === curLang)!.label;
  //   Taro.setNavigationBarTitle({ title });
  // }, [curLang]);

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

  const handleChangeParams = ({ language, title }: LanguageParams) => {
    setParams({ ...params, language });
    Taro.setStorageSync('current', language);
    // setTitle(title)
    // setLang(language);
    setShowLangDrawer(false);
  };

  return (
    <Block>
      <View className="trending-page">
        <View>
          <AtTabs current={currTab} tabList={tabList} onClick={handleClickTab}>
            {tabList.map((tab, idx) => {
              const duractionText = durationTextList[currTab];

              return (
                <AtTabsPane key={tab.title} current={currTab} index={idx}>
                  <View>
                    <SkeletonCard isLoading={isLoading} isError={isError}>
                      {data &&
                        data.map((repo, index) => {
                          return (
                            <Block key={repo.url}>
                              <RepoItem
                                repo={repo}
                                index={index}
                                duractionText={duractionText}
                              ></RepoItem>
                            </Block>
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
              onChangeLang={handleChangeParams}
            ></MyLanguage>
          </View>
        </AtDrawer>
      </View>
    </Block>
  );
};

export default Trending;
