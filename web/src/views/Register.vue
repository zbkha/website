<template>
  <div class="box" v-if="found">
    <h3>注 册</h3>
    <el-form :model="registerData" :rules="rules" ref="registerForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="账号" prop="account">
        <el-input v-model="registerData.account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="registerData.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input type="password" v-model="registerData.password2"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerData.username"></el-input>
      </el-form-item>
      <div class="item-button">
        <el-button type="primary" @click="submitForm('registerForm')">注 册</el-button>
      </div>
    </el-form>
    <h5>已有账号？去 <router-link to="/login">登录</router-link></h5>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.registerData.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    }
    return {
      found: false,
      registerData: {
        account: '',
        password: '',
        password2: '',
        username: ''
      },
      rules: {
        account: [{required: true, message: '账号不得为空', trigger: 'blur'},
                   {min: 3, max: 32, message: '长度应在3~32之间', trigger: 'blur'}],
        password: [{required: true, message: '密码不得为空', trigger: 'blur'},
                   {min: 3, max: 32, message: '长度应在3~32之间', trigger: 'blur'}],
        password2: [{required: true, message: '确认密码不得为空', trigger: 'blur'},
                    {min: 3, max: 32, message: '长度应在3~32之间', trigger: 'blur'},
                    {validator: validatePass, trigger: 'blur'}],
        username: [{required: true, message: '用户名不得为空', trigger: 'blur'},
                   {min: 2, max: 32, message: '长度应在2~32之间', trigger: 'blur'}],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/register', this.registerData).then(res => {
            if(res) {
              this.$message({
                type: 'success',
                message: '注册成功'
              })
              this.$router.push('/login')
            }
          })
        }
      })
    }
  },
  beforeMount() {
    this.$axios.get('/register').then(res => {
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
    height: 400px;
    margin: 100px auto;
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
    margin: 20px auto;
  }
  h5 {
    text-align: right;
    margin: -40px 20px;
  }
  a {
    text-decoration: none;
    color: #409eff;
  }
  a:hover {
    color: #66b1ff;
  }
</style>