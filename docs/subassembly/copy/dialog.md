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
## Script 
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
    showFormDialog(type, row) {
      if (type === 'edit') {
        this.form = {...row}
      }
      this.formDialogVisible = true
    },
    resetForm() {
      // 清空表单数据
      this.$refs.form.resetFields()
      this.form = {
        smsTitle: '',
        smsContent: '',
      }
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // 调用保存方法
          // this.saveSmsInfo()
        } else {
          // 校验失败，不提交表单数据
          return false
        }
      })
    },

  },
}

</script>
```
## 保存方法/删除方法
```vue
<script >
  export default {
    methods:{
      async saveSmsInfo() {
        try {
          const { code, data, message } = await saveSms({ ...this.form });
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
          let {code, data, message} = await API.deleteSms({id, version})
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

    }
  }
</script>



```
