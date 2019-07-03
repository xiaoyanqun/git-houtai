<template>
  <div class="login">
    <div class="container">
      <img src="../assets/avatar.jpg" alt class="avatar" />
      <el-form ref="loginform" :model="loginform" :rules="rules">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="loginform.username"
            prefix-icon="myicon myicon-user"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type = 'password'
            placeholder="请输入密码"
            v-model="loginform.password"
            prefix-icon="myicon myicon-key"
            clearable
            @keyup.13.native = 'submitlogin'
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="submitlogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import '@/styles/index.less'
import { login } from '@/api/users-api.js'
export default {
  data () {
    return {
      loginform: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请选择密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitlogin () {
      this.$refs.loginform.validate(valid => {
        if (valid) {
          login(this.loginform)
            .then(res => {
              if (res.data.meta.status === 200) {
                let token = res.data.data.token
                localStorage.setItem('token', token)
                this.$router.push({ name: 'home' })
              } else {
                this.$message.warning(res.data.meta.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
        } else {
          this.$message.error('请输入正确的用户名或密码')
          return false
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
