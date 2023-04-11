# SearchForm查询表单

> 注: JSON生成表单一时爽，事后维护火葬场


## 使用方法


在 Vue 项目中引入 JSelect 组件 并在components声明


```js

import SearchForm from "@/components/SearchForm/SearchForm.vue";


components: {

  SearchForm

}

```


也可以在全局注册 （参考JSelect）


## 基本使用


```vue
 <SearchForm 
  :submit-list="submitList" 
  :searchFormData="searchFormData" 
  @search="onSubmit" 
  @exportExcel="exportExcelFun">
</SearchForm>

<script >
export default {
  data() {
    return {
      // 搜索表单属性
      searchFormData: [
        {
          type: 'text',
          key: 'deadName',
          label: '逝者姓名',
        },
        {
          type: 'date',
          key: 'chargeTime',
          label: '火化日期',
        },
        {
          type: 'month',
          key: 'dateTime',
          label: '查询月份',
        },

        {
          type: 'dateRange',
          key: ['startDate', 'endDate'],
          label: '火化日期',
        },

        {
          type: 'select',
          key: 'status',
          label: '状态',
          data: [
            {
              label: '全部',
              value: 0
            },
            {
              label: '审核中',
              value: 1
            },
            {
              label: '取消',
              value: 2
            },
          ]
        },

      ],

      // 按钮
      submitList: [
        {
          type: 'search',
          text: '查询',
        },
        {
          type: 'exportExcel',
          text: '重置',
        }
      ],
    }
  },
  methods:{
    // 
    onSubmit(formData) {
      this.ruleForm = formData;
      this.queryTableList();
    },
    //获取列表数据
    queryTableList() {
      
    },
    exportExcelFun() {
      download.exportExcel(functionName, {...this.ruleForm}, `${this.$route.name}${download.getDateTime()}.xlsx`);
    }
  }
}
</script>
```


## 完整组件内容
```vue
<template>
  <div class="search-form">
    <el-form
      ref="searchForm"
      :label-position="labelPosition"
      :label-width="labelWidth"
      inline
    >
      <el-form-item
        v-for="(item, index) in searchFormData"
        :key="index"
        class="form-item"
        :label="item.label"
      >
        <!-- 输入框 -->
        <el-input
          v-if="item.type === 'text'"
          v-model.trim="formData[item.key]"
          clearable
          :placeholder="'请输入' + item.label"
        />
        <!-- 日期选择框 -->

        <el-date-picker
          v-else-if="item.type === 'date' || item.type === 'month'"
          v-model="formData[item.key]"
          :type="item.type"
          clearable
          :placeholder="'请选择' + item.label"
          :value-format="item.type === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM'"
        />

        <el-date-picker
          v-else-if="item.type === 'dateRange'"
          v-model="dateRangeData[index]"
          type="daterange"
          :value-format="item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handleDateRange($event,item)"
        />
        <!-- 下拉选择框 -->
        <el-select
          v-else-if="item.type === 'select'"
          v-model="formData[item.key]"
          :placeholder="'请选择' + item.label"
          clearable
        >
          <el-option
            v-for="(n, i) in item.data"
            :key="i"
            :label="n.label"
            :value="n.value"
          >
            {{ n.label }}
          </el-option>
        </el-select>
        <!-- 这里可以后续接着扩展 -->
      </el-form-item>
      <el-form-item>
        <el-button
          v-for="(item,index) in submitList"
          :key="index"
          v-loading="item.loading"
          type="primary"
          :disabled="item.loading"
          @click.stop="handleBtnList(item.type)"
        >
          {{ item.text }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    labelPosition: {
      type: String,
      default: 'right'
    },
    labelWidth: {
      type: String,
      default: '120px'
    },
    // 数据
    searchFormData: {
      type: Array,
      default() {
        return []
      }
    },
    // 按钮
    submitList: {
      type: Array,
      default() {
        return []
      }

    },
    // 是否在加载中
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    initialFormData() {
      let obj = {}
      this.searchFormData.map((n, i) => {
        if (!Array.isArray(n.key)) {
          obj[n.key] = ''
        } else {
          n.key.forEach(t => {
            obj[t] = ''
          })
        }
      })
      return obj
    }
  },
  mounted() {
    this.formData = JSON.parse(JSON.stringify(this.initialFormData))
  },
  data() {
    return {
      // 查询表单数据
      formData: {},
      // 日期
      dateRangeData: {},
    }
  },
  methods: {

    // 时间选择
    handleDateRange(value, item) {
      if (!value) {
        // 初始化
        this.dateRangeData = {}
        this.formData[item.key[0]] = ''
        this.formData[item.key[1]] = ''
        return false
      }
      this.formData[item.key[0]] = value[0]
      this.formData[item.key[1]] = value[1]
    },


    handleBtnList(type) {
      if (type === 'search') {
        const formData = Object.assign({}, this.initialFormData, this.formData)
        this.$emit('search', formData)
      } else if (type === 'reset') {
        this.formData = JSON.parse(JSON.stringify(this.initialFormData))
        // this.$emit('reset', this.formData)
      } else if (type === 'exportExcel') {
        this.$emit('exportExcel', this.formData)
      }
    },


  }
}
</script>
<style lang="scss">

</style>



```
