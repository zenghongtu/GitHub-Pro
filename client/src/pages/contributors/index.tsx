import Taro, { Component, Config, useRouter, useEffect } from '@tarojs/taro'
import { View, Text, Block } from '@tarojs/components'
import './index.scss'
import useRequestWIthMore from '@/hooks/useRequestWIthMore'
import { getContributors, Contributor } from '@/services/repos'
import Author from '@/components/author'
import Empty from '@/components/empty'
import LoadMore from '@/components/load-more'

const Contributors = () => {
  const {
    params: { owner, repo }
  } = useRouter()
  const full_name = `${owner}/${repo}`

  const [contributors, hasMore, refresh] = useRequestWIthMore<Contributor, any>(
    { full_name },
    getContributors
  )

  useEffect(() => {
    const title = full_name
    Taro.setNavigationBarTitle({ title })
  }, [])

  const handleNavTo = (name: string) => {
    Taro.navigateTo({ url: `/pages/developer/index?name=${name}` })
  }

  return (
    <View>
      {contributors ? (
        <Block>
          {contributors.map(user => {
            const node_id = user.node_id
            const login = user.login
            const avatar_url = user.avatar_url
            return (
              <View
                key={node_id}
                className="user"
                onClick={handleNavTo.bind(this, login)}
              >
                <Author login={login} url={avatar_url}></Author>
              </View>
            )
          })}
          <LoadMore hasMore={!!hasMore}></LoadMore>
        </Block>
      ) : (
        <Empty></Empty>
      )}
    </View>
  )
}

export default Contributors
