import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航', link: '/nav', activeMatch: '^/nav' },
  { text: '常用知识', link: '/fe/es6/', activeMatch: '^/fe' },
  { text: '常用组件', link: '/subassembly/select/', activeMatch: '^/subassembly' },
  // {
  //   text: 'vitePress',
  //   link: 'https://notes.fe-mm.com'
  // },
  // {
  //   text: '日常笔记',
  //   link: 'https://github.com/zhangsan1996/daily-notes'
  // },
  // { text: 'mmPlayer', link: 'https://netease-music.fe-mm.com' },
  // {
  //   text: '油猴脚本',
  //   link: 'https://github.com/zhangsan1996/tampermonkey-scripts'
  // }
]
