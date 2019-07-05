<template>
  <div class="rightList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style=" line-height:45px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 列表 -->
    <el-table :data="rightList" border style="width: 100%">
      <el-table-column type="index" width="180"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180"></el-table-column>
      <el-table-column prop="path" label="路径" width="180"></el-table-column>
      <el-table-column prop="level" label="层级">
        <template slot-scope="scope">
            {{scope.row.level | level}}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { rolesList } from '@/api/roles-api.js'
export default {
  data () {
    return {
      rightList: []
    }
  },
  mounted () {
    rolesList().then(res => {
      console.log(res)
      if (res.data.meta.status === 200) {
        this.rightList = res.data.data
      }
    }).catch(err => {
      console.log(err)
    })
  },
  filters: {
    level (type) {
      if (type === '0') {
        return '一级'
      } else if (type === '1') {
        return '二级'
      } else if (type === '2') {
        return '三级'
      } else if (type === '3') {
        return '四级'
      }
    }
  }
}
</script>
<style lang='less' scoped>
</style>
