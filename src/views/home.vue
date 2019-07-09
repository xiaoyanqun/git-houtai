<template>
  <div class="home">
    <el-container>
      <el-aside width="200px">
        <div class="logo"></div>
        <el-menu
          :router="true"
          :unique-opened="true"
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu :index="val.id+''" v-for="val in LeftList" :key="val.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{val.authName}}</span>
            </template>
            <el-menu-item-group v-for="val2 in val.children" :key="val2.id">
              <el-menu-item :index="'/home/'+val2.path">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>{{val2.authName}}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="toggle-btn myicon myicon-menu"></div>
          <div class="system-title">电商后台管理系统</div>
          <div>
            <span style="color:#fff">欢迎您：{{$store.getters.getUserName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <a href="javascript:;" class="welcome" @click='logout'>退出</a>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getAllLeftList } from '@/api/roles-api.js'
export default {
  data () {
    return {
      LeftList: []
    }
  },
  mounted () {
    getAllLeftList()
      .then(res => {
        console.log(res)
        this.LeftList = res.data.data
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style lang='less' scoped>
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo1.png) -8px;
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
