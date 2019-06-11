<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3 class="page-title">角色列表</h3>
            </div>
            <div>
                <el-row :gutter="20">
                    <el-col :span="8"  :offset="2">
                        <el-card class="box-card">
                            <el-table
                                    border
                                    :data="roleIndexData.list"
                                    style="width: 100%;"
                                    highlight-current-row
                                    @current-change="handleCurrentRowChange"
                            >
                                <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <el-card class="box-card" v-if="props.row.admins.length > 0">
                                            <el-table
                                                    :data="props.row.admins"
                                                    style="width: 100%"
                                                    height="250">
                                                <el-table-column
                                                        fixed
                                                        prop="name"
                                                        label="名称"
                                                >
                                                </el-table-column>
                                                <el-table-column
                                                        prop="account"
                                                        label="账号"
                                                >
                                                </el-table-column>
                                            </el-table>
                                            <!--<div v-for="admin in props.row.admins" :key="admin.key" class="text item">-->
                                            <!--{{'名称：' + admin.name }}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{'账号：' + admin.account }}-->
                                            <!--</div>-->
                                        </el-card>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        label="角色ID"
                                        prop="id"
                                        width="100px">
                                </el-table-column>
                                <el-table-column
                                        label="角色名称"
                                        prop="name">
                                </el-table-column>
                            </el-table>
                            <div class="page-block">
                                <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentPageChange"
                                        :current-page="this.queryParams.page"
                                        :page-sizes="[10, 20, 50, 100]"
                                        :page-size="this.queryParams.size"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="this.roleIndexData.total">
                                </el-pagination>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="6"  :offset="2">
                        <el-card class="box-card">
                            <el-tree
                                    :data="privilegeData"
                                    show-checkbox
                                    default-expand-all
                                    node-key="code"
                                    ref="tree"
                                    highlight-current
                                    :props="defaultProps"
                                    style="margin-left: 100px;">
                            </el-tree>
                            <el-row>
                                <el-col :span="8"  :offset="16">
                                    <el-button type="primary" @click="updateRolePrivilege">保存角色权限</el-button>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
    import api from '@/apis/index';

    export default {
        name: "Role",
        data() {
            return {
                //角色列表
                queryParams: {
                    page: 1,
                    size: 10,
                    with: 'admins'
                },
                //列表数据
                roleIndexData: {
                    list: [],
                    total: 0,
                },
                //节点名称
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                //所有权限菜单数据
                privilegeData: [],
                //当前角色的权限
                rolePrivilege: [],
                //当前角色id
                currentRoleId:0,
            }
        },
        methods: {
            queryRoleIndex() {
                api.role.index(this.queryParams).then(response => {
                    this.roleIndexData = response.data.data;
                })
            },
            queryPrivilegeIndex() {
                api.privilege.index().then(response => {
                    this.privilegeData = response.data.data;
                })
            },
            handleCurrentRowChange(val) {
                this.currentRoleId = 0;
                this.rolePrivilege = [];
                api.role.show(val.id).then(response => {
                    this.rolePrivilege = response.data.data.privileges;
                    this.$refs.tree.setCheckedNodes(this.rolePrivilege)
                })
                this.currentRoleId = val.id;
            },
            handleSizeChange(size){
                this.queryParams.size = size;
                this.queryRoleIndex();
            },
            handleCurrentPageChange(page){
                this.queryParams.page = page;
                this.queryRoleIndex();
            },
            updateRolePrivilege(){
                if(this.currentRoleId == 0){
                    this.$message.warning('请选择角色');
                    return false;
                }
                console.log('keys 获取');
                console.log(this.$refs.tree.getCheckedKeys());
                console.log('nodes 获取');
                console.log(this.$refs.tree.getCheckedNodes());
            }
        },
        mounted() {
            this.queryRoleIndex();
            this.queryPrivilegeIndex();
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
