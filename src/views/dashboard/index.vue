<template>
  <div class="dashboard-container">
    <!-- 状态 -->
    <template v-for="(data,index) in this.state">
      <div :key="index" class="state">
        <div style="display:flex;align-items: center;border:1px solid black;padding:10px 0">
          <img src="@/../public/image/state.png" style='width:30%;margin-left:10%;margin-right:3%'/>
          <ul>
            <li style="font-size:10px;">{{data.name}}</li>
            <li style="font-size:25px;">{{data.number}}</li>
            <li style="font-size:10px;">{{data.top}}</li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data(){
    return{
      state:[{
        name:'运行中',
        number:519,
        top:'10%'
      },{
        name:'停机',
        number:21,
        top:'10%'
      },{
        name:'本周活跃用户',
        number:32491,
        top:'8%'
      },{
        name:'周收入',
        number:151984,
        top:'8%'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.main{
  width: 100%;
  height: 100%;
  background-color: antiquewhite;
}
ul{
  padding: 0;
  li{
    list-style-type:none;
  }
}
.state{
  width:22%;
  display:inline-block;
  margin-right:4%
}
.state:nth-child(4){
  margin: 0
}
</style>
