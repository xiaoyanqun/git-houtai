<template>
  <div class="goods">
     <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style=" line-height:45px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <router-view></router-view>
  </div>
</template>
<script>
export default {}
</script>
<style lang='less' scoped>
</style>
