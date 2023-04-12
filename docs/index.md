---
layout: home
layoutClass: 'm-home-layout'

hero:
  name: 
  text: 前端导航
  tagline: 使用 VitePress 打造前端导航
  image:
    src: /logo.png
    alt: vitePress
  actions:
    - text: 前端导航
      link: /nav
      theme: alt

features:
  - icon: 📗
    title: 前端导航。
    details: 前端导航
    link: /nav
    linkText: 前端导航
  - icon: 📙
    title: 常用知识
    details: 整理前端常用知识点<br />如有异议按你的理解为主，不接受反驳
    link: /fe/javascript/types
    linkText: 前端常用知识
  - icon: 📘
    title: 
    details: 二次封装Element组件<br />常用的方法
    link: /subassembly/utils/function
    linkText: 工作常用方法和组件

  
---

<style>
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
