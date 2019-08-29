import Taro, { Component, Config } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import useRequest from "@/hooks/useRequest"
import { getContents, File } from "@/services/repos"
import NavBar from "@/components/navbar"

const full_name = "zenghongtu/Mob"
const Files = () => {
  const [files, refresh] = useRequest<File[] | null>(full_name, getContents)

  return (
    <View>
      <NavBar isGoBackBtn></NavBar>
      <View>
        {files &&
          files.map(item => {
            const { name, path, type, download_url, url, size } = item
            return (
              <View>
                {type} {name}
                {size}
              </View>
            )
          })}
      </View>
    </View>
  )
}

export default Files
