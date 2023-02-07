import { Button } from '@nutui/nutui-react-taro';
import { Component, PropsWithChildren } from 'react';
import './index.scss';

class Index extends Component<PropsWithChildren> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <div className="nutui-react-demo">
        <div className="index">欢迎使用 NutUI React 开发 Taro 多端项目。</div>
        <div className="index">
          <Button type="primary" className="btn">
            NutUI React Button
          </Button>
        </div>
      </div>
    );
  }
}
export default Index;
