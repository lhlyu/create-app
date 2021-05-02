// doc: https://d.umijs.org/zh-CN/config

export default {
  title: '谕の项目模板',
  mode: 'doc',
  // description: '',
  logo: '/favicon.svg',
  favicon: '/favicon.ico',
  locales: [['zh-CN', '中文']],
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css',
      }
    ]
  ]
}
