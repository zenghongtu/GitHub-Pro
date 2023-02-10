import Empty from '@/components/empty';
import { getUserIssues } from '@/services/user';
import { Block, View } from '@tarojs/components';
import { usePullDownRefresh, useReachBottom, useRouter } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { AtTabs, AtTabsPane } from 'taro-ui';
import LoadMore from '../../components/load-more/index';
import { issueDefaultParams } from '../../constants';
import { Issue } from '../../services/issues';
import IssueItem from '../issues/issue-item';

const UserIssues = () => {
  const {
    params: { owner },
  } = useRouter();

  const [count, setCount] = useState(0);
  const [curTab, setTab] = useState(0);
  const [openHasMore, setOpenHasMore] = useState(true);
  const [closedHasMore, setClosedHasMore] = useState(true);
  const [openList, setOpenList] = useState<Issue[] | null>(null);
  const [closedList, setClosedtList] = useState<Issue[] | null>(null);

  const [openParams, setOpenParams] = useState({
    ...issueDefaultParams,
    filter: 'all',
    state: 'open',
  });
  const [closedParams, setClosedParams] = useState({
    ...issueDefaultParams,
    filter: 'all',
    state: 'closed',
  });

  usePullDownRefresh(() => {
    setOpenParams({ ...openParams, page: 1 });
    setClosedParams({ ...closedParams, page: 1 });
    setClosedHasMore(true);
    setOpenHasMore(true);
    setCount(count + 1);
  });

  useReachBottom(() => {
    if (curTab === 0) {
      setOpenParams({ ...openParams, page: openParams.page! + 1 });
    } else {
      setClosedParams({ ...closedParams, page: closedParams.page! + 1 });
    }
  });

  // TODO fix request more
  const getClosedIssues = (params) => {
    getUserIssues(params).then((data) => {
      if (data) {
        if (closedList) {
          setClosedtList([...closedList, ...data]);
        } else {
          setClosedtList(data);
        }
        setClosedtList(data);
        if (data.length < params.per_page) {
          setClosedHasMore(false);
        }
      }
    });
  };

  useEffect(() => {
    if (openHasMore) {
      getUserIssues(openParams).then((data) => {
        if (data) {
          if (openList) {
            setOpenList([...openList, ...data]);
          } else {
            setOpenList(data);
          }
          if (data.length < openParams.per_page!) {
            setOpenHasMore(false);
          }
        }
      });
    }
  }, [openParams, count]);

  useEffect(() => {
    if (openList && closedHasMore) {
      getClosedIssues(closedParams);
    }
  }, [closedParams, count]);

  useEffect(() => {
    if (!closedList && curTab === 1) {
      getClosedIssues(closedParams);
    }
  }, [curTab]);

  const tabList = [
    { title: 'open', data: openList, hasMore: openHasMore },
    { title: 'closed', data: closedList, hasMore: closedHasMore },
  ];

  const handleTabClick = (val) => {
    setTab(val);
  };

  return (
    <View>
      <AtTabs current={curTab} tabList={tabList} onClick={handleTabClick}>
        {tabList.map((tab, idx) => {
          const data = tab.data;
          return (
            <AtTabsPane key={tab.title} current={curTab} index={idx}>
              <View>
                {data ? (
                  <Block>
                    {data.map((item) => {
                      return <IssueItem key={item.id} issue={item}></IssueItem>;
                    })}
                    <LoadMore hasMore={tab.hasMore}></LoadMore>
                  </Block>
                ) : (
                  <Empty></Empty>
                )}
              </View>
            </AtTabsPane>
          );
        })}
      </AtTabs>
    </View>
  );
};

UserIssues.config = {
  navigationBarTitleText: 'Issues',
};

export default UserIssues;
