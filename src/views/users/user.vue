<template>
  <div class="user">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style=" line-height:45px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div style="margin: 15px 0;">
      <el-input :search='search1' @keyup.13.native='search' v-model='user.query' placeholder="请输入内容" class="input-with-select" style="width:300px;margin-right:5px">
        <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button @click="showadduser = true" type="success" plain>添加成员</el-button>
    </div>
    <!-- 用户列表 -->
    <el-table :data="userlist" border style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="280px"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="280px"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column label="修改状态" width="100px">
        <template slot-scope="scope">
          <el-switch
            @change = "changeuserstate(scope.row.id,scope.row.mg_state)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              plain
              icon="el-icon-edit"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="权限管理" placement="top">
            <el-button type="success " plain icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button @click = 'showdel(scope.row.id)' type="danger" plain icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="user.pagenum"
      :page-sizes="[5,10,20,30]"
      :page-size="user.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 弹框 -->
    <el-dialog title="添加用户" :visible.sync="showadduser">
      <el-form :rules="rules" ref="adduserfrom" :model="userfrom" :label-width="'80px'">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userfrom.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userfrom.password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="userfrom.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="userfrom.mobile" auto-complete="off" @keyup.13.native = 'adduser'></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showadduser = false">取 消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { users, adduser, deluser, userstate } from '@/api/users-api.js'
export default {
  data () {
    return {
      showadduser: false,
      total: 0,
      user: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      value2: true,
      userlist: [],
      userfrom: {
        username: '',
        password: '',
        email: '123@qq.com',
        mobile: '13123456789'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 6, message: '密码最少3位最多6位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            pattern: /\w+[@]\w+[.]\w{2,3}/,
            message: '邮箱格式不正确',
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          {
            pattern: /^1[3,4,5,6,7,8,9]\d{9}/,
            message: '请输入正确的手机号',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 修改用户状态
    changeuserstate (id, type) {
      userstate(id, type)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.meta.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.meta.msg
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 删除用户方法
    showdel (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deluser(id).then(res => {
          if (res.data.meta.status === 200) {
            this.user.pagenum = Math.ceil((this.total - 1) / this.user.pagesize) < this.user.pagenum ? --this.user.pagenum : this.user.pagenum
            this.init()
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: res.data.meta.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 查询用户方法
    init () {
      users(this.user)
        .then(res => {
          // console.log(res)
          if (res.data.meta.status === 200) {
            this.userlist = res.data.data.users
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 点击切换页面展示条数时
    handleSizeChange (val) {
      this.user.pagesize = val
      this.init()
    },
    // 点击切换页面或者跳转页面是时
    handleCurrentChange (val) {
      this.user.pagenum = val
      this.init()
    },
    // 添加用户方法
    adduser () {
      this.$refs.adduserfrom.validate(valid => {
        if (valid) {
          adduser(this.userfrom)
            .then(res => {
              if (res.data.meta.status === 201) {
                this.showadduser = false
                this.$refs.adduserfrom.resetFields()
                this.init()
              } else {
                this.$message.error(res.data.meta.msg)
              }
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    // 筛选方法
    search () {
      this.user.pagenum = 1
      this.init()
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    search1 () {
      if (this.user.query.length === 0) {
        this.init()
      }
      return 'ok'
    }
  }
}
</script>
<style lang='less' scoped>
</style>
