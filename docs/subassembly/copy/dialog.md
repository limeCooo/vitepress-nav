# dialog快捷复制页


## 弹窗复制页

```vue
 <el-dialog
  title="添加/修改"
  :visible.sync="formDialogVisible"
  :close-on-click-modal="false"
  :show-close="false"
  width="50%"
  @close="resetForm"
>
<el-form :model="paramsForm" :rules="rules" ref="form" label-width="100px">
  <el-form-item label="模板名称" prop="smsTitle">
    <el-input v-model="paramsForm.smsTitle"></el-input>
  </el-form-item>
  <el-form-item label="短信内容" prop="smsContent">
    <el-input v-model="paramsForm.smsContent" type="textarea" :autosize="{ minRows: 6, maxRows: 12}"></el-input>
  </el-form-item>
</el-form>
<div slot="footer">
  <el-button @click="formDialogVisible = false">取消</el-button>
  <el-button type="primary" @click="submitForm">保存</el-button>
</div>
</el-dialog>

```
## data 
```vue

<script>
export default {
  data(){
    return{
      formDialogVisible: false,

      paramsForm: {
        smsTitle: '',
        smsContent: '',
      },
      rules: {
        smsTitle: [
          {required: true, message: '请输入模板名称', trigger: 'blur'},
        ],
        smsContent: [
          {required: true, message: '请输入短信内容', trigger: 'blur'},
        ],
      },
    }
  },
  methods:{
    

  },
}

</script>
```
## Script 保存方法/删除方法
```js
showFormDialog(type, row) {
  if (type === 'edit') {
    this.paramsForm = {...row}
  }
  this.formDialogVisible = true
},
resetForm() {
  // 清空表单数据
  this.$refs.paramsForm.resetFields()
  this.paramsForm = {
    smsTitle: '',
    smsContent: '',
  }
},
submitForm() {
  this.$refs.paramsForm.validate(valid => {
    if (valid) {
      // 调用保存方法
      // this.saveSmsInfo()
    } else {
      // 校验失败，不提交表单数据
      return false
    }
  })
},
async saveSmsInfo() {
  try {
    const { code, data, message } = await saveSms({ ...this.paramsForm });
    if (code !== 1) {
      this.$message(message);
    } else {
      this.$message.success(data);
      this.formDialogVisible = false;
      // 调用查询方法
      // await this.queryTableList();
    }
  } catch (error) {
    console.error(error);
    this.$message.error('保存短信信息失败');
  }
},
async deleteClick({id, version}) {
  try {
    await this.$confirm('您确定要删除此条数据吗', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
    })
    let {code, data, message} = await deleteSms({id, version})
    if (code !== 1) {
      this.$message(message)
    }else{
      this.$message.success(data)
      await this.queryTableList()
    }
  } catch (err) {
    console.log(err)
  }

}




```
## 完整代码
```vue
<template>
  <div class="container-table">
    <div class="search-wrap">
      <el-form
        :model="queryForm"
        :inline="true"
        ref="queryForm"
        label-width="120px"
      >
        <el-form-item>
          <el-button type="primary" @click="onSubmit('search')">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="showFormDialog('add')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrap">
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
        <el-table-column label="模板名称" align='center' prop="smsTitle" width="200"></el-table-column>
        <el-table-column label="短信内容" align="center" prop="smsContent" width=""></el-table-column>
        <el-table-column label="数据版本号" align='center' prop="version" width="200"></el-table-column>
        <el-table-column label="是否启用" align='center' prop="asSend" width="100">
          <template slot-scope="scope">
            {{ scope.row.asSend === 0 ? '关闭' : '启用' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click.native.prevent="showFormDialog('edit',scope.row)">修改
            </el-button>
            <el-button type="danger" size="small" @click.native.prevent="deleteClick(scope.row)">删除</el-button>
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
          @size-change="handleSizeChange"
          :total="pager.total"
          @current-change="handleCurrentChange">
        </el-pagination>
      </el-row>
    </div>
    <el-dialog
      title="添加/修改"
      :visible.sync="formDialogVisible"
      :close-on-click-modal="false"
      :show-close="false"
      width="50%"
      @close="resetForm"
    >
      <el-form :model="paramsForm" :rules="rules" ref="paramsForm" label-width="100px">
        <el-form-item label="模板名称" prop="smsTitle">
          <el-input v-model="paramsForm.smsTitle" placeholder="请输入模板名称"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" prop="asSend">
          <el-select v-model="paramsForm.asSend">
            <el-option label="关闭" :value="0"/>
            <el-option label="启用" :value="1"/>
          </el-select>
        </el-form-item>
        <el-form-item label="短信内容" prop="smsContent">
          <el-input v-model="paramsForm.smsContent" placeholder="请输入短信内容" type="textarea"
                    :autosize="{ minRows: 6, maxRows: 12}"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="formDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import * as API from '@/api/configuration'

export default {
  name: "smsManagement",
  components: {},
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
      //search end
      //  table
      tableData: [],
      tableHeight: 0,

      paramsForm: {
        smsTitle: '',
        smsContent: '',
        asSend: 0,
      },
      rules: {
        smsTitle: [
          {required: true, message: '请输入模板名称', trigger: 'blur'},
        ],
        asSend: [
          {required: true, message: '请选择', trigger: 'blur'},
        ],
        smsContent: [
          {required: true, message: '请输入短信内容', trigger: 'blur'},
        ],
      },
      formDialogVisible: false,
    };
  },
  created() {
    this.queryTableList();
  },
  mounted() {
    window.onresize = () => {
      const searchHeight = document.querySelector(".search-wrap").offsetHeight;
      const containerHeight = document.querySelector(".container-table").offsetHeight;
      this.tableHeight = containerHeight - searchHeight - 200;
    };
  },
  updated() {
    this.$nextTick(() => {
      const searchHeight = document.querySelector(".search-wrap").offsetHeight;
      const containerHeight = document.querySelector(".container-table").offsetHeight;
      this.tableHeight = containerHeight - searchHeight - 200;
    });
  },
  methods: {

    // 点击查询按钮时触发，调用queryTableList方法获取列表数据
    onSubmit(type) {
      this.queryTableList(type);
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
    async queryTableList(type) {
      if(type ==='search'){
        this.pager.currentPage = 1
      }
      try {
        const res = await search({...this.queryForm});
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
    showFormDialog(type, row) {
      if (type === 'edit') {
        this.paramsForm = {...row}
      }
      this.formDialogVisible = true
    },
    resetForm() {
      // 清空表单数据
      this.$refs.paramsForm.resetFields()
      this.form = this.$options.data().paramsForm

    },
    submitForm() {
      this.$refs.paramsForm.validate(valid => {
        if (valid) {
          this.saveSmsInfo()
        } else {
          // 校验失败，不提交表单数据
          return false
        }
      })
    },
    async saveSmsInfo() {
      try {
        const {code, data, message} = await saveSms({...this.paramsForm});
        if (code !== 1) {
          this.$message(message);
        } else {
          this.$message.success(data);
          this.formDialogVisible = false;
          await this.queryTableList();
        }
      } catch (error) {
        console.error(error);
        this.$message.error('保存短信信息失败');
      }
    },

    async deleteClick({id, version}) {
      try {
        await this.$confirm('您确定要删除此条数据吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
        let {code, data, message} = await deleteSms({id, version})
        if (code !== 1) {
          this.$message(message)
        } else {
          this.$message.success(data)
          await this.queryTableList()
        }
      } catch (err) {
        console.log(err)
      }
    }

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
