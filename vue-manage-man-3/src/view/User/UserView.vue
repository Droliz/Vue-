<template>
    <div class="manage">

        <el-dialog v-model="dialogVisible" title="新增" width="50%" :before-close="handleClose">
            <el-form ref="formRef" inline :model="form" :rules="rules" label-width="80px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="年龄" prop="age" sortable>
                            <el-input v-model.number="form.age" placeholder="请输入年龄"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="性别" prop="sex">
                            <el-select v-model="form.sex" placeholder="请选择">
                                <el-option label="男" :value="1"></el-option>
                                <el-option label="女" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="出生日期" prop="birth" sortable>
                            <el-date-picker v-model="form.birth" placeholder="请输入出生日期" type="date"
                                value-format="yyyy-MM-DD">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-form-item label="地址" prop="addr">
                        <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
                    </el-form-item>
                </el-row>

            </el-form>

            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="close">Cancel</el-button>
                    <el-button type="primary" @click="onSubmit">submit</el-button>
                </span>
            </template>
        </el-dialog>

        <div class="manage-header">
            <el-button @click="handleAdd" type="primary">
                + 新增
            </el-button>

            <div class="search-input">
                <el-form :model="userForm" inline>
                    <el-form-item>
                        <el-input placeholder="请输入名称" v-model.trim="userForm.keyword"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchName" circle>
                            <el-icon style="vertical-align: middle">
                                <Search />
                            </el-icon>
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>

        <div class="common-table">
            <el-table :data="tableData" stripe style="width: 100%">
                <el-table-column prop="name" label="姓名" width="100">
                </el-table-column>
                <el-table-column prop="age" label="年龄" width="100">
                </el-table-column>
                <el-table-column prop="sex" label="性别" width="100">
                    <template #default="scope">
                        <el-tag style="margin-left: 10px">{{ scope.row.sex ? '男' : '女' }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="birth" label="出生日期">
                </el-table-column>
                <el-table-column prop="addr" label="地址">
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div class="pager">
            <el-pagination hide-on-single-page background layout="prev, pager, next" :total="total"
                :page-size="pageData.limit" @current-change="handlePage">
            </el-pagination>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { getUser, delUser, editUser, addUser } from "@/api";

const formRef = ref()
const dialogVisible = ref(false)
const modalType = ref(0)    // 0 通过新增点击的   1 通过编辑点击
const form = reactive({
    name: '',
    age: '',
    sex: '',
    birth: '',
    addr: '',
    id: ''
})

const total = ref(0)

const pageData = reactive({
    page: 1,
    limit: 20
})

const userForm = reactive({
    keyword: ""
})

let tableData = ref([])

const rules = {
    name: [
        { required: true, message: "请输入姓名" }
    ],
    age: [
        { required: true, message: "请输入年龄" },
        { type: 'number', message: '年龄必须为数字值' }
    ],
    sex: [
        { required: true, message: "请选择性别" }
    ],
    birth: [
        { required: true, message: "请选择出生日期" }
    ],
    addr: [
        { required: true, message: "请输入地址" }
    ],
}

function close() {
    console.log("close");
    formRef.value.resetFields()
    dialogVisible.value = false
}

function getList() {
    getUser({ params: { ...pageData, ...userForm } }).then(({ data }) => {
        // console.log(data.list);
        tableData.value = data.list
        total.value = data.count || 0
    })
}

function searchName() {
    getList()
}

function onSubmit() {
    formRef.value.validate(val => {
        if (val) {
            if (modalType) {
                console.log(form);
                editUser(form).then(() => {
                    getList()
                })
            } else {
                addUser(form).then(() =>
                    getList()
                )
            }
            close()
        }
    })
}

const handleEdit = (row) => {
    modalType.value = 1
    dialogVisible.value = true
    const data = JSON.parse(JSON.stringify(row))
    form.name = data.name
    form.age = data.age
    form.addr = data.addr
    form.birth = data.birth
    form.sex = data.sex
    form.id = data.id
}

const handleDelete = (row) => {
    ElMessageBox.confirm(
        '此操作将永久删除该信息, 是否继续?',
        '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    }).then(() => {
        delUser({ id: row.id }).then(() => {
            ElMessage({
                type: 'success',
                message: '删除成功',
            })
            getList()
        })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: "已取消删除"
        })
    })
}

const handlePage = (page) => {
    // console.log(page)
    pageData.page = page
    getList()
}

const handleClose = done => {
    formRef.value.resetFields()
    done();
}

const handleAdd = () => {
    dialogVisible.value = true
    modalType.value = 0
}

onMounted(() => {
    getList();
})

</script>

<style scoped lang="less">
.dialog-footer button:first-child {
    margin-right: 10px;
}

.manage {
    height: 100%;

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

    .pager {
        height: 48px;
        margin: 10px 10px;
        display: flex;
        flex-direction: row-reverse;
    }
}
</style>