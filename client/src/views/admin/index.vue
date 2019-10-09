<template>
  <el-container>
    <el-header height="40px">
      <el-row type="flex" justify="space-between">
        <el-col :span="2"></el-col>
        <el-col :span="2" class="header-link">
          <el-button size="mini" @click.stop="onLogout">退出登录</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="160px">
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
    },
    onLogout() {
      sessionStorage.clear();
      localStorage.clear();
      this.$http.get("public/login").then(e => {
        this.$router.push({ path: "/login" });
      });
    }
  }
};
</script>

<style lang='less'>
.el-header {
  padding: 0;
  background: #545c64;
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  .header-link {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
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