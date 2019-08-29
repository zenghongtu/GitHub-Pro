import Taro, { Component, Config } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import useRequest from "../../../hooks/useRequest"
import { getReadme, getRawReadme } from "../../../services/repos"
import Empty from "@/components/empty"
import Markdown from "@/components/markdown"

const Readme = ({ full_name }) => {
  const [md, refreshMD] = useRequest<string | null>(full_name, getRawReadme)

  return (
    <View>
      {md ? (
        <Markdown md={md} full_name={full_name}></Markdown>
      ) : (
        <Empty></Empty>
      )}
    </View>
  )
}

export default Readme
