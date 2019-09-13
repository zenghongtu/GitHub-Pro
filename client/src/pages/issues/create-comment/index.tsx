import Taro, {
  Component,
  Config,
  useState,
  useRouter,
  useEffect
} from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import './index.scss'
import { AtInput, AtTextarea, AtButton } from 'taro-ui'
import { createIssueComment } from '../../../services/issues'

const CreateComment = () => {
  const {
    params: { full_name, number }
  } = useRouter()

  const [content, setContent] = useState('')

  useEffect(() => {
    const title = full_name
    Taro.setNavigationBarTitle({ title })
  }, [])
  const handleTextareaChange = ev => {
    setContent(ev.target.value)
  }
  const handleConfirm = () => {
    const data = {
      body: content
    }

    createIssueComment({ full_name, number }, data).then(res => {
      if (res && res.body === content) {
        Taro.showToast({ title: 'Success', icon: 'success' })
        setTimeout(() => {
          Taro.navigateBack()
        }, 1000)
      }
    })
  }

  return (
    <View className="wrap">
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
        Comment
      </AtButton>
    </View>
  )
}

export default CreateComment
