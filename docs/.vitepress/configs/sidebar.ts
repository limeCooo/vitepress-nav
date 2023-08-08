import type {DefaultTheme} from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
    '/fe/': [
        {
            text: 'JavaScript 基础知识',
            collapsed: false,
            items: [
                {text: '数据类型', link: '/fe/javascript/types'},
                {text: '引用类型的拷贝', link: '/fe/javascript/clone'},
                {text: '类型转换', link: '/fe/javascript/conversions'},
                {text: '原型和原型链', link: '/fe/javascript/prototype'},
                {text: '继承', link: '/fe/javascript/inherit'}
            ]
        },
        {
            text: 'ES6 常用知识点',
            link: '/fe/es6/'
        },
        {
            text: 'Vue',
            collapsed: false,

            items: [
                {text: 'Vue2 基础知识', link: '/fe/vue/vue2/index'},
                {text: '实例代码', link: '/fe/vue/vue3/index'}
            ]
        },
        {
            text: 'TypeScript',
            link: '/fe/typescript/base'
        },
        {
            text: 'HTML / CSS',
            collapsed: false,
            items: [
                {text: 'HTML 理论知识点', link: '/fe/html/'},
                {text: 'CSS 理论知识点', link: '/fe/css/'}
            ]
        },

        {
            text: '概念知识点',
            collapsed: false,
            items: [
                {text: '模块化', link: '/fe/concept/module'},
                {text: '前端页面渲染方式', link: '/fe/concept/page-rendering'}
            ]
        },

    ],

    '/subassembly/': [
        {
            text: '常用方法',
            collapsed: false,
            items: [
                {text: '常用方法', link: '/subassembly/utils/function'},
                {text: '常用正则', link: '/subassembly/utils/regexp'},
            ]
        },
        {
            text: '数组字典下拉',
            items: [
                {text: 'Select', link: '/subassembly/select/'},
            ]
        },
        {
            text: '搜索表单页',
            collapsed: false,
            items: [
                {text: 'SearchForm', link: '/subassembly/search/searchForm'},
                {text: 'SearchTable', link: '/subassembly/search/searchTable'},
                {text: 'SearchPageView', link: '/subassembly/search/pageView'},
            ]
        },
        {
            text: '快捷复制页',
            items: [
                {text: '报表', link: '/subassembly/copy/tableView'},
                {text: 'Dialog', link: '/subassembly/copy/dialog'},
            ]
        },
        {
            text: 'webpack',
            items: [
                {text: 'webpack', link: '/subassembly/webpack/index'},
            ]
        },
        {text: 'npm 常用命令', link: '/subassembly/node/npm'},

    ],

    '/tool/': [
        {
            text: '在线生成表格',
            link: '/tool/handsontable/handsontable'
        },
    ]
}
