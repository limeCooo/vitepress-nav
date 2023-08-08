# Vue基础整理

## 谈一谈对MVVM的理解？
Model View ViewModel model代表数据模型，定义数据的修改和操作的业务逻辑，View代表Ui组件负责将数据模型转换成UI展示出来 ViewModel是View和model的桥梁，并且是双向的，View数据变化会同步到model中，Model的变化也会同步到View中。同步工作是完全自动的,开发者只需要关注业务逻辑，不需要手动操作DOM。也不需要关注数据状态的同步问题。

## 谈一下VUE的优点、缺点
vue的优点：
- 1、双向数据绑定
- 2、组件化开发
- 3、虚拟DOM
- 4、响应式
- 5、生态丰富
  vue的缺点     ：
- 1、不利于seo优化

## 谈一下VUE的响应式原理
Vue.js 的响应式原理主要是通过 Object.defineProperty() 方法实现的。这个方法可以让我们在访问或修改对象属性时执行一些自定义操作。Vue.js 利用这个方法将对象的属性转换为 getter 和 setter，从而实现响应式。

当访问或修改对象的属性时，getter 和 setter 会被触发。当访问属性时，getter 方法会被调用，返回当前属性的值；当修改属性时，setter 方法会被调用，并传入新值。通过这种方式，我们可以实现在修改属性时自动更新视图。

以下是如何使用 Object.defineProperty() 实现响应式的示例：
```js
function makeObservable(obj) {
 const keys = Object.keys(obj);

 for (const key of keys) {
   const value = obj[key];
   Object.defineProperty(obj, key, {
     get() {
       console.log(`访问 ${key}`);
       return value;
     },
     set(newValue) {
       console.log(`修改 ${key} 为 ${newValue}`);
       value = newValue;
     },
   });
 }
}

const obj = {};
makeObservable(obj);
obj.name = 'John'; // 访问 name
obj.name = 'Jane'; // 修改 name 为 Jane
```
在这个示例中，我们定义了一个名为 makeObservable 的函数，它接受一个对象作为参数。然后，我们遍历对象的所有键，并使用 Object.defineProperty() 方法将每个键转换为 getter 和 setter。当访问属性时，getter 方法会被调用，当修改属性时，setter 方法会被调用。

Vue.js 使用了这个原理来实现响应式。当创建一个 Vue 实例时，它会遍历 data 对象的所有属性，并使用 Object.defineProperty() 将它们转换为响应式。这样，当 data 对象中的属性发生变化时，Vue.js 的视图会自动更新。

## vue2如何检测数组变化的？
将数组的常用方法进行了重新写，将data的数组进行了原型链重写，指向了自己定义的数组原先方法，这样调用的数组api的时候，可以通知依赖更新，如果数组中包含着引用类型，会对数组中的引用类型再次递归遍历进行监控，这样就监测了数组的变化。


## vue实现双向绑定的原理是什么？
Vue2.x 采用数据劫持结合发布订阅模式（PubSub 模式）的方式，通过 Object.defineProperty 来劫持各个属性的 setter、getter，在数据变动时发布消息给订阅者，触发相应的监听回调。
当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty 将它们转为 getter/setter。
用户看不到 getter/setter，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。
Vue 的数据双向绑定整合了 Observer，Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 的数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化->视图更新，视图交互变化（例如 input 操作）->数据 model 变更的双向绑定效果。
Vue3.x 放弃了 Object.defineProperty ，使用 ES6 原生的 Proxy，来解决以前使用 Object.defineProperty 所存在的一些问题。

## v-model 双向绑定的原理是什么？

v-model 本质就是 :value + input 方法的语法糖。可以通过 model 属性的 prop 和 event 属性来进行自定义。原生的 v-model，会根据标签的不同生成不同的事件和属性。
例如：

text 和 textarea 元素使用 value 属性和 input 事件
checkbox 和 radio 使用 checked 属性和 change 事件
select 字段将 value 作为 prop 并将 change 作为事件

以输入框为例，当用户在输入框输入内容时，会触发 input 事件，从而更新 value。而 value 的改变同样会更新视图，这就是 vue 中的双向绑定。双向绑定的原理，其实现思路如下：
首先要对数据进行劫持监听，所以我们需要设置一个监听器 Observer，用来监听所有属性。如果属性发上变化了，就需要告诉订阅者 Watcher 看是否需要更新。
因为订阅者是有很多个，所以我们需要有一个消息订阅器 Dep 来专门收集这些订阅者，然后在监听器 Observer 和订阅者 Watcher 之间进行统一管理的。
接着，我们还需要有一个指令解析器 Compile，对每个节点元素进行扫描和解析，将相关指令对应初始化成一个订阅者 Watcher，并替换模板数据或者绑定相应的函数，此时当订阅者 Watcher 接收到相应属性的变化，就会执行对应的更新函数，从而更新视图。
因此接下去我们执行以下 3 个步骤，实现数据的双向绑定：

实现一个监听器 Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。
实现一个订阅者 Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图。
实现一个解析器 Compile，可以扫描和解析每个节点的相关指令，并根据初始化模板数据以及初始化相应的订阅器。


v-model 指令在内部为不同的输入元素使用不同的属性并抛出不同的事件：
- text 和 textarea 元素使用 value 属性和 input 事件；
- checkbox 和 radio 使用 checked 属性和 change 事件；
- select 字段将 value 作为 prop 并将 change 作为事件。

## 解释一下对 Vue 生命周期的理解？
对于vue来说，生命周期就是一个vue实例从创建到销毁的整个过程，就是生命周期。

vue 生命周期有几个阶段
它可以总共分为 8 个阶段：创建前/后, 载入前/后,更新前/后,销毁前/销毁后。
- beforeCreate 创建前状态 :实例创建之前调用，此时实例还没有被创建
- created 创建后状态 在实例创建完成后发生，当前阶段已经完成了数据观测，可以使用数据，更改数据，在这里更改不会触发updated函数，可以做一些初始数据的获取，在此阶段无法与DOM进行交互
- beforeMount 挂载前状态 发生在挂在之前，在这之前template 模板已导入渲染函数编译，当前阶段虚拟DOM已经创建完成，可以开始渲染，在此也可以进行数据修改，不会触发updated.
- mounted 挂载后状态 在挂载后发生，也就是在挂载完成后发生，真实DOM挂在完毕，数据完成双向绑定，可以访问到DOM节点，使用$refs属性对dom进行操作。
- beforeUpdate 更新前状态 在数据更新之前调用，发生在响应式数据发生更新，虚拟DOM重新渲染之前被触发，当前阶段进行数据修改，不会造成重新渲染。
- updated 更新后状态 在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用，当前阶段组件DOM已经更新，可以执行依赖于DOM的操作。避免在此期间更改数据，可能会导致循环

- beforeDestroy 销毁前状态 当前阶段可实例可以被使用，可以进行收尾工作，清除计时器。
- destroyed 销毁后状态 组件实例被销毁之后调用，组件已被从页面卸载，组件上的事件监听器也已被移除，该组件的生命周期函数被调用。
  ::: tip  补充
  - 第一次进入页面加载会触发哪几个钩子？
    beforeCreate，created，beforeMount，mounted 
  - DOM渲染在哪个周期就已经完成了
    DOM渲染是在mounted阶段完成的，此阶段真实的DOM挂在完毕，数据完成双向绑定，可以访问到DOM节点。
  :::

## 多组件（父子组件）在生命周期中的调用顺序？
1.加载渲染过程：父befoCreate -> 父created -> 父beforeMount -> 子beforeCreate -> 子created -> 子beforeMount -> 子mounted -> 父mounted   
2.更新过程：父beforeUpdate -> 子beforeUpdate -> 子updated -> 父updated
3.销毁过程：父beforeDestroy -> 子beforeDestroy -> 子destroyed -> 父destroyed



## 组件中 data 为什么是一个函数？
组件是用来复用的，而不同的组件 data 可能会有相同的属性或方法，如果组件中 data 是一个对象，那么很容易造成属性或方法污染，所以应该定义成函数。



## 组件之间如何进行通信？

- 父组件传值给子组件，子组件使用props进行接收
- 子组件传值给父组件，子组件使用$emit+事件对父组件进行传值
- 组件中可以使用$parent和$children获取到父组件实例和子组件实例，进而获取数据
- 使用$attrs和$listeners，在对一些组件进行二次封装时可以方便传值，例如A->B->C
- 使用$refs获取组件实例，进而获取数据
- 使用Vuex进行状态管理
- 使用eventBus进行跨组件触发事件，进而传递数据
- 使用provide和inject，
- 使用浏览器本地缓存，例如localStorage



## vue2和vue3 的区别？
响应式系统重写。使用Proxy代理而不是Object.defineProperty()来实现响应式。
提供了compostition API。
新的特性。


## Vue3.x 响应式数据原理是什么？

在 Vue 2 中，响应式原理就是使用的 Object.defineProperty 来实现的。但是在 Vue 3.0 中采用了 Proxy，抛弃了 Object.defineProperty 方法。
究其原因，主要是以下几点：

Object.defineProperty 无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应
Object.defineProperty 只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy 可以劫持整个对象，并返回一个新的对象。
Proxy 不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。
Proxy 有多达 13 种拦截方法
Proxy作为新标准将受到浏览器厂商重点持续的性能优化
::: tip
- Proxy 只会代理对象的第一层，那么 Vue3 又是怎样处理这个问题的呢？
  判断当前 Reflect.get 的返回值是否为 Object，如果是则再通过 reactive 方法做代理， 这样就实现了深度观测。
- 监测数组的时候可能触发多次 get/set，那么如何防止触发多次呢？
  我们可以判断 key 是否为当前被代理对象 target 自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行 trigger。
:::
## 为什么 Vue3.0 采用 Proxy，而不是用 Object.defineProperty？
Proxy 可以监听对象和数组的变化。
Proxy 可以直接监听数组的变化，而不需要像 Object.defineProperty 那样通过修改数组原型方法来实现。


## v-if 和 v-show的区别？
v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁
v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件
v-show 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

## nextTick 的原理是什么？
vue 更新DOM是异步更新的，数据变化，DOM不会立马进行更新，在下次 DOM 更新循环结束之后执行延迟回调，用于获得更新后的 DOM。


## computed 和 watch 的区别和运用的场景？
computed 是计算属性，依赖其他属性计算值，并缓存计算结果，只有当计算属性所依赖的属性值发生改变，才会重新计算并返回内容。

watch 更多的是观察作用，监听数据变化，执行回调，默认第一次无效。每当监听的值发生变化时都会执行回调进行后续操作。

区别：
- 都是观察数据变化的（相同）
- 计算属性将会混入到 vue 的实例中，所以需要监听自定义变量；watch 监听 data 、props 里面数据的变化；
- computed 有缓存，它依赖的值变了才会重新计算，watch 没有；
- watch 支持异步，computed 不支持；
- watch 是一对多（监听某一个值变化，执行对应操作）；computed 是多对一（监听属性依赖于其他属性）
- watch 监听函数接收两个参数，第一个是最新值，第二个是输入之前的值；
- computed 属性是函数时，都有 get 和 set 方法，默认走 get 方法，get 必须有返回值（return）

## 为什么v-if和v-for不建议连用？
v-for的优先级高于v-if，会先渲染出节点，然后再if判断。增加了无用的DOM


## vueX里面有哪些属性？用处是什么
- state：存放状态
- Mutation：是唯一更改 store 中状态的方法，且必须是同步函数
- getters：从state派生的状态，相当于state的计算属性
- actions：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
- module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中

## 如何将获取data中某一个数据的初始状态？
this.$options.data()

:::


## vue2 和 vue3 核心diff算法的区别？

vue2的diff算法主要是 双向指针遍历算法，也就是通过逐层对比新旧虚拟DOM树节点的方式来计算出更需要做的最小操作合集。
但这种操作方法的缺点是，由于遍历从左到右，从上到下，当发生节点删除或者移动时，会导致其他节点计算失误，因此会造成大量无效的重新渲染

vue3的diff算法，经过优化的单项遍历算法，也就是只扫描新虚拟DOM的节点，来判断是否需要更新，跳过不需要更新的节点。此外在虚拟DOM创建后
Vue3会缓存虚拟DOM节点的信息，以便复用，这也会带来性能上的优势。同时vue3还引入了静态提升技术，在编译时一些静态的节点，子节点预先处理成HTML字符串，大大提升了渲染性能




