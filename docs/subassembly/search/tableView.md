# 表格查询快捷复制页

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

    </div>

  </div>
</template>

<script>
import * as Type from '@/api/service'
import {cremationAppointmentDetailExport, searchCremationAppointmentDetail} from "@/api/service";
import {getLodop} from "@/utils/lodopFuncs";
import download from "@/api/download";

export default {
  name: "storageStatisticsOfFreezers",

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

    onSubmit() {
      // this.pager.currentPage = 1;
      this.queryTableList();
    },

    handleCurrentChange(val) {
      // this.pager.currentPage = val
      this.queryTableList();
    },

    handleSizeChange(val) {
      this.pager.pageSize = val
      this.queryTableList();
    },

    //获取列表数据
    async queryTableList() {
      let res = await searchCremationAppointmentDetail({...this.queryForm})
      const {data, code} = res;
      if (code !== 1) {
        this.$message('数据读取失败')
      } else {
        this.tableData = data.list;
        this.pager = data.pager
      }
    },

    exportExcelFun() {
      download.exportExcel(cremationAppointmentDetailExport, {...this.queryForm}, `火化预约报表${download.getDateTime()}.xlsx`);

    },


  }
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