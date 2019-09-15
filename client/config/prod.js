const path = require('path')

module.exports = {
  env: {
    NODE_ENV: '"production"',
    ClOUD_ENV: '"prod-gxbyo"'
  },
  defineConstants: {},
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/hooks': path.resolve(__dirname, '..', 'src/hooks'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/services': path.resolve(__dirname, '..', 'src/services'),
    '@/constants': path.resolve(__dirname, '..', 'src/constants.ts'),
    '@/package': path.resolve(__dirname, '..', 'package.json')
  },
  copy: {
    patterns: [
      {
        from: 'src/wemark',
        to: 'dist/wemark'
      }
    ],
    options: {}
  },
  weapp: {
    module: {
      postcss: {
        autoprefixer: {
          enable: true
        },
        // 小程序端样式引用本地资源内联配置
        url: {
          enable: true,
          config: {
            limit: 10240 // 文件大小限制
          }
        }
      }
    },
    compile: {
      exclude: ['src/wemark/remarkable.js']
    }
  },
  h5: {}
}
