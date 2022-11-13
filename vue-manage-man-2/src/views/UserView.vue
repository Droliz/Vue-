<template>
  <div class="manage">
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="handleClose">

      <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="true">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age" sortable>
          <el-input v-model.number="form.age" placeholder="请输入年龄"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth" sortable>
          <el-date-picker
              v-model="form.birth"
              placeholder="请输入出生日期"
              type="date"
              value-format="yyyy-MM-DD">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <div class="manage-header">
      <el-button @click="handleAdd" type="primary">
        + 新增
      </el-button>

      <div class="search-input">
        <el-form :model="userForm" inline>
          <el-form-item>
            <el-input placeholder="请输入名称" v-model="userForm.name"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                icon="el-icon-search"
                type="primary"
                @click="searchName"
                circle>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="common-table">
      <el-table
          :data="tableData"
          stripe
          height="95%"
          style="width: 100%">
        <el-table-column
            prop="name"
            label="姓名"
            width="80">
        </el-table-column>
        <el-table-column
            prop="age"
            label="年龄"
            width="80">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="80">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex ? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column
            prop="birth"
            label="出生日期"
            width="180">
        </el-table-column>
        <el-table-column
            prop="addr"
            label="地址">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pager">
        <el-pagination
            layout="prev, pager, next"
            :total="total"
            :page-size="pageData.limit"
            @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
    
  </div>
</template>

<script>
import {getUser, delUser, editUser, addUser} from "@/api";

export default {
  name: "UserView",
  data() {
    return {
      dialogVisible: false,
      form: {
        name: '',
        age: '',
        sex: '',
        birth: '',
        addr: ''
      },
      rules: {
        name: [
          {required: true, message: "请输入姓名"}
        ],
        age: [
          {required: true, message: "请输入年龄"},
          {type: 'number', message: '年龄必须为数字值'}
        ],
        sex: [
          {required: true, message: "请选择性别"}
        ],
        birth: [
          {required: true, message: "请选择出生日期"}
        ],
        addr: [
          {required: true, message: "请输入地址"}
        ],
      },
      tableData: [],
      modalType: 0,    // 0 通过新增点击的   1 通过编辑点击
      total: 0,
      pageData: {
        page: 1,
        limit: 20
      },
      userForm: {
        name: ""
      }
    };
  },
  methods: {
    handleAdd() {
      this.dialogVisible = true
      this.modalType = 0
    },
    handleClose(done) {
      this.$refs.form.resetFields()
      done();
    },
    submit() {
      this.$refs.form.validate((val) => {
        if (val) {
          if (this.modalType) {
            editUser(this.form).then(() => {
              this.getList()
            })
          } else {
            addUser(this.form).then(() => {
              this.getList()
            })
          }
          this.close()
        }
      })
    },
    close() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    handleEdit(row) {
      this.modalType = 1
      this.dialogVisible = true
      this.form = JSON.parse(JSON.stringify(row))
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delUser({id: row.id}).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
          console.log(this.tableData)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    getList() {
      getUser({params: {...this.pageData, ...this.userForm}}).then(({data}) => {
        this.tableData = data.list
        this.total = data.count || 0
      })
    },
    handlePage(page) {
      // console.log(page)
      this.pageData.page = page
      this.getList()
    },
    searchName() {
      this.getList()
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped lang="less">
.manage {
  height: 95%;

  .manage-header {
    height: 5%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .search-input {
      display: flex;
      font-size: 24px;
    }
  }

  .common-table {
    height: calc(100% - 62px);
    position: relative;

    .pager {
      right: 20px;
      bottom: 0;
      position: absolute;
    }
  }
}
</style>