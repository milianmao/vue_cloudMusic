<template>
  <el-dialog :visible.sync="showLoginDialog" width="30%">
    <div>
      <!-- 登录图片  -->
      <img src="../assets/icon/phone.png" />
      <!-- 登录表单 -->
      <el-form ref="loginRef" :model="loginForm" :rules="loginFormRules">
        <el-form-item prop="phone">
          <el-input
            v-model="loginForm.phone"
            prefix-icon="el-icon-user"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 登录按钮 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="login()">确 定</el-button>
      </span>
    </div>
  </el-dialog>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
  data() {
    //手机号效验
    var cheakPhone = (rule, value, callback) => {
      if (!/^1[3456789]\d{9}$/.test(value)) {
        return callback(new Error("请输入正确的手机号"));
      } else {
        callback();
      }
    };
    return {
      showLoginDialog: false,
      loginForm: {
        phone: "",
        password: "",
      },
      loginFormRules: {
        phone: [{ validator: cheakPhone, trigger: "blur" }],
      },
    };
  },
  created() {},
  methods: {
      ...mapMutations(['getUserInfo']),
    login() {
      this.$refs.loginRef.validate(async (valid) => {
        if (!valid) return;
        const res = await this.$http.get("login/cellphone", {
          params: this.loginForm,
        })
        // console.log(res);
        if (res.status !== 200)
          return this.$message.error("登录失败,账号或密码错误")
        //保存cookie的信息
        window.localStorage.setItem("musicCookie", res.data.cookie);
        //保存用户信息  
        window.localStorage.setItem(
          "UserInfo",
          JSON.stringify(res.data.profile)
        )
        // console.log(window.localStorage);
        //将用户信息保存在全局vuex中
        this.$store.commit('getUserInfo',res.data.profile)
        let status = this.$store.dispatch('getUserPlayList',this.$store.state.UserInfo.userId)
        if(!status){
            this.$message.error("获取歌单失败")
        }
        //刷新歌单

            this.$emit('refreshshPlayList')
        })
        this.showLoginDialog = false
    },
  },
};
</script>
<style lang="less" scoped>
.el-dialog {
  img {
    display: block;
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
}
.el-form {
  margin-top: 25px;
  .el-input {
    display: block;
    width: 70%;
    margin: 0 auto;
  }
}
/deep/ .el-form .el-form-item__error {
  left: 18%;
}
.el-button {
  background-color: red;
  width: 60%;
  display: block;
  margin: 0 auto;
}
</style>
