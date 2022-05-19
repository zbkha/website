<template>
  <el-table-column label="操作">
    <template slot-scope="scope">
      <el-button
          @click.native.prevent="deleteRow(scope.$index)"
          type="text"
          size="small">
        移除
      </el-button>
    </template>
  </el-table-column>
</template>

<script>
import PubSub from "pubsub-js"
export default {
  name: "Delete",
  props: ['list'],
  methods: {
    deleteRow(index) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.$axios.post('/database', this.list[index]).then(res => {
          if(res) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            PubSub.publish('delete', index)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>