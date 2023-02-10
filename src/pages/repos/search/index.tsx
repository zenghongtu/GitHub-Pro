import Author from '@/components/author';
import Empty from '@/components/empty';
import LoadMore from '@/components/load-more';
import RepoItem from '@/components/repo-item';
import {
  IRepoItem,
  ISearchPrams,
  ISearchUserItem,
  searchRepos,
} from '@/services/search';
import { IStarred } from '@/services/user';
import { Block, View } from '@tarojs/components';
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { AtSearchBar, AtSegmentedControl, AtTag } from 'taro-ui';
import { searchUsers } from '../../../services/search';
import styles from './index.module.scss';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [value, setValue] = useState('');
  const [searchReposParams, setSearchReposParams] = useState<ISearchPrams>({
    q: '',
    sort: '',
    order: '',
    per_page: 30,
    page: 1,
  });
  const [searchUsersParams, setSearchUsersParams] = useState<ISearchPrams>({
    q: '',
    sort: '',
    order: '',
    per_page: 30,
    page: 1,
  });

  const [repoList, setRepoList] = useState<IRepoItem[] | null>(null);
  const [userList, setUserList] = useState<ISearchUserItem[] | null>(null);
  const [current, setCurrent] = useState(0);
  const [hasMoreRepos, setHasMoreRepos] = useState(true);
  const [hasMoreUsers, setHasMoreUsers] = useState(true);
  const [searchHisotry, setSearchHistory] = useState<string[]>([]);

  const isRepo = () => {
    return current === 0;
  };

  useEffect(() => {
    const history = Taro.getStorageSync('search_history') || [];
    setSearchHistory(history);
  }, []);

  const getRepos = (searchReposParams) => {
    searchRepos({ ...searchReposParams, q: searchValue }).then((data) => {
      if (data) {
        if (searchReposParams.page === 1 || !repoList) {
          setRepoList(data);
        } else {
          setRepoList([...repoList, ...data]);
        }
        if (data.length < searchReposParams.per_page!) {
          setHasMoreRepos(false);
        }
      }
    });
  };

  const getUsers = (searchUsersParams) => {
    searchUsers({ ...searchUsersParams, q: searchValue }).then((data) => {
      if (data) {
        if (searchUsersParams.page === 1 || !userList) {
          setUserList(data);
        } else {
          setUserList([...userList, ...data]);
        }
        if (data.length < searchUsersParams.per_page!) {
          setHasMoreUsers(false);
        }
      }
    });
  };

  useEffect(() => {
    if (searchValue) {
      getRepos(searchReposParams);
    }
  }, [searchReposParams]);

  useEffect(() => {
    if (searchValue) {
      getUsers(searchUsersParams);
    }
  }, [searchUsersParams]);

  useEffect(() => {
    if (searchValue) {
      if (isRepo() && (!repoList || searchReposParams.q !== searchValue)) {
        setSearchReposParams({ ...searchReposParams, q: searchValue });
      } else if (!userList || searchUsersParams.q !== searchValue) {
        setSearchUsersParams({ ...searchUsersParams, q: searchValue });
      }
    }
  }, [current]);

  usePullDownRefresh(() => {
    if (isRepo()) {
      setHasMoreRepos(true);
      setSearchReposParams({ ...searchReposParams, page: 1 });
    } else {
      setHasMoreUsers(true);
      setSearchUsersParams({ ...searchUsersParams, page: 1 });
    }
  });

  useReachBottom(() => {
    getMoreData();
  });

  const getMoreData = () => {
    if (isRepo()) {
      setSearchReposParams((searchReposParams) => {
        return {
          ...searchReposParams,
          page: searchReposParams.page! + 1,
        };
      });
    } else {
      setSearchUsersParams((searchUsersParams) => {
        return {
          ...searchUsersParams,
          page: searchUsersParams.page! + 1,
        };
      });
    }
  };

  const onChange = (val: string) => {
    if (!val) {
      onClear();
      return;
    }
    setValue(val);
  };

  const onClear = () => {
    setValue('');
    setSearchValue('');
    setRepoList(null);
    setUserList(null);
  };

  const updateParams = (params) => {
    setSearchValue(params.q);
    // TODO pref
    if (isRepo()) {
      setSearchReposParams({ ...searchReposParams, ...params });
    } else {
      setSearchUsersParams({ ...searchUsersParams, ...params });
    }
  };
  const handleConfirm = () => {
    if (!value) {
      return;
    }
    const newHistory = [...new Set([value, ...searchHisotry])];

    setSearchHistory(newHistory);
    Taro.setStorageSync('search_history', newHistory);
    updateParams({ q: value, page: 1 });
  };

  const handleSegmentedControlClick = (index: number) => {
    setCurrent(index);
  };

  const handleTagClick = ({ name }) => {
    setValue(name);
    updateParams({ q: name });
  };

  return (
    <View className={styles.wrap}>
      <View className={styles['search-wrap']}>
        <AtSearchBar
          onConfirm={handleConfirm}
          placeholder="search"
          actionName="GO"
          value={value}
          onClear={onClear}
          onChange={onChange}
          onActionClick={handleConfirm}
        />
      </View>
      <View className={styles.sc}>
        <AtSegmentedControl
          values={['Repositories', 'Users']}
          onClick={handleSegmentedControlClick}
          current={current}
        />
      </View>
      <View>
        {searchValue ? (
          isRepo() ? (
            <View>
              {repoList ? (
                <Block>
                  <View>
                    {repoList ? (
                      repoList.map((item, idx) => {
                        return (
                          <RepoItem
                            key={item.id}
                            repo={item as IStarred}
                          ></RepoItem>
                        );
                      })
                    ) : (
                      <Empty></Empty>
                    )}
                  </View>
                  {repoList && <LoadMore hasMore={hasMoreRepos!}></LoadMore>}
                </Block>
              ) : (
                <Empty></Empty>
              )}
            </View>
          ) : (
            <View>
              {userList ? (
                <Block>
                  {userList.map((item) => {
                    const login = item.login;
                    const avatar_url = item.avatar_url;
                    return (
                      <View key={login} className={styles['user-item']}>
                        <Author login={login} url={avatar_url}></Author>
                      </View>
                    );
                  })}
                  {userList && <LoadMore hasMore={hasMoreUsers!}></LoadMore>}
                </Block>
              ) : (
                <Empty></Empty>
              )}
            </View>
          )
        ) : (
          <View className={styles['history-tags']}>
            {searchHisotry &&
              searchHisotry.map((item) => {
                return (
                  <View key={item} className={styles.tag}>
                    <AtTag
                      name={item}
                      type="primary"
                      customStyle={{ background: '#fff' }}
                      circle
                      onClick={handleTagClick}
                    >
                      {item}
                    </AtTag>
                  </View>
                );
              })}
          </View>
        )}
      </View>
    </View>
  );
};

export default Search;
