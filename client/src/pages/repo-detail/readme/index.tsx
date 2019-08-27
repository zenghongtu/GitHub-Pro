import Taro, { Component, Config } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import useRequest from "../../../hooks/useRequest"
import { getReadme } from "../../../services/repos"
import Empty from "@/components/empty"

const Readme = ({ repoName }) => {
  const [md, refreshMd] = useRequest(`/repos/${repoName}/readme`, getReadme)

  return (
    <View>
      {md ? (
        <wemark
          md={md}
          link
          highlight
          type="wemark"
          baseurl={"https://raw.githubusercontent.com/" + repoName + "/master/"}
          currentDir={repoName}
        />
      ) : (
        <Empty></Empty>
      )}
    </View>
  )
}

Readme.config = {
  usingComponents: {
    wemark: "../../wemark/wemark"
  }
}
export default Readme
