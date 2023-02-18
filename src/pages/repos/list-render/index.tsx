import SkeletonCard from '@/components/skeleton-card';
import UserItem from '@/components/user-item';
import useInfiniteGithubRequest from '@/hooks/useInfiniteGithubRequest';
import Taro, { useRouter } from '@tarojs/taro';
import { useEffect } from 'react';

const ListRender = ({
  name,
  useRequest,
  getItems,
}: {
  name: string;
  useRequest: Function;
  getItems?: (data) => any;
}) => {
  const {
    params: { owner, repo },
  } = useRouter();
  const full_name = `${owner}/${repo}`;

  const { data, hasMore, isLoading, isError } = useInfiniteGithubRequest(
    useRequest,
    {
      pathParams: { repo, owner },
      getItems,
    },
  );

  useEffect(() => {
    const title = `${full_name} - ${name}`;
    Taro.setNavigationBarTitle({ title });
  }, []);

  return (
    <SkeletonCard isLoading={isLoading} isError={isError}>
      <UserItem data={data} hasMore={hasMore}></UserItem>
    </SkeletonCard>
  );
};

export default ListRender;
