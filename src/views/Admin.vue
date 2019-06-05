<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <el-row :gutter="20" type="flex" justify="space-between">
                <el-col :span="6">
                    <h3 class="page-title">后台用户列表</h3>
                </el-col>
                <el-col >
                    <el-form :inline="true" :model="queryParams" class="demo-form-inline">
                        <el-form-item label="状态">
                            <el-select v-model="queryParams.status" placeholder="用户状态">
                                <el-option label="启用" value="1"></el-option>
                                <el-option label="禁用" value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="queryList">查询</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <div v-for="o in 4" :key="o" class="text item">
            {{'列表内容 ' + o }}
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "Admin",
        data(){
            return {
                queryParams:{
                    page:1,
                    size:10,
                    status:'',
                },
            };
        },
        methods:{
            queryList(){

            },
        },
    }
</script>

<style scoped>
    .page-title{
        height: 100%;
        line-height: 100%;
    }
</style>
