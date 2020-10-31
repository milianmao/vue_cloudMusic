<template>
  <el-container style="margin-left= 20px;">
    <el-header height="220px">
      <el-row>
        <!-- 歌单图片 -->
        <img
          :src="this.playlistInfo.coverImgUrl"
          style="width: 220px;height: 220px;"
        />
        <!-- 歌单信息 -->

        <div class="play_list_name">
          <span
            style="border: 1px solid #e03f40;padding:1px 4px 1px 4px;border-radius:10%;color:#e03f40;"
            >歌单</span
          ><span style="font-size:20px;">{{ playlistInfo.name }}</span>
        </div>
        <!-- 作者信息 -->
        <div class="auth_info">
          <img
            :src="userInfo.avatarUrl"
            style="width:30px;height:30px;border-radius: 50%;"
          />
          <span>{{ userInfo.nickname }}</span>
          <span style="margin-left:20px;font-size:10px"
            >{{ playlistInfo.createTime | dateFormatToYMD }}创建</span
          >
        </div>
        <!-- 按钮 -->
        <div class="button_group">
          <el-button type="danger" size="mini" icon="el-icon-video-play"
            >播放全部</el-button
          >
          <el-button icon="el-icon-folder-add" size="mini"
            >收藏({{ playlistInfo.subscribedCount }})</el-button
          >
          <el-button icon="el-icon-share" size="mini"
            >分享({{ playlistInfo.shareCount }})</el-button
          >
        </div>

        <!-- 标签信息 -->
        <div class="tag_info">
          <span>标签:<span></span></span>
        </div>

        <div class="introduce">
          <el-collapse>
            <el-collapse-item
              :title="
                '简介: ' + (playlistInfo.description + '').substr(0, 26) + '...'
              "
            >
              <p>{{ (playlistInfo.description + "").substr(26) }}</p>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-row>
    </el-header>
    <el-main>
     <el-scrollbar>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="歌曲列表" name="first"><PlayListTable :allSongInfo="allSongInfo" ref="RePlayListTable"/></el-tab-pane>
        <el-tab-pane label="评论" name="second">评论</el-tab-pane>
        <el-tab-pane label="收藏者" name="third">收藏者</el-tab-pane>
      </el-tabs>
     </el-scrollbar>
    </el-main>
  </el-container>
</template>
<script>
import PlayListTable from './playListTable.vue';
import {mapMutations,mapGetters} from 'vuex'
export default {
  components:{
    PlayListTable
  },
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      queryIds: "",
      playlistInfo: [],
      //歌单的歌曲信息
      songInfo: [],
      activeName:'first',
      songIds:[],
      allSongInfo:[]
    };
  },
  created() {
    console.log('1');
    this.queryId();
    this.queryPlayList();
  },
  //监听路由事件
  watch: {
    $route() {
      this.queryId();
      this.queryPlayList();
      this.$refs.RePlayListTable.playListTable=[]
    },
  },
  methods: {
     ...mapMutations(['getNowPlayListInfo']),
    //查询当前歌单id
    queryId() {
      console.log('2');
      this.queryIds = this.$route.params.id;
    },
    //获取歌单信息
    async queryPlayList() {
      console.log('3');
      const  {data:res}  = await this.$http.get("/playlist/detail", {
        params: { id: this.queryIds }
      });
      // console.log(res);
      this.playlistInfo = res.playlist;
      this.songInfo = res.playlist.trackIds;
      this.$store.commit('getNowPlayListInfo',res.playlist.trackIds)
      this.querySong()
    },
    //查询所有歌曲信息
     async querySong(){
            let songIdsStr= this.NowSongIds.toString()
            const {data:res} = await this.$http.get('/song/detail',{params:{ids:songIdsStr}})
            // console.log(res);
            //保存歌曲信息
            this.allSongInfo = res.songs
            //提前给表格赋值防止首次点击歌单渲染失败
            this.$refs.RePlayListTable.playListTable=this.allSongInfo
            this.$refs.RePlayListTable.getAllSongInfo()
        },
    handleClick(){

    }
  },
  computed: {
     ...mapGetters(['NowSongIds'])
  },
};
</script>
<style lang="less" scoped>
.play_list_name {
  display: inline;
  position: absolute;
  top: 10px;
  margin-left: 30px;
  span {
    margin-right: 10px;
  }
}
.auth_info {
  display: inline;
  position: absolute;
  top: 50px;
  margin-left: 30px;
  img {
    vertical-align: middle;
    margin-right: 10px;
  }
  span {
    color: #666666;
  }
}
.button_group {
  display: inline;
  position: absolute;
  top: 100px;
  margin-left: 30px;
}
.tag_info {
  display: inline;
  position: absolute;
  top: 150px;
  margin-left: 30px;
  span {
    font-size: 14px;
  }
}
/deep/.introduce {
  display: inline;
  position: absolute;
  top: 170px;
  margin-left: 30px;
  .el-collapse {
    border: none;
    z-index: 999;
    .el-collapse-item__header {
      border: none;
    }
    .el-collapse-item__wrap {
      border: none;
    }
  }
}
.el-main {
  padding: 0;
  margin-top: 40px;
}
.el-header {
  margin-top: 30px;
  padding-left: 30px !important;
}
/deep/ .el-tabs__nav-scroll{
  padding-left: 100px;
  .el-tabs__item{
    font-size: 16px;
  }
  .el-tabs__item.is-active{
    color: #c62f2f;
  }
  .el-tabs__active-bar{
    background-color: #c62f2f;
    height: 4px;
  }
}
</style>
