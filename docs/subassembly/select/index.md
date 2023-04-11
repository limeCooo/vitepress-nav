# JSelect 数据字典下拉框组件

> 注: JSelect组件是一个基于 Element UI Select 组件封装的字典选择器。通过传入数据字典名称，自动从本地存储或远程获取数据字典选项列表，实现快速选择字典数据的功能。

## 使用方法

在 Vue 项目中引入 JSelect 组件 并在components声明

```js
import JSelect from "@/components/JSelect.vue";

components: {
  JSelect
}
```

也可以在全局注册 找到main.js文件

```js
import JSelect from "@/components/JSelect/JSelect.vue";

Vue.component('JSelect', JSelect);
```

## 基本使用

```js
<JSelect
  v-model="selected"
  name="dictionary_name"
  filterable
  clearable
  placeholder="请选择"
/>
```

- v-model：用于双向绑定已选中的值
- name：数据字典的名称，必填项
- filterable：是否支持过滤选项，默认为 true
- clearable：是否支持清空已选项，默认为 true
- placeholder：输入框默认占位文本
- 需要注意的是，组件的 value 属性和 v-model 属性不要同时使用

::: tip 温馨提示

- JSelect 组件需要传入数据字典的名称作为 name 属性，因此在使用组件前需要确认该数据字典是否存在。
- JSelect 组件在获取数据字典时，首先会尝试从本地缓存获取，如果不存在则会调用远程接口获取。因此需要确保数据字典已经被加载到本地缓存中。
- JSelect 组件内部使用了 Element UI 的 Select 组件，因此支持 Select 组件的所有 Props、Slots 和 Events。如果需要对 Select
  组件进行更深层次的修改，可以在 JSelect 组件内部通过 v-bind="$attrs" 和 v-on="$listeners" 将原生的 Props 和 Events 传递到
  Select 组件中。
  :::

## 完整组件内容

```vue
<template>
  <el-select
    v-model="selected"
    v-bind="$attrs"
    v-on="$listeners"
    :key="name"
    filterable
    clearable
  >
  <el-option
    v-for="(option, index) in dictionaryOptions"
    :key="index"
    :label="option.label"
    :value="option.value"
    />
</el-select>
</template>

<script>
  // 组件定义
  export default {
  name: "DictionarySelect", // 组件名称

  // 组件属性
  props: {
    name: { // 数据字典的名称
      type: String,
      required: true
    },
      value: { // 已选中的值
      type: [String, Number],
      default: ""
    },
      returnType: { // 返回值类型，默认为"value"或"label"
      type: String,
      default: "value",
      validator: (value) => {
        return ["label", "value"].indexOf(value) !== -1;
      },
    },
  },

  // 计算属性
  computed: {
  // 根据数据字典获取选项列表
  dictionaryOptions() {
    // 从本地存储获取数据字典，如果没有则从远程获取
    const dict = this.getDictionaryFromStorage() || this.getDictByName(this.name);
        if (dict) {
        // 将数据字典格式化为选项列表
          return dict.map(item => ({
          label: item.dataText,
          value: item.dataCode,
        }));
        } else {
          return [];
        }
      },
        selectedValue() { // 已选中的值，根据 returnType 返回对应的值
          return this.returnType === "label" ? this.selectedLabel : this.selected;
        },
        selectedLabel() { // 已选中的值的标签
          const option = this.dictionaryOptions.find(opt => opt.value === this.selected);
          return option ? option.label : "";
        }
  },

  // 监听属性变化
  watch: {
    name: { // 监听 name 属性变化
    handler() {
    this.options = this.dictionaryOptions;
    },
      immediate: true
    },
      value: { // 监听 value 属性变化
      handler(newValue) {
      this.selected = newValue;
    },
      immediate: true
    },
      selected() { // 监听 selected 属性变化
      this.$emit("input", this.selectedValue);
    }
  },

  // 组件数据
  data() {
    return {
      selected: this.value, // 已选中的值
      options: [] // 选项列表
    };
  },
  mounted(){
    console.log(this.$attrs)
  },
  // 组件方法
  methods: {
    async getDictByName(name) { // 根据名称从远程获取数据字典
      const res = await this.$store.dispatch("user/getdictionary");
      return res[name];
    },
    getDictionaryFromStorage() { // 从本地存储获取数据字典
      const dict = JSON.parse(localStorage.getItem("dictionary"));
      return dict && dict[this.name]
    },
  }
};
</script>


```

