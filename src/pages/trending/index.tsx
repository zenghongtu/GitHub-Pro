import Empty from '@/components/empty';
import SkeletonCard from '@/components/skeleton-card';
import { CURRENT_LANGUAGE_STORAGE_KEY } from '@/constants';
import useTrending from '@/hooks/useTrending';
import { Block, View } from '@tarojs/components';
import Taro, { usePullDownRefresh, useShareAppMessage } from '@tarojs/taro';
import { useState } from 'react';
import {
  AtActionSheet,
  AtActionSheetItem,
  AtDrawer,
  AtIcon,
  AtTabs,
} from 'taro-ui';
import {
  TrendingDeveloperData,
  TrendingRepoData,
  TrendingRequestParams,
} from 'types/trending';
import FabButton from '../../components/fab-button';
import styles from './index.module.scss';
import MyLanguage, { defaultLang } from './language';
import RepoItem from './repo-item';
import UserItem from './user-item';

export interface LanguageParams {
  language: string;
  title: string;
}

const tabList: { title: string; value: TrendingRequestParams['type'] }[] = [
  { title: 'Repo', value: 'repositories' },
  { title: 'User', value: 'developers' },
];

const dateRangeList = [
  { title: 'Today', value: 'daily', name: 'Today', desc: 'today' },
  { title: 'This Week', value: 'weekly', name: 'Week', desc: 'this week' },
  { title: 'This Month', value: 'monthly', name: 'Month', desc: 'this month' },
];

const currLang = defaultLang;
// Taro.getStorageSync(CURRENT_LANGUAGE_STORAGE_KEY) || defaultLang;

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
  const [showDataRangeSheet, setShowDataRangeSheet] = useState<boolean>(false);

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

  const handleClickTab = (idx) => {
    setCurrTab(idx);

    setParams({ ...params, type: tabList[idx].value });
    Taro.pageScrollTo({ scrollTop: 0 });
  };

  const handleToggleLangDrawer = (isShow) => {
    setShowLangDrawer(isShow);
  };

  const handleToggleDataRangeSheet = (isShow) => {
    setShowDataRangeSheet(isShow);
  };

  const handleChangeLang = ({ language, title }: LanguageParams) => {
    Taro.setStorageSync(CURRENT_LANGUAGE_STORAGE_KEY, language);
    Taro.setNavigationBarTitle({ title: `${title}` });
    setParams({ ...params, language });
    setShowLangDrawer(false);
  };

  const currentDataRange = dateRangeList.find(
    (item) => item.value === params.since,
  );
  return (
    <Block>
      <View className={styles.wrap}>
        <View className={styles.header}>
          <View
            className={styles.filterIcon}
            onClick={handleToggleLangDrawer.bind(null, true)}
          >
            <AtIcon value="filter" size="20"></AtIcon>
          </View>
          <AtTabs
            animated={false}
            current={currTab}
            onClick={handleClickTab}
            tabList={tabList}
          ></AtTabs>
        </View>
        <View className={styles.main}>
          <View>
            <SkeletonCard
              key={Object.values(params).join('-')}
              isLoading={isLoading}
              isError={isError}
            >
              {(data?.length || 0) > 0 ? (
                data!.map((data, index) => {
                  if (currTab === 0) {
                    data = data as TrendingRepoData;
                    return (
                      <RepoItem
                        key={data.url}
                        repo={data}
                        index={index}
                        durationText={currentDataRange?.desc || 'today'}
                      ></RepoItem>
                    );
                  }
                  if (currTab === 1) {
                    data = data as TrendingDeveloperData;
                    return (
                      <UserItem
                        key={data.url}
                        data={data}
                        index={index}
                      ></UserItem>
                    );
                  }
                })
              ) : (
                <Empty></Empty>
              )}
            </SkeletonCard>
          </View>
        </View>

        <FabButton onClick={handleToggleDataRangeSheet.bind(null, true)}>
          {currentDataRange?.name}
        </FabButton>

        <AtActionSheet
          isOpened={showDataRangeSheet}
          onClose={handleToggleDataRangeSheet.bind(null, false)}
        >
          {dateRangeList.map((item) => {
            return (
              <AtActionSheetItem
                key={item.value}
                onClick={() => {
                  setShowDataRangeSheet(false);
                  setParams({ ...params, since: item.value });
                }}
              >
                {item.title}
              </AtActionSheetItem>
            );
          })}
        </AtActionSheet>

        <AtDrawer
          show={showLangDrawer}
          right={false}
          mask
          onClose={handleToggleLangDrawer.bind(null, false)}
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
