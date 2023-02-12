// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true
    }]
  ],
  plugins: [
    [
      'import',
      {
        libraryName: 'taro-ui',
        customName: name => {
          if(name === 'at-list-item'){
            name = 'at-list/item'
          } else if(name === 'at-action-sheet-item'){
            name = 'at-action-sheet/body/item'
          }
          return `taro-ui/lib/components/${name.slice(3)}`
        },
        customStyleName: name => {
          /**
           * 修复style
          */
          if(name === 'at-tabs-pane'){
            name = 'at-tabs'
          }
          else if(name === 'at-list-item'){
            name = 'at-list'
          }
          else if(name === 'at-action-sheet-item'){
            name = 'at-action-sheet'
          }
          return `taro-ui/dist/style/components/${name.slice(3)}.scss`
        }
      },
      'taro-ui'
    ]
  ]
}
