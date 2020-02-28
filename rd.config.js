module.exports = {
    dev: [
        [
            'webpack4',
            {
                // __path__: '../rd-mid-webpack4',
                entry: "./lib/example/index.js",
                template: "./lib/example/assets/index.html",
                cssModules: false, // css 模块化时不支持 通过less 方式的主题替换
                devtool: true, // 是否开启调试
                watch: true, //
                common: false,
                autoOpen: true, // 本地开发是否自动在浏览器中打开
                transform: true,
                port: 8888, // 本地服务端口
            }
        ]
    ],
    build: [
        [
            'webpack4',
            {
                entry: "./lib/index.js",
                output: './build',
                common: false,
                manifest: false,
                cssModules: false,
                analyze: true,  // 启动打包文件分析
                transform: false,
                externals: {
                    'react': {
                        root: 'React',
                        commonjs: 'react',
                        commonjs2: 'react',
                        amd: 'react'
                    },
                    'react-dom': {
                        root: 'ReactDom',
                        commonjs: 'react-dom',
                        commonjs2: 'react-dom',
                        amd: 'react-dom'
                    },
                    'antd': 'antd'
                }
            }
        ]
    ],
    pb: [
        
    ]
}