# SearchTable查询表格

> 注: emmmmmm

## 完整组件内容

```vue
<template>
  <div class="table-wrap">
    <el-table
      v-bind="$attrs"
      v-on="$listeners"
      :data="tableData"
      stripe
      border
      class="table-list"
      :header-cell-style="{background: 'rgb(246,247,251)',color: '#606266',}">
      <template
        v-for="(item,index) in tableHeadData">
        <el-table-column
          :label="item.label"
          :prop="item.prop"
          :width="item.width"
          :align="item.align ? item.align : 'center'">
        </el-table-column>
        <!-- 表格操作按钮-->
        <!-- solt 自定义列-->

        <el-table-column
          v-if="item.type === 'slot'"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width">
          <template slot-scope="scope">
            <slot :name="item.slotType" :row="scope.row"/>
          </template>
        </el-table-column>

      </template>
      <el-table-column
        v-if="tableOption && tableOption.label"
        :width="tableOption.width"
        :label="tableOption.label"
        fixed="right"
        align="center">
        <template slot-scope="scope">
          <el-button
            v-for="(item,index) in tableOption.options"
            :key="index"
            :type="item.type"
            :icon="item.icon"
            @click="handleButton(item.methods,scope.row)"
            size="mini">
            {{ item.label }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-row type="flex" justify="end" class="pagination-wrap">
      <el-pagination
        background
        :current-page.sync="pager.currentPage"
        :page-size="pager.pageSize"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        v-bind="$attrs"
        v-on="$listeners"
        :total="pager.total"
      >
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "searchTable",
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    tableHeadData: {
      type: Array,
      default() {
        return []
      }
    },
    tableOption: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      pager: {
        pageSize: 20,
        total: 1,
        currentPage: 1
      },
    }
  },
  methods: {
    handleButton(methods, row, event) {
      this.$emit('handleButton',{ 'methods':methods,'row':row })
    },
  }
}
</script>

<style scoped>
.pagination-wrap {
  padding: 10px;
  background-color: #FFF;
}

.table-wrap {
  background-color: #FFF;

  padding: 10px;
}
</style>


```

