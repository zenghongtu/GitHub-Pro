import Author from '@/components/author';
import Empty from '@/components/empty';
import FabButton from '@/components/fab-button';
import LoadMore from '@/components/load-more';
import Markdown from '@/components/markdown';
import useRequestWIthMore from '@/hooks/useRequestWIthMore';
import {
  getIssueComments,
  getIssueDetail,
  Issue,
  IssueComment,
} from '@/services/issues';
import { CLEAR_ISSUE_INFO } from '@/store/constatnts';
import { View } from '@tarojs/components';
import Taro, { usePullDownRefresh, useRouter } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommentItem from '../comment-item';
import styles from './index.module.scss';

const IssueDetail = () => {
  const {
    params: { full_name, number },
  } = useRouter();

  const issue = useSelector<any, any>((state) => state.issue.info);

  const [issueData, setIssue] = useState(issue);

  const [commentList, hasMore, refresh] = useRequestWIthMore<
    IssueComment | null,
    any
  >({ full_name, number }, getIssueComments);

  const dispatch = useDispatch();

  useEffect(() => {
    const title = full_name;
    Taro.setNavigationBarTitle({ title });
  }, []);

  useEffect(() => {
    return () => {
      dispatch({ type: CLEAR_ISSUE_INFO });
    };
  }, []);

  useEffect(() => {
    if (!issueData) {
      getIssueDetail({ full_name, number }).then((resData) => {
        if (resData) {
          setIssue(resData);
        }
      });
    }
  }, []);

  usePullDownRefresh(() => {
    refresh!();
  });

  const handleFabBtnClick = () => {
    Taro.navigateTo({
      url: `/pages/issues/create-comment/index?full_name=${full_name}&number=${number}`,
    });
  };

  const {
    url,
    repository_url,
    labels_url,
    comments_url,
    events_url,
    html_url,
    id,
    node_id,
    title,
    user,
    labels,
    state,
    locked,
    assignee,
    assignees,
    milestone,
    comments,
    created_at,
    updated_at,
    closed_at,
    author_association,
    body,
    pull_request,
  } = (issueData as Issue) || {};

  const { login, avatar_url, gravatar_id, type, site_admin } = user || {};

  if (!login) {
    return <Empty></Empty>;
  }

  return (
    <View className={styles.wrap}>
      <View className={styles.header}>
        <View className={styles.title}>{title}</View>
        <View className={styles.meta}>
          #{number} {state} {comments} comments
        </View>
      </View>
      <View className={styles.content}>
        <Author url={avatar_url} login={login} created_at={created_at}></Author>
        <View className={styles.body}>
          <Markdown md={body} full_name={full_name}></Markdown>
        </View>
      </View>

      {commentList ? (
        <View className={styles['comment-list']}>
          {commentList.map((item, idx) => {
            return (
              <CommentItem
                key={item!.id}
                comment={item}
                full_name={full_name}
              ></CommentItem>
            );
          })}
        </View>
      ) : (
        <LoadMore hasMore={!!hasMore}></LoadMore>
      )}
      <FabButton icon="add" onClick={handleFabBtnClick}></FabButton>
    </View>
  );
};

export default IssueDetail;
