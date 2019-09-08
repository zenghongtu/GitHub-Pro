import Taro, { Component, Config, useState, useRouter } from "@tarojs/taro"
import { View, Text, Button } from "@tarojs/components"
import "./index.scss"
import { AtInput, AtTextarea, AtButton } from "taro-ui"
import { createIssue } from "../../../services/issues"

const CreateIssue = () => {
  const {
    params: { full_name }
  } = useRouter()

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleChange = (val: string) => {
    setTitle(val)
  }
  const handleTextareaChange = ev => {
    setContent(ev.target.value)
  }
  const handleConfirm = () => {
    const data = {
      title: title,
      body: content
    }
    createIssue({ full_name }, data).then(data => {
      if (data && data.title === title) {
        Taro.showToast({ title: "Success", icon: "success" })
        setTimeout(() => {
          Taro.navigateBack()
        }, 1000)
      }
    })
  }

  // TODO add preview
  return (
    <View className="wrap">
      <View className="title">
        <AtInput
          name="title"
          title=""
          type="text"
          placeholder="Title"
          value={title}
          border={false}
          onChange={handleChange}
        />
      </View>
      <View className="content">
        <AtTextarea
          height={400}
          count={false}
          maxLength={10000}
          value={content}
          onChange={handleTextareaChange}
          placeholder="Leave a comment"
        />
      </View>
      <AtButton className="confirm" type="primary" onClick={handleConfirm}>
        Submit new issue
      </AtButton>
    </View>
  )
}

export default CreateIssue
