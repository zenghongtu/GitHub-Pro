import usePageScrollBackToTop from '@/hooks/usePageScrollBackToTop';
import { Block, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { AtSearchBar, AtTabs, AtTag } from 'taro-ui';
import styles from './index.module.scss';
import Issues from './issues';
import Repos from './repos';
import Users from './users';

const tabList = [
  { title: 'Repositories' },
  { title: 'Users' },
  { title: 'Issues' },
];

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [value, setValue] = useState('');
  const [current, setCurrent] = useState(0);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  useEffect(() => {
    const history = Taro.getStorageSync('search_history') || [];
    setSearchHistory(history);
  }, []);

  const BackToTop = usePageScrollBackToTop();

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
  };

  const handleConfirm = () => {
    if (!value) {
      return;
    }
    const newHistory = [...new Set([value, ...searchHistory])];

    setSearchHistory(newHistory);
    Taro.setStorageSync('search_history', newHistory);
    setSearchValue(value);
  };

  const handleSegmentedControlClick = (index: number) => {
    setCurrent(index);
    Taro.pageScrollTo({ scrollTop: 0 });
  };

  const handleTagClick = ({ name }) => {
    setValue(name);
    setSearchValue(name);
  };

  return (
    <View className={styles.wrap}>
      <View className={styles['search-wrap']}>
        <AtSearchBar
          onConfirm={handleConfirm}
          placeholder="search"
          actionName="Search"
          value={value}
          onClear={onClear}
          onChange={onChange}
          onActionClick={handleConfirm}
        />
      </View>
      <View className={styles.sc}>
        <AtTabs
          current={current}
          onClick={handleSegmentedControlClick}
          tabList={tabList}
        ></AtTabs>
      </View>
      <View>
        {searchValue ? (
          <Block>
            {current === 0 && <Repos keyword={searchValue}></Repos>}
            {current === 1 && <Users keyword={searchValue}></Users>}
            {current === 2 && <Issues keyword={searchValue}></Issues>}
          </Block>
        ) : (
          <View className={styles['history-tags']}>
            {searchHistory &&
              searchHistory.map((item) => {
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
      {BackToTop}
    </View>
  );
};

export default Search;
