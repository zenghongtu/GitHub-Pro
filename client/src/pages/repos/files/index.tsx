import Taro, { Component, Config } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import useRequest from "@/hooks/useRequest"
import { getContents, File } from "@/services/repos"
import NavBar from "@/components/navbar"
import { AtList, AtListItem, AtIcon } from "taro-ui"
import { bytesToSize } from "@/utils/size"

const full_name = "zenghongtu/Mob"
const Files = () => {
  const [files, refresh] = useRequest<File[] | null>(full_name, getContents)
  // TODO sort by name & type
  return (
    <View>
      <NavBar isGoBackBtn></NavBar>
      <View className="files-wrap">
        <AtList hasBorder={false}>
          {files &&
            files.map(item => {
              const { name, path, type, download_url, url, size } = item
              // TODO check file type to open files or content
              const isFolder = type === "dir"
              return (
                <View key="url" className="file-item">
                  <AtListItem
                    className="file"
                    hasBorder={false}
                    title={(`${isFolder ? `🗂️` : `📄`}${name}`}
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
