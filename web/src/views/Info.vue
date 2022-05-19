<template>
  <el-descriptions>
    <el-descriptions-item label="账号">{{info.account}}</el-descriptions-item>
    <el-descriptions-item label="用户名">
      {{info.username}}
      <UpdateUsername :info="info"></UpdateUsername>
    </el-descriptions-item>
    <el-descriptions-item label="密码">
      *********
      <UpdatePassword></UpdatePassword>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
import PubSub from "pubsub-js"
import UpdateUsername from "../views/UpdateUsername"
import UpdatePassword from "../views/UpdatePassword"
export default {
  name: "Info",
  components: {
    UpdateUsername,
    UpdatePassword
  },
  data() {
    return {
      info: {}
    }
  },
  methods: {
    updateUsername(_, newName) {
      this.info.username = newName
    }
  },
  beforeMount() {
    this.$axios.get('/info').then(res => {
      if(res) {
        PubSub.publish('show', '/info')
        this.info = res.data
      }
    })
  },
  mounted() {
    this.pubId = PubSub.subscribe('updateUsername', this.updateUsername)
  },
  beforeDestroy() {
    PubSub.unsubscribe(this.pubId)
  }
}
</script>

<style scoped>
  .el-descriptions {
    position: absolute;
    width: 500px;
    top: 150px;
    left: 30%;
  }
</style>