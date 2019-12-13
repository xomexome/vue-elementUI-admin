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
    <!-- main -->
    <div class="main">
      <div style="width:74.75%;background-color: antiquewhite;border:1px solid black;padding:10px;">
        <div style="float:left;width:calc( 99% - 80px )">
          <!-- 改不了输入框高度，以后有时间再改 -->
          <!-- <table>
            <tr>
              <td>市：<el-input v-model="search.one" placeholder="请输入内容" class="inp"></el-input></td>
              <td>状态：<el-input v-model="search.two" placeholder="请输入内容" class="inp"></el-input></td>
              <td>生产厂家：<el-input v-model="search.three" placeholder="请输入内容" class="inp"></el-input></td>
            </tr>
            <tr>
              <td>设备编号：<el-input v-model="search.four" placeholder="请输入内容" class="inp"></el-input></td>
              <td>购买者：<el-input v-model="search.five" placeholder="请输入内容" class="inp"></el-input></td>
            </tr>
          </table> -->
          <table>
            <tr>
              <td>市：<input v-model="search.one" placeholder="请输入内容"/></td>
              <td>状态：<input v-model="search.two" placeholder="请输入内容"/></td>
              <td>生产厂家：<input v-model="search.three" placeholder="请输入内容"/></td>
            </tr>
            <tr>
              <td>设备编号：<input v-model="search.four" placeholder="请输入内容"/></td>
              <td>购买者：<input v-model="search.five" placeholder="请输入内容"/></td>
            </tr>
          </table>
        </div>
        <div style="float:right;">
          <el-button type="primary" style="width:80px;padding:10px 0">查询</el-button>
        </div>
        <div style="clear:both"></div>
        <div style="width:100;height:5vh;background-color: green"></div>
      </div>
      <div style="width: 24.25%;background-color: red;border:1px solid black;padding:10px;">

      </div>
    </div>
    <div>asd{{power}}</div>
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
      }],
      search:[{
        one:'',
        two:'',
        three:'',
        four:'',
        five:''
      }]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'power'
    ])
  },
  created(){
    this.$store.commit('user/setPower',12);
    console.log(this.$store.state.user.power);
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
//主体
.main{
  display:flex;
  justify-content: space-between;
  margin-top: 1%;
  table{
    td{
      width: 33%;
      padding-right: 10px;
      white-space: nowrap;
      text-align: right;
      input,.inp{
        width: calc( 100% - 80px );
        padding: 0 5px;
        line-height: 30px;
        height: 30px;
        // .el-input__inner{
        //   line-height: 20px;
        //   height: 20px;
        // }
      }
    }
  }
}
//状态
.state{
  width:calc( 97% / 4 );   
  display:inline-block;
  margin-right:1%;
  ul{
    padding: 0;
    li{
      list-style-type:none;
    }
  }
}
.state:nth-child(4){
  margin: 0;
}
</style>
