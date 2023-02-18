import Avatar from '@/components/avatar';
import FontIcon from '@/components/font-icon';
import SkeletonCard from '@/components/skeleton-card';
import {
  useActivityCheckRepoIsStarredByAuthenticatedUser,
  useActivityStarRepoForAuthenticatedUser,
  useActivityUnstarRepoForAuthenticatedUser,
  useReposGet,
} from '@/github/githubComponents';
import { copyText } from '@/utils/common';
import { githubHttpsUrl } from '@/utils/repo';
import { Block, ITouchEvent, Text, View } from '@tarojs/components';
import Taro, { useRouter, useShareAppMessage } from '@tarojs/taro';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AtIcon, AtList } from 'taro-ui';
import Empty from '../../components/empty';
import ListItem from '../../components/list-item';
import { getTimeAgo } from '../../utils/date';
import { bytesToSize } from '../../utils/size';
import { LANGUAGE_COLOR_MAP } from '../my-languages/languages';
import styles from './index.module.scss';
import Readme from './readme';

const Repository = () => {
  let {
    params: { owner, repo, full_name },
  } = useRouter();

  const username = useSelector<any, any>((state) => state.user.username);

  if (!owner && full_name) {
    [owner, repo] = full_name!?.split('/');
  }
  if (!full_name && owner) {
    full_name = `${owner}/${repo}`;
  }

  const pathParams = { owner: owner!, repo: repo! };

  const readmeRef = useRef<{ reload: () => void }>();

  const [isStarred, setIsStarred] = useState(false);

  const { data: repoInfo, isError, isLoading } = useReposGet({ pathParams });

  useActivityCheckRepoIsStarredByAuthenticatedUser(
    {
      pathParams,
    },
    {
      enabled: !!username,
      onSuccess(data) {
        if (!data && data !== null) {
          setIsStarred(true);
        }
      },
    },
  );

  const { mutateAsync: updateStarred } =
    useActivityStarRepoForAuthenticatedUser({});

  const { mutateAsync: updateUnstarred } =
    useActivityUnstarRepoForAuthenticatedUser({});

  useShareAppMessage(() => {
    const title = `[${full_name}] ${repoInfo!.description}`;

    return {
      title,
      path: `/pages/repos/index?full_name=${full_name}`,
    };
  });

  const handleReloadIconClick = () => {
    readmeRef.current?.reload();
  };

  const handleNavTo = (url) => {
    Taro.navigateTo({ url });
  };

  const handleStarIconClick = async (event: ITouchEvent) => {
    event.stopPropagation();
    event.preventDefault();
    let res;
    if (isStarred) {
      res = await updateUnstarred({ pathParams });
    } else {
      res = await updateStarred({ pathParams });
    }

    if (!res && res !== null) {
      setIsStarred(!isStarred);
      Taro.showToast({ title: '操作成功！', icon: 'none' });
    }
  };

  return (
    <SkeletonCard isError={isError} isLoading={isLoading}>
      <View className={styles.wrap}>
        <View className={styles.repo}>
          {repoInfo ? (
            (() => {
              const {
                name,
                // full_name,
                owner: ownerInfo = {},
                description,
                pushed_at,
                size,
                stargazers_count,
                watchers_count,
                language,
                forks_count,
                open_issues_count,
                license,
                subscribers_count,
              } = repoInfo || {};

              const { login, avatar_url } = ownerInfo as any;

              const params = `owner=${login}&repo=${name}`;
              const authorUrl = `/pages/developer/index?name=${login}`;
              const filesUrl = `/pages/repos/files/index?${params}`;
              const activityUrl = `/pages/activity/repo?${params}`;
              const issuesUrl = `/pages/issues/index?${params}`;
              const commitsUrl = `/pages/commits/index?${params}`;
              const contributorsUrl = `/pages/repos/contributors/index?${params}`;
              const watchsUrl = `/pages/repos/watchs/index?${params}`;
              const starsUrl = `/pages/repos/stars/index?${params}`;
              const forksUrl = `/pages/repos/forks/index?${params}`;
              return (
                <Block>
                  <View className={styles.header}>
                    <Avatar
                      className={styles['avatar-img']}
                      username={login}
                      size={45}
                      circle={false}
                      url={`${avatar_url}&s=96`}
                    ></Avatar>
                    <View>
                      <View className={styles['full-name']}>
                        <Text
                          className={styles.login}
                          onClick={handleNavTo.bind(null, authorUrl)}
                        >
                          {login}
                        </Text>
                        /
                        <Text
                          className={styles.name}
                          onClick={() => {
                            const data = `${githubHttpsUrl}/${full_name}`;
                            return copyText(data);
                          }}
                        >
                          {name}
                        </Text>
                      </View>
                      <View className={styles.desc}>{description || ''}</View>
                      {/* <View className={styles.meta}>Created {getTimeAgo(created_at)}</View> */}
                      <View className={styles.meta}>
                        Updated {getTimeAgo(pushed_at)}
                      </View>
                    </View>
                  </View>

                  <View className={styles.divider}></View>
                  <View className={styles['repo-num']}>
                    <View
                      className={styles['num-item']}
                      // onClick={handleNavTo.bind(null, starsUrl)}
                    >
                      <View className={styles.label}>
                        {isStarred ? (
                          <AtIcon
                            size="26"
                            value="star-2"
                            customStyle={{ color: '#007afb' }}
                          ></AtIcon>
                        ) : (
                          <AtIcon size="26" value="star"></AtIcon>
                        )}
                      </View>
                      <View
                        className={styles.num}
                        onClick={handleStarIconClick}
                      >
                        {Number(stargazers_count).toLocaleString()}
                      </View>
                    </View>
                    <View
                      className={styles['num-item']}
                      onClick={handleNavTo.bind(null, watchsUrl)}
                    >
                      <View className={styles.label}>
                        <AtIcon size="26" value="eye"></AtIcon>
                      </View>
                      <View className={styles.num}>
                        {Number(subscribers_count).toLocaleString()}
                      </View>
                    </View>
                    <View
                      className={styles['num-item']}
                      onClick={handleNavTo.bind(null, forksUrl)}
                    >
                      <View className={styles.label}>
                        <FontIcon size="26" value="git-repo-forked"></FontIcon>
                      </View>
                      <View className={styles.num}>
                        {Number(forks_count).toLocaleString()}
                      </View>
                    </View>
                  </View>

                  <View className={styles['repo-info']}>
                    <AtList hasBorder={false}>
                      <ListItem
                        onClick={handleNavTo.bind(null, filesUrl)}
                        title={language! || 'null'}
                        icon="code"
                        color={LANGUAGE_COLOR_MAP[language!] || '#002eb0'}
                        extraText={`${bytesToSize(size!)}`}
                      ></ListItem>
                      <ListItem
                        onClick={handleNavTo.bind(null, activityUrl)}
                        title="Activity"
                        icon="activity"
                        color="#F44337"
                      ></ListItem>
                      <ListItem
                        onClick={handleNavTo.bind(null, issuesUrl)}
                        title="Issues"
                        icon="info"
                        color="#EC407A"
                        extraText={`${open_issues_count}`}
                      ></ListItem>
                      <ListItem
                        hasBorder={false}
                        title="License"
                        arrow={null}
                        icon="book"
                        color="#26ca7e"
                        extraText={(license && license.name) || ''}
                      ></ListItem>
                      {/* <AtListItem
                   hasBorder={true}
                   title="Pull requests"
                   extraText={default_branch}
                 ></AtListItem> */}
                    </AtList>
                  </View>

                  <View className={styles['repo-info']}>
                    <AtList hasBorder={false}>
                      <ListItem
                        onClick={handleNavTo.bind(null, commitsUrl)}
                        title="Commits"
                        icon="git-commit"
                        color="#2AB09D"
                      ></ListItem>
                      <ListItem
                        onClick={handleNavTo.bind(null, contributorsUrl)}
                        icon="people"
                        color="#F99501"
                        title="Contributors"
                      ></ListItem>
                      <ListItem
                        hasBorder={false}
                        title="Readme"
                        arrow={null}
                        icon="book-open"
                        color="#3D76FF"
                        rightIcon={'reload'}
                        onRightClick={handleReloadIconClick}
                      ></ListItem>
                      {/* <ListItem
                   hasBorder={true}
                   title="Branch"
                   extraText={default_branch}
                 ></ListItem> */}
                    </AtList>
                  </View>
                </Block>
              );
            })()
          ) : (
            <Empty></Empty>
          )}
        </View>
        {repoInfo && (
          <View className={styles.readme}>
            {
              <Readme
                ref={readmeRef}
                owner={owner}
                repo={repo}
                full_name={full_name}
              ></Readme>
            }
          </View>
        )}
      </View>
    </SkeletonCard>
  );
};

Repository.config = {
  navigationBarTitleText: 'Repository',
};

export default Repository;
