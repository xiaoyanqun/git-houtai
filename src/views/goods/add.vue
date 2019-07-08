<template>
  <div class="add">
    <div class="title">添加商品信息</div>
    <!-- 步骤条 -->
    <el-steps :active="active-0" finish-status="success" style="margin-top:15px">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!-- 标签页 -->
    <el-form ref="addform" :model="addform" label-width="80px">
      <el-tabs v-model="active" tab-position="left" style="margin-top:15px">
        <el-tab-pane label="基本信息" name="1">
          <el-form-item label="商品名称">
            <el-input v-model="addform.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="addform.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="addform.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="addform.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              @change=" selectList"
              :options="goodsCateList"
              :props="cascaderProps"
              clearable
              v-model="addform.goods_cat"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数" name="2">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性" name="3">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name="4">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容" name="5">商品内容</el-tab-pane>
         <!-- 多选框 -->
      <el-form-item label="是否促销">
            <el-radio v-model="addform.is_promote" label="1" border size="medium">是</el-radio>
        <el-radio v-model="addform.is_promote" label="2" border size="medium">否</el-radio>
          </el-form-item>
      </el-tabs>

    </el-form>
  </div>
</template>
<script>
import { getAllCateList } from '@/api/goods-api'
export default {
  data () {
    return {
      active: '1',
      addform: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: '',
        attrs: ''
      },
      goodsCateList: [],
      cascaderProps: {
        checkStrictly: true,
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      }
    }
  },
  methods: {
    selectList (value) {
      console.log(value)
      console.log(this.addform.goods_cat)
    }
  },
  mounted () {
    getAllCateList(3)
      .then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.goodsCateList = res.data.data
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang='less' scoped>
.title {
  height: 45px;
  line-height: 45px;
  background-color: #d7e2ef;
  padding-left: 20px;
}
</style>
