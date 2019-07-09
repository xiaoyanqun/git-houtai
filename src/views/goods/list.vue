<template>
  <div class="list">
    <!-- 搜索框 -->
    <div style="margin: 15px 0;">
      <el-input
        @keyup.13.native="search"
        v-model="goodsQuery.query"
        placeholder="请输入内容"
        class="input-with-select"
        style="width:300px;margin-right:5px"
      >
        <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button @click="$router.push({name:'add'})" type="success" plain>添加成员</el-button>
    </div>
    <!-- 商品列表 -->
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column type="index" label="编号" width="50"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="600"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格"></el-table-column>
      <el-table-column prop="goods_state" label="商品状态"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量"></el-table-column>
      <el-table-column prop="add_time" label="创建时间"></el-table-column>
      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button type="primary" plain icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="权限管理" placement="top">
            <el-button type="success " plain icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button type="danger" plain icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="goodsQuery.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="goodsQuery.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import { getAllGoodsList } from '@/api/goods-api'
export default {
  data () {
    return {
      total: 0,
      goodsList: [],
      goodsQuery: {
        query: '',
        pagesize: 10,
        pagenum: 1
      }
    }
  },
  methods: {
    search () {
      this.goodsQuery.pagenum = 1
      this.init()
    },
    init () {
      getAllGoodsList(this.goodsQuery)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.goodsList = res.data.data.goods
            this.total = res.data.data.total
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSizeChange (val) {
      this.goodsQuery.pagesize = val
      this.init()
    },
    handleCurrentChange (val) {
      this.goodsQuery.pagenum = val
      this.init()
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang='less' scoped>
</style>
