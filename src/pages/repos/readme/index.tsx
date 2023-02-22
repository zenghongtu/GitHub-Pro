import Markdown from '@/components/markdown';
import SkeletonCard from '@/components/skeleton-card';
import { useReposGetReadme } from '@/github/githubComponents';
import { Block, View } from '@tarojs/components';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { AtButton, AtIcon } from 'taro-ui';
import styles from './index.module.scss';

const Readme = ({ owner, repo, full_name }, ref) => {
  const { data, isError, isLoading, isFetching, refetch } = useReposGetReadme({
    pathParams: { owner, repo },
    headers: { Accept: 'application/vnd.github.v3.raw' },
  });

  const [showAll, setShowAll] = useState(false);

  useImperativeHandle(ref, () => ({
    reload: () => {
      refetch();
    },
  }));

  return (
    <SkeletonCard isError={isError} isLoading={isFetching}>
      {data && (
        <View
          className={styles.wrap}
          style={showAll ? { maxHeight: 'fit-content' } : {}}
        >
          <Markdown md={data as any as string} full_name={full_name}></Markdown>
          <AtButton
            onClick={() => {
              setShowAll(!showAll);
            }}
            className={styles.btn}
            type="secondary"
            size="small"
            circle
          >
            {showAll ? (
              <Block>
                收起更多 <AtIcon value="chevron-up"></AtIcon>
              </Block>
            ) : (
              <Block>
                查看更多 <AtIcon value="chevron-down"></AtIcon>
              </Block>
            )}
          </AtButton>
        </View>
      )}
    </SkeletonCard>
  );
};

export default forwardRef(Readme);
