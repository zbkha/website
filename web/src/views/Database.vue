<template>
  <div class="box">
    <h3>用 户 列 表</h3>
    <el-table :data="list" height="240" style="width: 100%">
      <el-table-column type="index" label="序号" width="130"></el-table-column>
      <el-table-column prop="account" label="账号" width="130"></el-table-column>
      <el-table-column prop="username" label="用户名" width="130"></el-table-column>
      <Delete :list="list"></Delete>
    </el-table>
  </div>
</template>

<script>
import PubSub from "pubsub-js"
import Delete from "../views/Delete"
export default {
  name: "Database",
  components: {Delete},
  data() {
    return {
      list: []
    }
  },
  methods: {
    delete(_, index) {
      this.list.splice(index, 1)
    }
  },
  beforeMount() {
    this.$axios.get('/database').then(res => {
      if(res) {
        PubSub.publish('show', '/database')
        this.list = res.data
      }
    })
  },
  mounted() {
    this.pubId = PubSub.subscribe('delete', this.delete)
  },
  beforeDestroy() {
    PubSub.unsubscribe(this.pubId)
  }
}
</script>

<style scoped>
  .box {
    position: absolute;
    top: 150px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    height: 300px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 5px #eee;
  }
  h3 {
    text-align: center;
  }
</style>