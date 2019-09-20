<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <h3 class="page-title">角色列表</h3>
            </div>
            <div>
                <el-row :gutter="20">
                    <el-col :span="10" :offset="6">
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

                </el-row>
                <br>
                <el-row>
                    <el-col :span="10" :offset="6">
                        <el-card class="box-card">
                            <el-row  v-for = "(item,index) in privilegeData" :key="index">
                                <el-checkbox-group v-model="privilegeGroup[index]" @change="handleCheckedPrivilegeChange(index,privilegeGroup[index])">
                                    <el-checkbox :label="item.code">{{item.name}}</el-checkbox>
                                    <br>
                                    <el-checkbox v-for = "(childItem,childIndex) in item.children" :key="childIndex" :label="childItem.code" :disabled="checkAble[index]">
                                        {{childItem.name}}
                                    </el-checkbox>
                                </el-checkbox-group>
                                <br>
                            </el-row>
                            <el-row>
                                <el-col :span="8" :offset="16">
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
    import Vue from 'vue';
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
                checkAble:[],
                //所有权限菜单数据
                privilegeData: [],
                //当前角色的权限
                rolePrivilege: [],
                //当前角色id
                currentRoleId: 0,
                privilegeGroup:[],
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
                    for (let i = 0;i < this.privilegeData.length;i++ ){
                        this.privilegeGroup[i] = [];
                        this.checkAble[i] = true;
                    }
                })
            },
            handleCurrentRowChange(val) {
                this.currentRoleId = 0;
                this.rolePrivilege = [];
                for (let i in this.privilegeGroup){
                    Vue.set(this.privilegeGroup,i,[]);
                }
                api.role.show(val.id).then(response => {
                    this.rolePrivilege = response.data.data.rolePrivileges;
                    for (let i in this.rolePrivilege){
                        for( let j in this.privilegeData){
                            if(this.rolePrivilege[i].code === this.privilegeData[j].code){
                                let rolePriGroup = [];
                                rolePriGroup.push(this.rolePrivilege[i].code);
                                if(this.rolePrivilege[i].children){
                                    for (let k in this.rolePrivilege[i].children){
                                        rolePriGroup.push(this.rolePrivilege[i].children[k].code);
                                    }
                                }
                                Vue.set(this.privilegeGroup,j,rolePriGroup);
                                this.handleCheckedPrivilegeChange(j,this.privilegeGroup[j])
                            }

                        }
                    }
                });
                this.currentRoleId = val.id;
            },
            handleSizeChange(size) {
                this.queryParams.size = size;
                this.queryRoleIndex();
            },
            handleCurrentPageChange(page) {
                this.queryParams.page = page;
                this.queryRoleIndex();
            },
            updateRolePrivilege() {
                if(this.currentRoleId === 0){
                    this.$message.warning('请选择角色');
                    return false;
                }
                let temp = [];
                for (let i in this.privilegeGroup){
                    temp = temp.concat(this.privilegeGroup[i]);
                }
                api.role.updatePri(this.currentRoleId,temp).then(response=>{
                    this.$message.success('修改成功');
                }).catch(err=>{
                    this.$message.error('修改失败');

                });
            },
            handleCheckedPrivilegeChange(index,val){
                if(val.length === 1){
                    if(this.privilegeData[index].code === val[0]){
                        Vue.set(this.checkAble,index,false);
                    }else{
                        Vue.set(this.privilegeGroup,index,[]);
                        Vue.set(this.checkAble,index,true);
                    }
                }
                if(val.length === 0){
                    Vue.set(this.checkAble,index,true);
                }
                if(val.length > 1){
                    if(val.indexOf(this.privilegeData[index].code) === -1){
                        Vue.set(this.privilegeGroup,index,[]);
                        Vue.set(this.checkAble,index,true);
                    }else{
                        Vue.set(this.checkAble,index,false);
                    }
                }
            },
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
