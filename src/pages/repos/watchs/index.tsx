import { useActivityListWatchersForRepo } from '@/github/githubComponents';
import ListRender from '../list-render';

const Forks = () => {
  return (
    <ListRender
      name={'Forks'}
      useRequest={useActivityListWatchersForRepo}
    ></ListRender>
  );
};

export default Forks;
