<template>
  <div class="app-container">
    <el-table
    :data="tableData"
    border
    style="width: 100%" class="tab">
      <el-table-column
        prop="date"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
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
  </div>
</template>

<script>
export default {
  data(){
    return{
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
      }]
    }
  },
  methods:{
    handleEdit(index, row) {
      console.log(index, row);
      //都可以用作修改
      //this.tableData[0].name='测试';
      //row.name='asd';
    },
    handleDelete(index, row,e) {
      console.log(index, row);
      //获取到一整行
      console.log(e.target.parentNode.parentNode.parentNode.parentNode.className);
      this.$confirm('是否删除', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
      }).then(() => {
        // //点在字上和点在按钮上位置不同，需要判定
        // if(e.target.parentNode.parentNode.parentNode.parentNode.className==''){
        //   e.target.parentNode.parentNode.parentNode.remove()
        // }else{
        //   e.target.parentNode.parentNode.parentNode.parentNode.remove()
        // }
        //处理数据
        this.tableData.splice(index,1);
        console.log(this.tableData);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {   
      });
    }
  }
}
</script>

<style lang="scss" scoped>

</style>