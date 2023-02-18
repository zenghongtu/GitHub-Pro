import { useActivityListStargazersForRepo } from '@/github/githubComponents';
import ListRender from '../list-render';

const Stars = () => {
  return (
    <ListRender
      name={'Stars'}
      useRequest={useActivityListStargazersForRepo}
    ></ListRender>
  );
};

export default Stars;
