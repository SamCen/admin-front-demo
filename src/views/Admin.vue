<template>
    <div>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <h3 class="page-title">后台用户列表</h3>
        </div>
        <div>
            <el-row :gutter="20" type="flex" justify="space-between">
                <el-col>
                    <el-form :inline="true" :model="queryParams" class="demo-form-inline" label-width="100px">
                        <el-form-item label="账号">
                            <el-input v-model="queryParams.account" placeholder="账号"></el-input>
                        </el-form-item>
                        <el-form-item label="状态">
                            <el-select v-model="queryParams.status" placeholder="用户状态">
                                <el-option label="启用" value="1"></el-option>
                                <el-option label="禁用" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="queryIndex">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
            <el-row>
                <el-table
                        :data="indexData.list"
                        stripe
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="ID"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="account"
                            label="账号"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="name"
                            label="姓名"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="last_login_ip"
                            label="上次登录ip"
                    >
                    </el-table-column>
                    <el-table-column
                            label="状态">
                        <template slot-scope="scope">
                            {{scope.row.status ? '启用':'禁用'}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            label="操作">
                        <template slot-scope="scope">
                            <i class="el-icon-edit-outline" @click="showAction(scope.row.id)"></i>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page-block">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="this.queryParams.page"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="this.queryParams.size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="this.indexData.total">
                    </el-pagination>
                </div>
            </el-row>
        </div>
    </el-card>
    <!--详情对话框-->
    <el-dialog
            title=""
            :visible.sync="showDialogVisible"
            width="30%"
            :before-close="showHandleClose">
        <el-form :model="showData" ref="showForm" label-width="100px" >
            <el-form-item label="名称" prop="name">
                <el-input v-model="showData.name"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="account">
                <el-input v-model="showData.account"></el-input>
            </el-form-item>
            <el-form-item label="上次登录时间" prop="last_login_ip">
                <el-input v-model="showData.last_login_ip"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="showDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="showDialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
    </div>
</template>

<script>
    import api from '@/apis/index';

    export default {
        name: "Admin",
        data() {
            return {
                //列表加载
                indexLoading: false,
                //列表请求参数
                queryParams: {
                    page: 1,
                    size: 10,
                    status: '',
                    account: '',
                },
                //列表数据
                indexData: {
                    list: [],
                    total: 0,
                },
                //详情数据
                showData: {
                    id: '',
                    name: '',
                    account: '',
                    last_login_ip: '',
                    status: '',
                    roles: [],
                },
                //详情对话框隐藏状态
                showDialogVisible: false,

            };
        },
        methods: {
            /**
             * 列表请求
             */
            queryIndex() {
                this.indexLoading = true;
                api.user.index(this.queryParams).then(response => {
                    this.indexData = response.data.data;
                    this.indexLoading = false;
                }).catch(error => {
                    this.$message('网络异常');
                    this.indexLoading = false;
                })
            },
            /**
             * 改变每页数量
             * @param size
             */
            handleSizeChange(size) {
                this.queryParams.size = size;
                this.queryIndex();
            },
            /**
             * 改变当前页
             * @param size
             */
            handleCurrentChange(size) {
                this.queryParams.page = size;
                this.queryIndex();
            },
            /**
             * 点击编辑按钮
             * @param id
             */
            showAction(id) {
                api.user.show(id).then(response => {
                    this.showData = response.data.data;
                    this.showDialogVisible = true;
                })
            },
            /**
             * 关闭详情对话框
             */
            showHandleClose() {
                this.showDialogVisible = false;
            },
        },
        mounted() {
            this.queryIndex();
        }
    }
</script>

<style scoped>
    .page-title {
        margin-top: 10px;
    }

    .page-block {
        margin-top: 10px;
    }
</style>
