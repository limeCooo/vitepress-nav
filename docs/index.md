---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 
  text: 前端导航
  tagline: 使用 VitePress 打造前端导航
#  image:
#    src: /logo.png
#    alt: vitePress
#  actions:
#    - text: vitePress
##      link: https://notes.fe-mm.com
#    - text: 前端导航
#      link: /nav/
#      theme: alt

features:
  - icon: 🧰
    title: 前端导航。
    details: 前端导航
    link: /nav
  - icon: 📖
    title: 常用知识
    details: 整理前端常用知识点<br />如有异议按你的理解为主，不接受反驳
    link: /fe/javascript/types
    linkText: 前端常用知识
  - icon: 📘
    title: 破烂组件
    details: 二次封装Element组件<br />好不好使的我也不知道
    link: /subassembly/select/
    linkText: 二次封装Element组件

  
---

<style>
/*爱的魔力转圈圈*/
.m-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.m-home-layout .details small {
  opacity: 0.8;
}

.m-home-layout .bottom-small {
  display: block;
  margin-top: 2em;
  text-align: right;
}
</style>
