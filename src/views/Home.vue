<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <!-- logo区域 -->
      <div class="logo">
        <div class="logo-container">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-wangyiyunyinle"></use>
          </svg>
        </div>
        <div class="logo-name"><span>网易云音乐</span></div>
      </div>
      <!-- 搜索区域 -->
      <div class="serch">
        <el-input
          placeholder="请输入内容"
          suffix-icon="el-icon-search"
          size="medium"
          class="myinput"
          v-model="serchContent"
        >
        </el-input>
      </div>
      <!-- 登录区域 -->
      <!-- 头像区域 -->
      <div class="login">
        <div class="avatar">
          <img :src="avatarUrl" />
        </div>
        <span @click="openLoginDialog()">{{ username }}</span>
      </div>
      <Login @refreshshPlayList="refreshshPlayList" ref="login"/>
    </el-header>
    <el-container>
      <!-- 歌曲侧边栏 -->
      <AsideNav ref="aside" :style="defaultHeight"/>
          
      <el-container>
        <!-- 主要页面 -->
        <el-main :style="defaultHeight">
          <router-view :userInfo="userInfo"></router-view>
        </el-main>
      </el-container>
    </el-container>
           <!-- 音乐控制 -->
    <el-footer>Footer</el-footer>
  </el-container>
</template>
<script>
import AsideNav from "../components/aside.vue";
import Login from '../components/Login.vue'
export default {
  components: {
    AsideNav,
    Login
  },
  data() {
    return {
      serchContent: "",
      avatarUrl: require("../assets/icon/avatar.png"),
      username: "未登录",
      userInfo:[],
      defaultHeight:{
        height:''
      }
    };
  },
  created() {
    window.addEventListener("resize", this.getHeight);
    this.getHeight();
    if(localStorage.UserInfo!==0){
    this.userInfo=JSON.parse(localStorage.UserInfo)
    this.avatarUrl = this.userInfo.avatarUrl
    this.username = this.userInfo.nickname
    }
  },
  methods: {
    getHeight(){
      this.defaultHeight.height = window.innerHeight - 120 +'px';
    },
    openLoginDialog(){
     this.$refs.login.showLoginDialog = true
    },
    refreshshPlayList(){
        this.$refs.aside.getPlayList()
        this.rerefreshavatar()
    },
    rerefreshavatar(){
      this.userInfo= this.$store.state.UserInfo
      this.avatarUrl = this.userInfo.avatarUrl
      this.username = this.userInfo.nickname
    }
  }
};
</script>
<style lang="less" scoped>
.el-container {
  height: 100%;
  position: relative;
}
.el-header {
  position: relative;
  background-color: #c62f2f;
  display: flex;
  align-items: center;
}
.logo {
  position: absolute;
  top: 50%;
  transform: translate(-10%, -50%)
}
.logo-container {
  display: inline-block;
  background-color: #fff;
  border-radius: 50%;
  margin-left: 10px;
}
.logo-name {
  float: right;
  color: #fff;
  font-size: 25px;
  font-weight: 300;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  margin: 2px 0 0 5px;
}
.serch {
  display: inline-block;
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 25%;
}
/deep/ .myinput .el-input__inner {
  background-color: #a82828;
  border: 0px;
  color: #fff;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
svg {
  font-size: 38px;
}
.login {
  position: absolute;
  right: 10%;
  cursor: pointer;
  span {
    margin-left: 5px;
    color: #fff;
    font-size: 15px;
  }
}
.login span:hover {
  text-decoration: underline;
}
.avatar {
  height: 40px;
  width: 40px;
  display: inline-block;
  margin-right: 2px;
  img {
    height: 40px;
    width: 40px;
    vertical-align: middle;
     border-radius: 50%;
  }
}
.el-footer{
  padding: 0;
}
.el-main{
  padding: 0;
}
</style>
