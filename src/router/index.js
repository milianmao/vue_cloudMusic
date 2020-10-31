import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PlayList from '../components/musicList/playlist.vue'
Vue.use(VueRouter)
const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    children: [
      //跳转歌单
      {
      path: '/songlist/:id',
      component: PlayList
     }
  ]
  },


]

const router = new VueRouter({
  routes
})

export default router