import { useReposListForks } from '@/github/githubComponents';
import ListRender from '../list-render';

const Forks = () => {
  return (
    <ListRender
      getItems={(data) => (data ? data.map((item) => item.owner) : null)}
      name={'Forks'}
      useRequest={useReposListForks}
    ></ListRender>
  );
};

export default Forks;
