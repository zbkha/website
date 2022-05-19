<template>
  <h5 @click="submitForm"><i class="el-icon-switch-button"></i> 退出</h5>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    submitForm() {
      this.$message({
        type: 'info',
        message: '您已退出登录'
      })
      localStorage.removeItem('elementToken')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
  h5 {
    position: absolute;
    top: 0;
    right: 20px;
    color: #fc3030;
  }
  h5:hover {
    cursor: pointer;
    color: #a11d1d;
  }
</style>