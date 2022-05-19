<template>
  <el-row class="tac">
    <el-col :span="3">
      <el-menu :default-active="actCom" class="el-menu-vertical-demo" router>
        <el-menu-item index="/home">
          <i class="el-icon-menu"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="/info">
          <i class="el-icon-menu"></i>
          <span slot="title">个人信息</span>
        </el-menu-item>
        <el-menu-item index="/todolist">
          <i class="el-icon-menu"></i>
          <span slot="title">待办事项</span>
        </el-menu-item>
        <el-menu-item index="/snake">
          <i class="el-icon-menu"></i>
          <span slot="title">贪吃蛇</span>
        </el-menu-item>
        <el-menu-item v-if="profile.isAdmin" index="/database">
          <i class="el-icon-menu"></i>
          <span slot="title">数据库</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Navigation",
  props: ['profile', 'actCom']
}
</script>

<style scoped>

</style>