import { useReposListContributors } from '@/github/githubComponents';
import ListRender from '../list-render';

const Contributors = () => {
  return (
    <ListRender
      name={'Contributors'}
      useRequest={useReposListContributors}
    ></ListRender>
  );
};

export default Contributors;
