import Taro, {
  Component,
  Config,
  useState,
  useEffect,
  useReachBottom,
  useRouter,
  useShareAppMessage
} from '@tarojs/taro'
import { View, Image, Block } from '@tarojs/components'

import './index.scss'

import { IUserOrg, getUserOrgs, getUser, IUser } from '@/services/users'

import useRequest from '@/hooks/useRequest'
import UserInfo from '@/components/user-info'
import { follow } from '@/services/user'

const Developer = () => {
  const {
    params: { name }
  } = useRouter()
  const [userInfo, refreshUserInfo] = useRequest<IUser>(name, getUser)
  const [isFollowing, setFollow] = useState<boolean>(false)

  useEffect(() => {
    const title = `Developer`
    Taro.setNavigationBarTitle({ title })
  }, [])

  useEffect(() => {
    follow.is(name).then(isFollowing => {
      setFollow(isFollowing)
    })
  }, [])

  const handleFollowBtnClick = () => {
    if (isFollowing) {
      follow.delete(name).then(isSuccess => {
        if (isSuccess) {
          setFollow(false)
        }
      })
    } else {
      follow.put(name).then(isSuccess => {
        if (isSuccess) {
          setFollow(true)
        }
      })
    }
  }

  useShareAppMessage(res => {
    const title = `[${userInfo!.login}] ${userInfo!.bio}`

    return {
      title,
      path: `/pages/developer/index?name=${name}`
    }
  })

  return (
    <Block>
      <UserInfo
        userInfo={userInfo}
        isCurrent={false}
        isFollowing={isFollowing}
        onFollowClick={handleFollowBtnClick}
      ></UserInfo>
    </Block>
  )
}

export default Developer
