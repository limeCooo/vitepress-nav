# 报表快捷复制页

## 基础查询报表
::: tip 温馨提示
 
- 这个才是最好用的，我是不用上面封装的
- CV大法好

:::

```vue
<template>
  <div class="container-table">
    <div class="search-wrap">
      <el-form
        :model="queryForm"
        :inline="true"
        ref="queryForm"
        label-width="100px"
      >
        <el-form-item label="逝者姓名">
          <el-input v-model="queryForm.deadName"></el-input>
        </el-form-item>
        <el-form-item label="查询日期">
          <el-date-picker v-model="queryForm.startTime" type="date" placeholder="选择开始时间"
                          value-format='yyyy-MM-dd' :picker-options="orderStartDate"></el-date-picker>
          -
          <el-date-picker v-model="queryForm.endTime" type="date" placeholder="选择结束时间"
                          value-format='yyyy-MM-dd' :picker-options="orderEndDate"></el-date-picker>
        </el-form-item>
   
        <el-form-item>
          <el-button type="primary" @click="onSubmit('search')">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="exportExcelFun">导出</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="printHtml">打印</el-button>
        </el-form-item>

      </el-form>
    </div>

    <div class="table-wrap" ref="table-content">
      <el-table
        :data="tableData"
        stripe
        border
        class="table-list"
        :header-cell-style="{
            background: 'rgb(246,247,251)',
            color: '#606266',
          }"
        :height="tableHeight"
      >
        <el-table-column label="逝者姓名" align='center' prop="deadName" width=""></el-table-column>
        <el-table-column label="年龄" align="center" prop="deadAge" width=""></el-table-column>
        <el-table-column label="性别" align='center' prop="deadGender" width=""></el-table-column>
        <el-table-column label="炉号" align='center' prop="furnaceCode" width=""></el-table-column>
        <el-table-column label="火化状态" align='center' prop="processState" width=""></el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-wrap">
        <el-pagination
          background
          :current-page.sync="pager.currentPage"
          :page-size="pager.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          :total="pager.total"
          @current-change="handleCurrentChange">
        </el-pagination>
      </el-row>
    </div>

  </div>
</template>

<script>
import {cremationAppointmentDetailExport, searchCremationAppointmentDetail} from "@/api/service";
import download from "@/api/download";

export default {
  name: "name",

  data() {
    return {
      orderStartDate: {
        disabledDate: (time) => {
          if (this.queryForm.endTime) {
            return time.getTime() > new Date(this.queryForm.endTime).getTime();
          }
        },
      },
      orderEndDate: {
        disabledDate: (time) => {
          if (this.queryForm.startTime) {
            return time.getTime() < new Date(this.queryForm.startTime).getTime() - 8.64e7;
          }
        },
      },
      //search
      queryForm: {
        startTime: '',
        endTime: '',
        processStateCode: 1,
      },
      pager: {
        pageSize: 20,
        total: 1,
        currentPage: 1
      },
      //search end
      //  table
      tableData: [],
      tableHeight: 0,

      processStates: []

    };
  },
  created() {
    this.queryTableList();

  },
  mounted() {
    window.onresize = () => {
      const searchHeight = document.querySelector(".search-wrap").offsetHeight;
      const containerHeight = document.querySelector(".container-table").offsetHeight;
      this.tableHeight = containerHeight - searchHeight - 100;
    };

  },
  updated() {
    this.$nextTick(() => {
      const searchHeight = document.querySelector(".search-wrap").offsetHeight;
      const containerHeight = document.querySelector(".container-table").offsetHeight;
      this.tableHeight = containerHeight - searchHeight - 100;
    });
  },
  methods: {
    // 点击查询按钮时触发，调用queryTableList方法获取列表数据
    onSubmit() {
      this.queryTableList();
    },

    // 分页器页码改变时触发，调用queryTableList方法获取列表数据
    handleCurrentChange(val) {
      this.queryTableList();
    },

    // 分页器每页显示条数改变时触发，修改pager的pageSize，调用queryTableList方法获取列表数据
    handleSizeChange(val) {
      this.pager.pageSize = val;
      this.queryTableList();
    },

    // 获取列表数据的方法，调用searchCremationAppointmentDetail接口查询数据，更新tableData和pager
    async queryTableList() {
      try {
        const res = await searchCremationAppointmentDetail({...this.queryForm});
        const {data, code} = res;
        if (code !== 1) {
          this.$message('数据读取失败');
        } else {
          this.tableData = data.list;
          this.pager = data.pager;
        }
      } catch (error) {
        console.error(error);
        this.$message('数据读取失败');
      }
    },

    // 导出Excel报表的方法，调用exportExcel接口下载Excel文件
    exportExcelFun() {
      download.exportExcel(cremationAppointmentDetailExport, {...this.queryForm}, `${this.$route.name}${download.getDateTime()}.xlsx`);
    },
  },

};
</script>

<style scoped lang="scss">
.container-table {
  padding: 10px 20px 20px;
  height: 100%;

  .search-wrap {
    padding-top: 20px;
    background-color: #FFF;
  }

  .pagination-wrap {
    padding: 10px;
    background-color: #FFF;
  }

  .table-wrap {
    background-color: #FFF;

    padding: 10px;
  }
}
</style>

```
