import { Button, Text, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { Component } from 'react';

export default class Login extends Component {
  state = {
    context: {},
  };

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  getLogin = () => {
    Taro.cloud
      .callFunction({
        name: 'login',
        data: {},
      })
      .then((res) => {
        this.setState({
          context: res.result,
        });
      });
  };

  render() {
    return (
      <View className="index">
        <Button onClick={this.getLogin}>获取登录云函数</Button>
        <Text>context：{JSON.stringify(this.state.context)}</Text>
      </View>
    );
  }
}
