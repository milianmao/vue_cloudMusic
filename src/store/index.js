import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    UserInfo:'',
    UserPlayList:[],
    //当前歌单信息
    NowPlayListInfo:[],
    //当前歌单歌曲信息
    NowSongInfos:[],
    //当前歌单歌曲id
    NowSongIds:[]
  },
  mutations: {
    //用户信息
    getUserInfo(state,info){
      state.UserInfo = info
    },
    //用户歌单
      getUserPlayList(state,playList){
          state.UserPlayList = playList
          // console.log(state.UserPlayList);
          window.localStorage.setItem('UserPlayList', JSON.stringify(playList))
      },
      //获取当前歌单全部信息
      getNowPlayListInfo(state,NowSongInfos){
        state.NowSongInfos = NowSongInfos
      }
  },
  actions: {
   async getUserPlayList(context,uid){
        const res = await axios.get('/user/playlist',{params: {uid: uid,limit: 100}})
        console.log(res);
        if(res.status !==200){
          return 0
        }
        context.commit('getUserPlayList',res.data.playlist)
    }
  },
  getters:{
    NowSongIds:state=>{
      state.NowSongIds=[]
    for (const id in state.NowSongInfos) {
      if (state.NowSongInfos.hasOwnProperty(id)) {
        state.NowSongIds.push(state.NowSongInfos[id].id)
      }
    }
    return state.NowSongIds
    }
  },
  modules: {
  }
})
