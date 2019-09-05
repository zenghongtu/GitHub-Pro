import Taro, { Component, Config, useRouter } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import useRequest from "@/hooks/useRequest"
import { getContents, File } from "@/services/repos"
import NavBar from "@/components/navbar"
import { AtList, AtListItem, AtIcon } from "taro-ui"
import { bytesToSize } from "@/utils/size"

const Files = () => {
  const {
    params: { owner, repo, url }
  } = useRouter()
  let full_url: string
  if (url) {
    full_url = "/repos/" + url.split("repos/")[1]
  } else {
    full_url = `/repos/${owner}/${repo}/contents`
  }

  const [files, refresh] = useRequest<File[] | null>(full_url, getContents)
  // TODO sort by name & type

  const handleNavTo = (url: string, isFolder: boolean) => () => {
    let target_url: string
    if (isFolder) {
      target_url = `/pages/repos/files/index?url=${url}`
    } else {
      target_url = `/pages/repos/content/index?url=${url}`
    }
    Taro.navigateTo({ url: target_url })
  }
  return (
    <View>
      <NavBar isGoBackBtn></NavBar>
      <View className="files-wrap">
        <AtList hasBorder={false}>
          {files &&
            files.map(item => {
              console.log("item: ", item)
              const { name, path, type, download_url, url, size } = item
              // TODO check file type to open files or content
              const isFolder = type === "dir"
              return (
                <View key="url" className="file-item">
                  <AtListItem
                    className="file"
                    hasBorder={false}
                    title={`${isFolder ? `🗂️` : `📄`}${name}`}
                    onClick={handleNavTo(url, isFolder)}
                    arrow={isFolder ? "right" : undefined}
                    extraText={isFolder ? "" : `${bytesToSize(size)}`}
                  ></AtListItem>
                </View>
              )
            })}
        </AtList>
      </View>
    </View>
  )
}

export default Files
