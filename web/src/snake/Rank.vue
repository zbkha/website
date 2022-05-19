<template>
  <div class="box">
    <h4>排 行 榜</h4>
    <el-table :data="list" height="240" style="width: 100%">
      <el-table-column type="index" label="名次" width="50"></el-table-column>
      <el-table-column prop="score" label="分数" width="50"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "Rank",
  props: ['list']
}
</script>

<style scoped>
.box {
  position: absolute;
  top: 200px;
  right: 100px;
  width: 230px;
  height: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 5px #eee;
}
h4 {
  text-align: center;
}
</style>