<template>
  <el-table :data="playListTable" style="width: 100%">
      <el-table-column type="index" width="50px"></el-table-column>
    <el-table-column  label="操作"  width="100px">
    </el-table-column>
    <el-table-column prop="name" label="音乐标题" sortable width="250">
    </el-table-column>
    <el-table-column prop="ar[0].name" label="歌手" width="200"> </el-table-column>
     <el-table-column prop="al.name" label="专辑" width="250"> </el-table-column>
     <el-table-column prop="dt" label="时长"> </el-table-column>
  </el-table>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    allSongInfo: {
      type: Array,
    },
  },
  data() {
    return {
      songIds: [],
      playListTable: [],
    };
  },
  created() {
  },
  methods: {
    getAllSongInfo() {
        console.log(this.playListTable[0]);
      //处理歌曲时长
      for (const key in this.playListTable) {
        if (this.playListTable[key].hasOwnProperty("dt")) {
          const dt = new Date(this.playListTable[key].dt);
          const mm = (dt.getMinutes() + "").padStart(2, "0");
          const ss = (dt.getSeconds() + "").padStart(2, "0");
          this.playListTable[key].dt = mm + ":" + ss;
        }
      }
      this.playListTable.forEach(item => {
          if(item.name.length>=17){
             item.name= item.name.substr(0,11)+'...'
          }
          console.log(item.al.name)
          if(item.al.name.length>=17){
            item.al.name=item.al.name.substr(0,15)+'...'
          }
      });
    },
  },
  computed: {
    ...mapGetters(["NowSongId"]),
  },
};
</script>
