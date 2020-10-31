<template>
  <el-aside width="250px">
    <el-scrollbar>
      <!-- 推荐 -->
      <div class="list_menu">
        <el-menu
          class="el-menu-vertical-demo"
          :default-active="activeIndex"
          @select="handleSelect"
          router
        >
          <el-menu-item-group>
            <template slot="title">
              <span>推荐</span>
            </template>
            <el-menu-item
              :index="item.index"
              v-for="item in menurecommendedMenu"
              :key="item.index"
              :class="{ activeIndex: item.index === activeIndex }"
            >
              <span :class="item.icon">{{ item.name }}</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">
              <span>我的音乐</span>
            </template>
            <el-menu-item
              :index="item.index"
              v-for="item in myMusic"
              :key="item.index"
              :class="{ activeIndex: item.index === activeIndex }"
            >
              <span :class="item.icon">{{ item.name }}</span>
            </el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1">
            <template slot="title">
              <span>创建的歌单</span>
              <!-- <div @click.stop=""><i class="el-icon-circle-plus-outline"></i></div> -->
            </template>
            <el-menu-item
              :index="'/songlist/' + item.id"
              v-for="item in playList"
              :key="item.id"
              v-show="item.subscribedCount == 0"
              :class="{ activeIndex: '/songlist/' + item.id === activeIndex }"
              >{{ item.name }}</el-menu-item
            >
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>收藏的歌单</span>
              <!-- <div @click.stop=""><i class="el-icon-circle-plus-outline"></i></div> -->
            </template>
            <el-menu-item
              :index="'/songlist/' + item.id"
              v-for="item in playList"
              :key="item.id"
              v-show="item.subscribedCount !== 0"
              :class="{ activeIndex: '/songlist/' + item.id === activeIndex }"
              >{{ item.name }}</el-menu-item
            >
          </el-submenu>
        </el-menu>
      </div>
      <!-- 歌曲 -->
      <div class="back"></div>
    </el-scrollbar>
    <div class="song"></div>
  </el-aside>
</template>
<script>
export default {
  data() {
    return {
      menurecommendedMenu: [
        {
          index: "/findMusic",
          name: "发现音乐",
          icon: "iconfont icon-yinle",
        },
        {
          index: "/FM",
          name: "私人FM",
          icon: "iconfont icon-fm",
        },
        {
          index: "/video",
          name: "视频",
          icon: "iconfont icon-shipin",
        },
        {
          index: "/friend",
          name: "朋友",
          icon: "iconfont icon-icon-friend",
        },
      ],
      myMusic: [
        {
          index: "/yunpan",
          name: "我的音乐云盘",
          icon: "iconfont icon-yunpan",
        },
        {
          index: "/radio",
          name: "我的电台",
          icon: "iconfont icon-yule_yinlediantai",
        },
        {
          index: "/collection",
          name: "我的收藏",
          icon: "iconfont icon-wodeshoucang",
        },
      ],
      activeIndex: "",
      playList: [],
    };
  },
  created() {
    if (localStorage.UserPlayList) {
      this.playList = JSON.parse(localStorage.UserPlayList);
    }
  },
  methods: {
    getPlayList() {
      setTimeout(() => {
        this.playList = this.$store.state.UserPlayList;
        console.log(this.playList);
      }, 500);
    },
    handleSelect(key, keyPath) {
      this.activeIndex = key;
    },
  },
};
</script>
<style lang="less" scoped>
.el-aside {
  background-color: #f5f5f7;
  user-select: none;
  cursor: pointer;
}
.el-menu {
  position: relative;
  background-color: #f5f5f7;
}
.activeIndex {
  background-color: #e6e7ea !important;
}
.el-menu-item {
  height: 40px;
  line-height: 3.45em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  background-color: #f5f5f7;
  span {
    margin-right: 5px;
    font-size: 14px;
  }
}
.el-submenu div {
  float: left;
  z-index: 10;
}
/deep/ .el-menu .el-menu-item-group__title {
  padding-left: 10px !important;
}
/deep/ .el-menu .el-submenu .el-submenu__title {
  height: 30px;
  font-size: 12px;
  color: #909399;
  line-height: normal;
  padding: 7px 0 7px 20px;
  padding-left: 10px !important;
}
/deep/ li.el-menu-item.is-active {
  color: black !important;
}
.el-scrollbar {
  height: 100%;
}
/deep/.el-scrollbar__wrap {
  overflow-x: hidden;
}
.song {
  position: absolute;
  width: 250px;
  height: 100px;
  background-color: red;
  bottom: 0;
  z-index: 999;
}
.back {
  width: 250px;
  height: 100px;
  // background-color: blue;
}
</style>
