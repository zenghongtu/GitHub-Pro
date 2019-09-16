import Taro, { Component, useState, useEffect, useDidShow } from '@tarojs/taro'
import { View, Text, Input, Button, Image } from '@tarojs/components'
import { AtTabs, AtTabsPane, AtInput, AtButton } from 'taro-ui'

import logo from '../../assets/logo.png'
import './index.scss'
import Base64 from '../../utils/base64'
import { getCurrentUser } from '../../services/user'
import { setGlobalData, getGlobalData } from '../../utils/global_data'
import { useDispatch } from '@tarojs/redux'
import { LOGIN } from '../../store/constatnts'

const ACCOUNT_INDEX = 0
const TOKEN_INDEX = 1

const tabList = [{ title: 'Account' }, { title: 'Token' }]

interface AuthInfoState {
  username?: string
  password?: string
  token?: string
}

const Login = () => {
  const [currTab, setCurrTab] = useState<number>(0)
  const [authInfo, setAuthInfo] = useState<AuthInfoState>({})
  const handleChangeTab = val => {
    setCurrTab(val)
  }

  const dispatch = useDispatch()

  useDidShow(() => {
    if (getGlobalData('userInfo')) {
      Taro.navigateBack()
    }
  })

  const handleInputChange = (val, e) => {
    const key = e.target.id
    setAuthInfo({ ...authInfo, [key]: val })
  }

  const handleLoginBtnClick = () => {
    const { username, password, token } = authInfo

    let authorization: string
    if (currTab === ACCOUNT_INDEX) {
      if (!username || !password) {
        Taro.showToast({
          title: 'Username or Password is empty',
          icon: 'none'
        })
        return
      }
      authorization = 'Basic ' + Base64.encode(`${username}:${password}`)
    } else {
      if (!token) {
        Taro.showToast({ title: 'Token is empty', icon: 'none' })
        return
      }
      authorization = 'token ' + token
    }

    getCurrentUser(authorization).then(data => {
      Taro.setStorageSync('authorization', authorization)
      if (data) {
        dispatch({ type: LOGIN, payload: data.login })
        Taro.showToast({
          title: 'login success!',
          icon: 'success',
          duration: 1500
        })

        setTimeout(() => {
          Taro.navigateBack()
        }, 1500)
      }
    })
  }

  return (
    <View className="layout-container">
      <View className="login-container">
        <View className="login-header">
          <Image className="logo-img" mode="widthFix" src={logo}></Image>
          <View>Welcome to GitHub Pro.</View>
        </View>
        <View className="login-body">
          <AtTabs current={currTab} tabList={tabList} onClick={handleChangeTab}>
            <View className="tabs-body">
              <AtTabsPane current={currTab} index={ACCOUNT_INDEX}>
                <View>
                  <AtInput
                    autoFocus
                    name="username"
                    // title="Username"
                    type="text"
                    placeholder="Username"
                    value={authInfo['username']}
                    onChange={handleInputChange}
                  />
                  <AtInput
                    name="password"
                    // title="Password"
                    type="password"
                    placeholder="Password"
                    value={authInfo['password']}
                    onChange={handleInputChange}
                  />
                </View>
              </AtTabsPane>
              <AtTabsPane current={currTab} index={TOKEN_INDEX}>
                <View>
                  <AtInput
                    name="token"
                    // title="Token"
                    type="text"
                    placeholder="Token"
                    value={authInfo['token']}
                    onChange={handleInputChange}
                  />
                </View>
              </AtTabsPane>
            </View>
          </AtTabs>

          <View className="login-btn-container">
            <AtButton
              className="login-btn"
              size="small"
              type="primary"
              // circle
              onClick={handleLoginBtnClick}
            >
              Login
            </AtButton>
          </View>
          <View>{/* TODO  */}</View>
        </View>
      </View>
    </View>
  )
}

export default Login
