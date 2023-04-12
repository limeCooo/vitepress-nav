# 完整页


> 注: 复制就完事了，全是坑



## 封装页面整页

```vue
<template>
  <div class="container-table">
    <SearchForm :submit-list="submitList" :searchFormData="searchFormData" @reset="queryReset"
                @search="onSubmit" @exportExcel="exportExcelFun"></SearchForm>

    <search-table
      :tableData="tableData"
      :tableHeadData="tableHeadData"
      :tableOption="tableOption"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @handleButton="handleButton">
      <template #enable="scope">
        <el-switch
          active-color="#239656"
          inactive-color="#e86161"
          v-model="scope.row.enable">
        </el-switch>
      </template>
    </search-table>

  </div>
</template>

<script>
import * as Type from '@/api/service'
import download from "@/api/download";
import SearchForm from "@/components/SearchForm/SearchForm.vue";
import searchTable from "@/components/searchTable.vue";


export default {
  name: "benefitSettlement",
  components: {
    SearchForm,
    searchTable,
  },
  data() {
    return {
      //search
      queryForm: {
        startDate: '',
        endDate: '',
      },
      pager: {
        pageSize: 20,
        total: 1,
        currentPage: 1
      },
      tableData:[],
      tableOption: {
        label: '操作',
        width: '',
        options: [
          {label: '操作', type: 'button', methods: 'edit'},
          {label: '', type: 'text', icon: 'el-icon-delete', methods: 'delete'},
        ]
      },
      tableHeadData: [
        {
          label: '序号',
          prop: 'rowNo',
          width: "60"
        }, {
          label: '火化日期',
          prop: 'cremationDate',
          width: "160"
        }, {
          label: '姓名',
          prop: 'deadName',
          width: "100"
        }, {
          label: '性别',
          prop: 'deadGender',
          width: "80"
        }, {
          label: '身份证号',
          prop: 'certificateNo',
          width: "170"
        }, {
          label: '户籍所在地',
          prop: 'householdRegistrationPlace',
          width: "180"
        }, {
          label: '普通设备遗体火化费',
          prop: 'charge',
          width: "160"
        }, {
          label: '骨灰盒费',
          prop: 'guhuihe',
          width: "120"
        }, {
          label: 'slot',
          type: 'slot',
          prop: 'slot',
          slotType: "enable"
        },
      ],


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
    };
  },
  created() {
    this.queryTableList();
  },
  mounted() {
    window.onresize = () => {
      let search = document.getElementsByClassName("search-wrap")[0].offsetHeight;
      let dom = document.getElementsByClassName("container-table")[0].offsetHeight;
      this.tableHeight = dom - search - 100;
    };
  },
  updated() {
    this.$nextTick(() => {
      let search = document.getElementsByClassName("search-wrap")[0].offsetHeight;
      let dom = document.getElementsByClassName("container-table")[0].offsetHeight;
      this.tableHeight = dom - search - 100;
    });
  },
  methods: {

    onSubmit(formData) {
      this.queryForm = formData;
      this.pager.currentPage = 1;
      this.queryTableList();
    },

    handleCurrentChange(val) {
      this.queryTableList();
    },

    handleSizeChange(val) {
      this.pager.pageSize = val
      this.queryTableList();
    },
    handleButton() {

    },

    // 获取列表数据的方法，调用searchCremationAppointmentDetail接口查询数据，更新tableData和pager
    async queryTableList() {
      try {
        const res = await searchCremationAppointmentDetail({...this.queryForm,...this.pager});
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
  }
};
</script>

<style scoped lang="scss">
.container-table {
  padding: 10px 20px 20px;
  height: 100%;

  .search-wrap {
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
