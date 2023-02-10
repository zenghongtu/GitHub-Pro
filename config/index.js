const path = require('path');

const config = {
	projectName: 'GitHub-Pro',
	date: '2023-2-7',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
	sourceRoot: 'src',
	outputRoot: 'dist',
	plugins: ['@tarojs/plugin-html'],
	defineConstants: {},
	alias: {
		'@': path.resolve(__dirname, '..', 'src'),
	},
	copy: {
		patterns: [],
		options: {},
	},
	framework: 'react',
	compiler: 'webpack5',
	cache: {
		enable: false, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
	},
	sass: {
    resource: [path.resolve(__dirname, "..", "src/style/variables.scss")],
		// data: `@import "taro-ui/dist/style/variables/default.scss";`,
	},
	mini: {
		miniCssExtractPluginOption: {
			ignoreOrder: true,
		},
		postcss: {
			pxtransform: {
				enable: true,
				config: {
				},
			},
			url: {
				enable: true,
				config: {
					limit: 1024, // 设定转换尺寸上限
				},
			},
			cssModules: {
				enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
				config: {
					namingPattern: 'module', // 转换模式，取值为 global/module
					generateScopedName: '[name]__[local]___[hash:base64:5]',
				},
			},
		},
	},
	h5: {
		publicPath: '/',
		staticDirectory: 'static',
		// esnextModules: ['nutui-react'],
		postcss: {
			pxtransform: {
				enable: true,
				config: {
				},
			},
			autoprefixer: {
				enable: true,
				config: {},
			},
			cssModules: {
				enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
				config: {
					namingPattern: 'module', // 转换模式，取值为 global/module
					generateScopedName: '[name]__[local]___[hash:base64:5]',
				},
			},
		},
	},
};

module.exports = function (merge) {
	if (process.env.NODE_ENV === 'development') {
		return merge({}, config, require('./dev'));
	}
	return merge({}, config, require('./prod'));
};
