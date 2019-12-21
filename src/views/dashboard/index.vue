<template>
  <div class="dashboard-container">
    <!-- 状态 -->
    <template v-for="(data,index) in this.state">
      <div :key="index" class="state">
        <div style="display:flex;align-items: center;border:1px solid #cccccc;padding:10px 0">
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
      <div style="width:74.75%;border:1px solid #cccccc;padding:10px">
        <div style="display:flex">
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
          <table style="width:calc( 99% - 80px );max-width:900px">
            <tr>
              <td>市：<input v-model="search.one"/></td>
              <td>状态：<input v-model="search.two"/></td>
              <td>生产厂家：<input v-model="search.three"/></td>
            </tr>
            <tr>
              <td>设备编号：<input v-model="search.four"/></td>
              <td>购买者：<input v-model="search.five"/></td>
            </tr>
          </table>
          <div style="height:70px;line-height:70px;">
            <el-button type="primary" style="width:80px;padding:10px 0">查询</el-button>
          </div>
        </div>
        <div style="clear:both;margin-bottom:10px;"></div>
        <!-- 表 -->
        <div>
          <el-table
            :data="tableData"
            border
            style="width: 100%;margin-bottom:8px" class="tab">
              <el-table-column
                prop="date"
                label="日期"
                sortable>
              </el-table-column>
              <!-- <template v-for="index in 7">
                <el-table-column
                  prop="name"
                  label="姓名"
                  sortable :key="index">
                </el-table-column>
              </template> -->
              <el-table-column
                prop="name"
                label="姓名"
                sortable>
              </el-table-column>
              <el-table-column
                prop="address"
                label="地址"
                sortable>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row,$event)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-count="number"
              :page-sizes="[10, 20, 30, 40]"
              :page-size.sync ="pages"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length">
            </el-pagination>
        </div>
      </div>
      <div style="width: 24.25%">
        <!-- 饼图 -->
        <div style="width:100%;height:calc(50% - 0.5vw);border:1px solid #cccccc;">
          <div style="width:100%;height:100%" id="myChart1"></div>
        </div>
        <div style="height:1vw;"></div>
        <!-- 统计 -->
        <div style="width:100%;height:calc(50% - 0.5vw);border:1px solid #cccccc;padding:0px 5px">
          <div style="border-bottom:2px solid #c4c4c4;padding:5px;">
            <span style="line-height:28px;">设备统计</span>
            <button style="background-color: #cfefff;color:#4dc5ff;height:28px;margin:0;padding:5px 10px;border:0;float:right;font-size:10px;">更多</button>
            <div style="clear:both"></div>
          </div>
          <el-table
            :data="equipmentData"
            style="width: 100%;" class="tab"
            height="calc(100% - 40px)">
            <el-table-column
              prop="date"
              label="排名">
            </el-table-column>
            <el-table-column
              prop="name"
              label="市">
            </el-table-column>
            <el-table-column
              prop="address"
              label="设备数">
            </el-table-column>
            <el-table-column
              prop="week"
              label="同比上周">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- 折线图 -->
    <div style="height:500px;border:1px solid #cccccc;width:100%;margin-top: 1%;" id="myChart2">
    </div>
    <div>asd{{power}}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Dashboard',
  data(){
    return{
      //一页几个数据
      number:5,
      //第几页
      page:1,
      //总页数
      pages:50,
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
      }],
      tableData: [{
        date: "2016-05-02",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1518 弄1"
      }, {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄2"
      }, {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄3"
      }, {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄4"
      }, {
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄5"
      }],
      equipmentData: [{
        date: "1",
        name: "中山",
        address: "216",
        week:'10%'
      }, {
        date: "2",
        name: "广州",
        address: "104",
        week:'10%'
      }, {
        date: "3",
        name: "南宁",
        address: "94",
        week:'10%'
      }, {
        date: "4",
        name: "深圳",
        address: "57",
        week:'10%'
      }, {
        date: "5",
        name: "贵州",
        address: "51",
        week:'10%'
      }],
      chartData:[
        {value:335, name:'直接访问'},
        {value:310, name:'邮件营销'},
        {value:234, name:'联盟广告'},
        {value:135, name:'视频广告'},
        {value:1548, name:'搜索引擎'}
      ]
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
  },
  mounted(){
    this.drawLine();
  },
  watch:{
    //监听chartData，刷新图表数据
    chartData(){
      this.drawLine();
    }
  },
  methods:{
    async handleSizeChange(val) {
      //这样才能刷新
      this.chartData=[
        {value:335, name:'直接访问'},
        {value:4567, name:'邮件营销'},
        {value:234, name:'联盟广告'},
        {value:135, name:'视频广告'},
        {value:1548, name:'搜索引擎'}
      ];

      console.log(`每页 ${val} 条`);
      this.number=val;
      console.log(`每页 ${this.number} 条`);
      await this.tableData.push({
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄6"
      },{
        date: "2016-05-04",
        name: "王小虎",
        address: "上海市普陀区金沙江路 1517 弄7"
      });
      await window.onresize();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page=val;
      console.log(`当前页: ${this.page}`);
    },
    //图表
    drawLine(){
      // 饼图
      var myChart1 = this.$echarts.init(document.getElementById('myChart1'))
      var option1 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '20',
                            fontWeight: 'bold'
                        }
                    }
                },
                data:this.chartData
            }
        ]
      };
      
      var myChart2 = this.$echarts.init(document.getElementById('myChart2'))
      var option2 ={
          tooltip : {
              trigger: 'axis'
          },
          //颜色
          color:['#ff4683',"#0097E9",'#ff8f90'],
          legend: {
              data:['产量','不良率','达成率'],
              y:'10',
              textStyle:{
                  color: '#616161'
              }
          },
          calculable : true,
          xAxis : [
              {
                  type : 'category',
                  //设置坐标轴字体颜色和宽度
                  axisLine: {
                      lineStyle: {
                          color: "#616161",
                      }
                  },
                  data : ['周一','周二','周三','周四','周五','周六','周日']
              }
          ],
          yAxis : [
              {
                  type : 'value',
                  //设置坐标轴字体颜色和宽度
                  axisLine: {
                      lineStyle: {
                          color: "#616161",
                      }
                  },
              }
          ],
          series : [
              {
                  name:'产量',
                  type:'line',
                  data:[120,'', 101, 134, 90, 230, 210]
              },
              {
                  name:'不良率',
                  type:'line',
                  data:[220, 182, 191, 234, 290, 330, 310]
              },
              {
                  name:'达成率',
                  type:'line',
                  data:[150, 232, 201, 100, 190, 330, 410]
              }
          ]
      };
      myChart1.setOption(option1);
      myChart2.setOption(option2);
      //没固定高度的初始化不能自适应，但某个方面来说这样更加自适应
      setTimeout(()=>{
        myChart1.resize();
      },100)
      //自适应
      window.onresize=function(){
        myChart1.resize();
        myChart2.resize();
      }
    }
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
  height: 100%;
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
