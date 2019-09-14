import Taro, {
  Component,
  Config,
  useState,
  useEffect,
  useReachBottom,
  useRouter
} from '@tarojs/taro'
import { View, Image, Block } from '@tarojs/components'

import './index.scss'

import { IUserOrg, getUserOrgs, getUser, IUser } from '@/services/users'

import useRequest from '@/hooks/useRequest'
import UserInfo from '@/components/user-info'

const Developer = () => {
  const {
    params: { name = 'zenghongtu' }
  } = useRouter()
  const [userInfo, refreshUserInfo] = useRequest<IUser>(name, getUser)

  useEffect(() => {
    const title = `Developer`
    Taro.setNavigationBarTitle({ title })
  }, [])

  return (
    <Block>
      <UserInfo userInfo={userInfo} isCurrent={false}></UserInfo>
    </Block>
  )
}

export default Developer
