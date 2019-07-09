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
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane  label="商品参数" name="2">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性" name="3">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片" name="4">
          <el-upload
            class="upload-demo"
            action="http://localhost:8888/api/private/v1/upload"
            :on-remove="handleRemove"
            :on-success = "onsuccess"
            :headers="getheader()"
            list-type="picture"
             :before-upload ="upload"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane label="商品内容" name="5">
          <quillEditor v-model="addform.goods_introduce" style="height:300px;border-bottom:1px solid #ccc"></quillEditor>
        </el-tab-pane>
      </el-tabs>
       <el-button style="float:right;" type="primary" @click="addGoods">确认添加</el-button>
    </el-form>
  </div>
</template>
<script>
import { getAllCateList, addGoods, getCategories } from '@/api/goods-api'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export default {
  components: {
    quillEditor
  },
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
        pics: [],
        attrs: [],
        goods_state: 1
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
    // 判断图片类型
    upload (type) {
      if (type.type.indexOf('image/') === -1) {
        this.$message.error('上传内容为图片格式')
        return false
      }
    },
    addGoods () {
      console.log(this.addform)
      addGoods(this.addform)
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 201) {
            this.$message.success(res.data.meta.msg)
            this.$router.push({ name: 'list' })
          } else {
            this.$message.error(res.data.meta.msg)
          }
        }).catch(err => {
          console.log(err)
        })
    },
    selectList (value) {
      this.addform.goods_cat = value.join(',')
      // 获取商品参数
      console.log(this.addform.goods_cat)
      getCategories('73', 'only')
        .then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
    },
    // 删除图片时触发
    handleRemove (file, fileList) {
      if (!file.response) {
        return
      }
      this.addform.pics.forEach((item, index) => {
        if (item.pic === file.response.data.tmp_path) {
          this.addform.pics.splice(index, 1)
        }
        console.log(this.addform.pics)
      })
    },
    // 编写请求头
    getheader () {
      let token = localStorage.getItem('token')
      return { Authorization: token }
    },
    // 上传成功是触发
    onsuccess (response, file, fileList) {
      this.addform.pics.push({ pic: response.data.tmp_path })
      console.log(this.addform.pics)
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
