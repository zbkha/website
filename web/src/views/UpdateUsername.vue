<template>
  <div>
    <el-button type="text" @click="dialogFormVisible = true">修改</el-button>
    <el-dialog title="修改用户名" :visible.sync="dialogFormVisible">
      <el-form :model="profile" :rules="rules" ref="updateUsername" label-width="100px" class="demo-ruleForm">
        <el-form-item label="新用户名" prop="username">
          <el-input v-model="profile.username"></el-input>
        </el-form-item>
      </el-form>
      <div class="item-button">
        <el-button type="primary" @click="submitForm('updateUsername')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import PubSub from "pubsub-js"
export default {
  name: "UpdateUsername",
  props: ['info'],
  data() {
    return {
      profile: {
        username: ''
      },
      rules: {
        username: [{required: true, message: '用户名不得为空', trigger: 'blur'},
                   {min: 2, max: 32, message: '长度应在2~32之间', trigger: 'blur'},
                   {validator: this.validateUname, trigger: 'blur'}]
      },
      dialogFormVisible: false,
    }
  },
  methods: {
    validateUname(rule, value, callback) {
      if (value === this.info.username) {
        callback(new Error('新旧用户名相同'))
      } else {
        callback();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if(valid) {
          this.$axios.post('/info/username', this.profile).then((res) => {
            if(res) {
              PubSub.publish('updateUsername', this.profile.username)
              this.dialogFormVisible = false
              this.profile.username = ''
              this.$message({
                type: 'success',
                message: '修改成功'
              })
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .el-button {
    vertical-align: top;
    line-height: 0;
    margin-left: 30px;
  }
  .item-button {
    display: flex;
  }
  .item-button button {
    width: 100px;
    margin: 20px auto;
    line-height: 1;
  }
</style>