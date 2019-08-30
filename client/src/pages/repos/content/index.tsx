import Taro, { Component, Config } from "@tarojs/taro"
import { View, Text } from "@tarojs/components"
import "./index.scss"
import useRequest from "@/hooks/useRequest"
import { getRawContent } from "@/services/repos"
import { getCodeMarkup, isImageFile } from "@/utils/repo"
import Markdown from "@/components/markdown"
import Empty from "@/components/empty"
import NavBar from "@/components/navbar"

const url =
  "https://api.github.com/repos/zenghongtu/Mob/contents/index.html?ref=master"

const Content = () => {
  const full_file_path = url.split("repos/")[1]
  const [rawContent, refreshContent] = useRequest<string | null>(
    full_file_path,
    getRawContent
  )

  if (!rawContent) {
    return <Empty></Empty>
  }

  const file_url = url.split("?")[0]
  let content = rawContent

  // stringify object
  if (typeof rawContent === "object") {
    content = JSON.stringify(rawContent, null, 2)
  }

  if (isImageFile(file_url)) {
    content = "![](" + file_url + ")"
  } else {
    const markup = getCodeMarkup(file_url)

    if (file_url.endsWith("ipynb")) {
      // TODO
    } else if (markup) {
      content = "```" + markup + "\n" + content + "\n```"
    }
  }

  return (
    <View>
      <NavBar isGoBackBtn></NavBar>
      <View>
        {<Markdown md={content} full_name={"zenghongtu/Mob"}></Markdown>}
      </View>
    </View>
  )
}

export default Content
