import Empty from '@/components/empty';
import { Block, View } from '@tarojs/components';
import Taro, { usePullDownRefresh, useShareAppMessage } from '@tarojs/taro';
import { useEffect, useRef, useState } from 'react';
import { AtDrawer, AtTabs, AtTabsPane } from 'taro-ui';
import FabButton from '../../components/fab-button';
import {
  getTrendingRepos,
  TrendingRepo,
  TrendingRequestParams,
} from '../../services/trending';
import LANGUAGE_LIST from '../my-languages/languages';
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
  { title: 'daily', value: 'daily' },
  { title: 'weekly', value: 'weekly' },
  { title: 'monthly', value: 'monthly' },
];

const defaultTrendingPramas = {
  since: 'daily',
};

const duractionTextList = ['today', 'week', 'month'];

const currLang = Taro.getStorageSync('current') || defaultLang;

const Trending = () => {
  const [repos, setRepos] = useState<TrendingRepoState>({});
  // const [users, setUsers] = useState<TrendingUser[] | null>(null)
  // const [title, setTitle] = useState<string>(currLang)
  const [curLang, setLang] = useState<string>(currLang);
  const [currTab, setCurrTab] = useState<number>(0);
  const initTrendingPramas = {
    ...defaultTrendingPramas,
    language: curLang,
  };
  const [params, setParams] =
    useState<TrendingRequestParams>(initTrendingPramas);
  const [showLangDrawer, setShowLangDrawer] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<number>(0);
  const countRef = useRef(0);

  useEffect(() => {
    const title = LANGUAGE_LIST.find((item) => item.value === curLang)!.label;
    Taro.setNavigationBarTitle({ title });
  }, [curLang]);

  usePullDownRefresh(() => {
    setRepos({ [currTab]: null });
    setRefresh(++countRef.current);
  });

  useShareAppMessage((res) => {
    return {
      title: `GitHub Trending`,
      path: `/pages/trending/index`,
    };
  });

  const getRepos = (params: TrendingRequestParams) => {
    Taro.showLoading({ title: 'loading..' });
    getTrendingRepos(params)
      .then((data) => {
        if (data) {
          if (repos[currTab]) {
            setRepos({ [currTab]: data });
          } else {
            setRepos({ ...repos, [currTab]: data });
          }
        } else {
          throw new Error(data || '');
        }
      })
      .catch((err) => {
        Taro.showToast({
          title: `${err.message || 'Network Error!'} Try pull-down refresh.`,
          icon: 'none',
          mask: true,
        });
      })
      .finally(() => {
        Taro.hideLoading();
      });
  };

  useEffect(() => {
    getRepos(params);

    // getTrendingUsers(params).then(data => {
    //   if (!data) {
    //     // TODO handle error
    //     return
    //   }
    //   setRepos(data)
    // })
  }, [params, refresh]);

  const handleClickTab = (val) => {
    setCurrTab(val);

    if (!repos[val]) {
      setParams({ ...params, since: tabList[val].value });
    }
    Taro.pageScrollTo({ scrollTop: 0 });
  };

  const handleToggleLangDrawer = (isShow) => () => {
    setShowLangDrawer(isShow);
  };

  const handleChangeParams = ({ language, title }: LanguageParams) => {
    setParams({ ...params, language });
    Taro.setStorageSync('current', language);
    // setTitle(title)
    setLang(language);
    setShowLangDrawer(false);
  };

  return (
    <Block>
      <View>
        <View>
          <AtTabs current={currTab} tabList={tabList} onClick={handleClickTab}>
            {tabList.map((tab, idx) => {
              const _repos = repos[idx];
              const data = _repos && _repos!.length > 0 ? _repos : null;
              const duractionText = duractionTextList[currTab];

              return (
                <AtTabsPane key={tab.title} current={currTab} index={idx}>
                  <View>
                    {data ? (
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
                      })
                    ) : (
                      <Empty></Empty>
                    )}
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
              curLang={curLang}
              onChangeLang={handleChangeParams}
            ></MyLanguage>
          </View>
        </AtDrawer>
      </View>
    </Block>
  );
};

export default Trending;
