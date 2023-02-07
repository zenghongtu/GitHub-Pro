import { Component } from 'react';
import './app.scss';

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (this.props as any).children;
  }
}
export default App;
