<template>
  <div class="box" v-if="found">
    <h3>登 录</h3>
    <el-form :model="registerData" :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="account">
        <el-input v-model="registerData.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerData.password"></el-input>
      </el-form-item>
      <div class="item-button">
        <el-button type="primary" @click="submitForm('registerForm')">登 录</el-button>
      </div>
    </el-form>
    <h5>没有账号？去 <router-link to="/register">注册</router-link></h5>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      found: false,
      registerData: {
        account: '',
        password: ''
      },
      rules: {
        account: [{required: true, message: '账号不得为空', trigger: 'blur'},
          {min: 3, max: 32, message: '长度应在3~32之间', trigger: 'blur'}],
        password: [{required: true, message: '密码不得为空', trigger: 'blur'},
          {min: 3, max: 32, message: '长度应在3~32之间', trigger: 'blur'}]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/login', this.registerData).then(res => {
            if(res) {
              this.$message({
                type: 'success',
                message: '登录成功'
              })
              localStorage.setItem('elementToken', 'Bearer ' + res.data)
              this.$router.push('/home')
            }
          })
        }
      })
    }
  },
  beforeMount() {
    this.$axios.get('/login').then(res => {
      if(res) {
        this.found = true
      }
    })
  }
}
</script>

<style scoped>
  .box {
    width: 500px;
    height: 280px;
    margin: 150px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 0 5px #eee;
  }
  h3 {
    text-align: center;
  }
  .el-input {
    width: 92%;
  }
  .item-button {
    display: flex;
  }
  .item-button button {
    width: 120px;
    margin: 30px auto;
  }
  h5 {
    text-align: right;
    margin: -50px 20px;
  }
  a {
    text-decoration: none;
    color: #409eff;
  }
  a:hover {
    color: #66b1ff;
  }
</style>