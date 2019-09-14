import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './index.scss'
import {
  mdLink,
  isGitHubPage,
  parseGitHub,
  getNavPath,
  githubHttpUrl,
  githubHttpsUrl
} from '@/utils/repo'
import { ITouchEvent } from '@tarojs/components/types/common'
import { copyText } from '@/utils/common'

interface MarkDownProps {
  md: string | undefined | null
  full_name?: string
}

const Markdown = ({ md: rawMD, full_name }: MarkDownProps) => {
  if (!rawMD) {
    return null
  }

  const faceLink = (f: string) => {
    return (
      '![](https://www.webfx.com/tools/emoji-cheat-sheet/graphics/emojis/' +
      f +
      '.png)'
    )
  }

  const getFixedMD = (rawMD = '') => {
    let md = rawMD

    const d = {
      '’': "'",
      '<br>': '\n\n',
      '<br/>': '\n\n',
      '<br />': '\n\n',
      '<em>': '',
      '</em>': '',
      '<strong>': '',
      '</strong>': '',
      '<li>': '* ',
      '</li>': '\n',
      '<ul>': '\n',
      '</ul>': '\n',
      '<code>': '`',
      '</code>': '`',
      '&nbsp;': ' ',
      '&quot;': '"',
      '&ldquo;': '"',
      '&rdquo;': '"',
      '&gt;': '>',
      '&lt;': '<'
    }
    for (const k in d) {
      const reg = new RegExp(k, 'g')
      md = md.replace(reg, d[k])
    }

    const faceRegExp = [/:([a-z_]{1,30}?):/g, /[+*-] (\[[x ]\])/g]
    faceRegExp.map(f => {
      const tmpreg = md
      while ((match = f.exec(tmpreg))) {
        if (match[1].startsWith('[')) {
          match[0] = match[1]
          if (match[1].indexOf('x') > 0) {
            match[1] = 'white_check_mark'
          } else {
            match[1] = 'white_medium_square'
          }
        }
        md = md.replace(match[0], faceLink(match[1]))
      }
    })

    const linkRegExp = /((^|[ \n:\uff1a\uff0c]+)(https?:\/\/[/0-9a-zA-Z.&=#_?-]+)([ \t\r\n]+|$))/g
    const matchCnt = 3
    let match: any
    const newHtml = md
    while ((match = linkRegExp.exec(newHtml))) {
      if (match[1] && match[matchCnt]) {
        const t = match[1]
        const url = match[matchCnt]
        const r = t.replace(url, mdLink(url, url))
        md = md.replace(match[1], r)
      }
    }
    return md
  }

  const md = getFixedMD(rawMD)

  const handleClick = (e: ITouchEvent) => {
    let clickurl = e.detail.currentTarget.dataset.text
    console.log('clickurl: ', clickurl)

    const isRelativeFile =
      clickurl && (clickurl.startsWith('./') || !clickurl.startsWith('http'))
    if (isRelativeFile) {
      clickurl = githubHttpsUrl + '/' + clickurl
    }

    const isGitHubUrl = isRelativeFile || isGitHubPage(clickurl)

    // TODO 跳转其他小程序
    if (isGitHubUrl) {
      const [owner, repo, filePath] = parseGitHub(clickurl)
      const path = getNavPath({ owner, repo, filePath })
      Taro.navigateTo({ url: path })
      return
    } else {
      copyText(clickurl)
    }
  }

  const baseUrl = full_name
    ? 'https://raw.githubusercontent.com/' + full_name + '/master/'
    : ''

  // TODO 修复 md 中含有 html 情况下的渲染
  // TODO 修复表格显示问题
  // TODO 添加 currentDir，获取正确的图片引入地址
  return (
    <View>
      <wemark
        onClick={handleClick}
        md={md}
        link
        highlight
        type="wemark"
        baseurl={baseUrl}
      />
    </View>
  )
}

Markdown.config = {
  usingComponents: {
    wemark: '../../wemark/wemark'
  }
}

export default Markdown
