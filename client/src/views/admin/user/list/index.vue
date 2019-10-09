<template>
    <el-row>
        <el-col>title</el-col>
        <el-col>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" class="demo-table-expand">
                            <el-form-item label="名称">
                                <span>{{ props.row.name }}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="昵称" prop="userName"></el-table-column>
                <el-table-column label="账户名" prop="name"></el-table-column>
                <el-table-column label="联系方式" prop="phone"></el-table-column>
                <el-table-column label="性别" prop="sex" :formatter="_Sex"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
    </el-row>
</template>
<script>
const Request = {
    url: "manage/user",
    method: "get",
    data: "",
    params: ""
};
export default {
    data() {
        return {
            tableData: [],
            request: JSON.parse(JSON.stringify(Request))
        };
    },
    mounted() {
        this.$store.commit("setLoading", false);
    },
    created() {
        this.init();
    },
    methods: {
        async init() {
            this.$http({
                url: "manage/user",
                method: "get",
            })
                .then(e => {
                    if (e.code == 200) {
                        this.tableData = e.content.data;
                    }
                    console.log(e.content.data);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        handleEdit(i, e) {
            console.log(i, e);
        },
        async handleDelete(i, e) {
            let result = await this.$http({
                url:"manage/user",
                method:'delete',
                params:{
                    id:e.id
                }
            });
            if(result && result.data.code == 200){
                this.$message.succress(result.content.message);
            }
        },
        onRequest() {},
        _Sex(row, column, cellValue, index) {
            return ["未知", "男", "女"][row.sex];
        }
    }
};
</script> 
<style lang="less" scoped>
.user {
    background: #fff;
}
</style>  