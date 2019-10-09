<template>
  <div class="login">
    <el-form
      :model="form"
      label-position="right"
      :rules="rules"
      @keyup.enter.native="onSubmit"
      status-icon
      ref="form"
    >
      <el-form-item label="账号：" prop="name">
        <el-input v-model="form.name" clearable />
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input show-password v-model="form.password" clearable />
      </el-form-item>
      <el-form-item>
        <el-button @click="onSubmit">登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>  
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        password: ""
      },
      rules: {
        name: { required: true, message: "不能为空" },
        password: { required: true, message: "不能为空" }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs["form"].validate(async bool => {
        if (bool) {
          let result = await this.$http({
            url: "public/login",
            method: "post",
            data: this.form
          });
          if (result && result.code == 200) {
            this.$store.commit("setUserInfo", result.content.data);
            if (this.$route.params.redirect) {
              this.$router.replace({
                path: "/" + this.$route.params.redirect
              });
            } else {
              this.$router.replace({
                path: "/admin"
              });
            }
          }
        }
      });
    }
  }
};
</script> 
<style lang="less" scoped>
.login {
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .el-form {
    width: 360px;
    box-shadow: 0 0 20px #eee;
    border-radius: 6px;
    padding: 20px;
  }
}
</style>  