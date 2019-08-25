import Taro, { Component, Config } from "@tarojs/taro"
import { View, Text, Block, Image } from "@tarojs/components"
import "./index.scss"
import { IUserInfo, IUserOrg } from "../../../services/user"
import Empty from "../../../components/empty"

interface InfoProps {
  userInfo: IUserInfo | null
  userOrgs: IUserOrg[] | null
}

const Info = ({ userInfo, userOrgs }: InfoProps) => {
  if (!userInfo) {
    return null
  }
  const {
    login,
    id,
    node_id,
    avatar_url,
    gravatar_id,
    url,
    html_url,
    followers_url,
    following_url,
    gists_url,
    starred_url,
    subscriptions_url,
    organizations_url,
    repos_url,
    events_url,
    received_events_url,
    type,
    site_admin,
    name,
    company,
    blog,
    location,
    email,
    hireable,
    bio,
    public_repos,
    public_gists,
    followers,
    following,
    created_at,
    updated_at
  } = userInfo!

  const renderUserOrgs = () => {
    return (
      <Block>
        <View>Organizations</View>
        <View>
          {userOrgs!.map(item => {
            const { id, avatar_url, login } = item
            return (
              <View key={id}>
                <Image src={avatar_url}></Image>
                <Text>{login}</Text>
              </View>
            )
          })}
        </View>
      </Block>
    )
  }

  return (
    <View>
      <View>
        <View>{name}</View>
        <View>{bio}</View>
        <View>{company}</View>
        <View>{email}</View>
        <View>{blog}</View>
        <View>
          <View>
            <View>{followers}</View>
            <View>Followers</View>
          </View>
          <View>
            <View>{following}</View>
            <View>Following</View>
          </View>
          <View>
            <View>{public_repos}</View>
            <View>Repositories</View>
          </View>
          <View>
            <View>{public_gists}</View>
            <View>Gists</View>
          </View>
        </View>
      </View>
      <View>{userOrgs ? renderUserOrgs() : <Empty></Empty>}</View>
    </View>
  )
}

export default Info
