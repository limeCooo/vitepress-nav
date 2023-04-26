import type { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.Config['nav'] = [
  { text: '导航', link: '/nav', activeMatch: '^/nav' },
  { text: '常用知识', link: '/fe/javascript/types', activeMatch: '^/fe' },
  { text: '工作小计', link: '/subassembly/utils/function', activeMatch: '^/subassembly' },
  { text: '工具', link: '/tool/handsontable/handsontable', activeMatch: '^/tool' },
]
