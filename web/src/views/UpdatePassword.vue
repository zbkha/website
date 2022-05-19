<template>
  <div>
    <el-button type="text" @click="dialogFormVisible = true">修改</el-button>
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible">
      <el-form :model="profile" :rules="rules" ref="updatePassword" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="profile.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="password2">
          <el-input type="password" v-model="profile.password2"></el-input>
        </el-form-item>
      </el-form>
      <div class="item-button">
        <el-button type="primary" @click="submitForm('updatePassword')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UpdatePassword",
  data() {
    return {
      profile: {
        password: '',
        password2: ''
      },
      rules: {
        password: [{required: true, message: '密码不得为空', trigger: 'blur'},
                   {min: 3, max: 32, message: '长度应在3~32之间', trigger: 'blur'}],
        password2: [{required: true, message: '确认密码不得为空', trigger: 'blur'},
                    {min: 3, max: 32, message: '长度应在3~32之间', trigger: 'blur'},
                    {validator: this.validatePass, trigger: 'blur'}]
      },
      dialogFormVisible: false
    }
  },
  methods: {
    validatePass(rule, value, callback) {
      if (value !== this.profile.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/info/password', this.profile).then((res) => {
            if (res) {
              this.dialogFormVisible = false
              this.profile.password = ''
              this.profile.password2 = ''
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
    vertical-align: baseline;
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