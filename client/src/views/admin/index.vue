<template>
    <el-container>
        <el-header>
            <el-menu
                class="el-menu-demo"
                mode="horizontal"
                background-color="#545c64"
                @select="handleSelect"
                text-color="#fff"
                active-text-color="#ffd04b"
            >
                <el-menu-item></el-menu-item>
            </el-menu>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b"
                    :collapse="isCollapse"
                    router
                >
                    <template v-for="(v,i) in admin">
                        <template v-if="v.children">
                            <el-submenu :index="''+i" :key="i">
                                <template slot="title">
                                    <i :class="['el-icon-iconfont',v.icon]"></i>
                                    <span>{{v.title}}</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item
                                        v-for="(e,k) in v.children"
                                        :key="k"
                                        :index="i+'-'+k"
                                        :route="{path:'/admin/'+v.path+'/'+e.path}"
                                    >{{e.title}}</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </template>
                        <template v-else>
                            <el-menu-item :index="''+i" :key="i" :route="{path:'/admin/'+v.path}">
                                <i :class="['el-icon-iconfont',v.icon]"></i>
                                <span slot="title">{{v.title}}</span>
                            </el-menu-item>
                        </template>
                    </template>
                </el-menu>
            </el-aside>
            <el-main v-loading="isLoading">
                <el-row>
                    <el-col>
                        <router-view />
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import admin from "../../router/admin";
import { mapState } from "vuex";
export default {
    components: {},
    data() {
        return {
            isCollapse: false,
            admin,
            router: [
                {
                    icon: "icon-home",
                    path: "/home",
                    name: "管理仪表板",
                    children: [
                        { path: "abc", name: "abc" },
                        { path: "abc", name: "abc" },
                        { path: "abc", name: "abc" }
                    ]
                },
                {
                    icon: "icon-home",
                    path: "/home",
                    name: "管理仪表板",
                    children: [
                        { path: "abc", name: "abc" },
                        { path: "abc", name: "abc" },
                        { path: "abc", name: "abc" }
                    ]
                },
                {
                    icon: "icon-home",
                    path: "/home",
                    name: "管理仪表板",
                    children: [
                        { path: "abc", name: "abc" },
                        { path: "abc", name: "abc" },
                        { path: "abc", name: "abc" }
                    ]
                },
                {
                    icon: "icon-home",
                    path: "/home",
                    name: "管理仪表板"
                }
            ]
        };
    },
    computed: {
        ...mapState(["isLoading"])
    },
    methods: {
        handleOpen(a) {
            console.log(a);
            console.log(admin);
        },
        handleClose(a) {
            console.log(a);
        },
        handleSelect(a, b) {
            console.log(a, b);
        }
    }
};
</script>

<style lang='less'>
.el-header {
    padding: 0;
}
.el-container {
    height: 100vh;
    .el-aside,
    .el-aside .el-menu {
        height: 100%;
    }

    .el-submenu .el-menu-item {
        min-width: auto;
    }
    .el-main {
        border-radius: 6px;
        background: #fff;
        padding: 0;
        margin: 10px;
        overflow-y: auto;
    }
}
</style>