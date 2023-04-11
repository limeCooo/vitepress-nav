import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航', link: '/nav', activeMatch: '^/nav' },
  { text: '常用知识', link: '/fe/es6/', activeMatch: '^/fe' },
  { text: '常用组件', link: '/subassembly/select/', activeMatch: '^/subassembly' },

]
