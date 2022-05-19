<template>
  <h5 @click="submitForm"><i class="el-icon-upload"></i> 保存</h5>
</template>

<script>
export default {
  name: "Save",
  props: ['todos'],
  methods: {
    submitForm() {
      this.$axios.post('/todolist', [...this.todos]).then(res => {
        if(res) {
          this.$message({
            type: 'success',
            message: '保存成功'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  h5 {
    /*position: fixed;*/
    /*top: 0;*/
    /*right: 20px;*/
    position: relative;
    left: 550px;
    width: 50px;
    height: 20px;
    color: #409eff;
  }
  h5:hover {
    cursor: pointer;
    color: #66b1ff;
  }
</style>