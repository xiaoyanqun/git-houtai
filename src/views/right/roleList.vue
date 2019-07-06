<template>
  <div class="roleList">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" style=" line-height:45px;">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button @click="showaddrole = true" type="success">添加角色</el-button>
    <!-- 角色列表 -->
    <el-table :data="roleList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row
            v-for="value in props.row.children"
            :key="value.id"
            style="margin-bottom:10px;border-bottom:1px #ccc dashed"
          >
            <el-col :span="3">
              <div class="grid-content bg-purple">
                <el-tag closable @close="delroles(props.row,value.id)">{{value.authName}}</el-tag>
              </div>
            </el-col>
            <el-col :span="21">
              <div class="grid-content bg-purple">
                <el-row
                  v-for="value1 in value.children"
                  :key="value1.id"
                  style="margin-bottom:10px"
                >
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                      <el-tag
                        closable
                        type="success"
                        @close="delroles(props.row,value1.id)"
                      >{{value1.authName}}</el-tag>
                    </div>
                  </el-col>
                  <el-col :span="20">
                    <div class="grid-content bg-purple">
                      <el-tag
                        @close="delroles(props.row,value2.id)"
                        style="margin-right:5px"
                        v-for="value2 in value1.children"
                        :key="value2.id"
                        closable
                        type="warning"
                      >{{value2.authName}}</el-tag>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row v-if="props.row.children.length == 0">没有权限请添加</el-row>
        </template>
      </el-table-column>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button @click="showedit(scope.row)" type="primary" plain icon="el-icon-edit"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="权限管理" placement="top">
            <el-button @click="showroles(scope.row)" type="success " plain icon="el-icon-share"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button @click="delrolesbyid(scope.row.id)" type="danger" plain icon="el-icon-delete"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 权限管理弹框 -->
    <el-dialog title="授权角色" :visible.sync="roledialogVisible" width="30%">
      <el-tree
        ref="mytree"
        :data="rightList"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="checkedArr"
        :props="defaultProps"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roledialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="giveroles">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加角色弹框 -->
    <el-dialog title="添加角色" :visible.sync="showaddrole">
      <el-form :label-width="'80px'" :rules="rules" :model="addrolesobj" ref="addrolesfrom">
        <el-form-item label="角色名称" prop="roleName" >
          <el-input v-model="addrolesobj.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input @keyup.13.native="addroles" v-model="addrolesobj.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showaddrole = false">取 消</el-button>
        <el-button type="primary" @click = "addroles"> 确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色 -->
      <el-dialog title="编辑角色" :visible.sync="showeditrole">
      <el-form :label-width="'80px'" :rules="rules" :model="editrolesobj" ref="editrolesfrom">
        <el-form-item label="角色名称" prop="roleName" >
          <el-input v-model="editrolesobj.roleName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input @keyup.13.native="editroles" v-model="editrolesobj.roleDesc" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showeditrole = false">取 消</el-button>
        <el-button type="primary" @click = "editroles"> 确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  allocateroles,
  delRoles,
  rolesList,
  giveRoles,
  addRoles,
  delRolesById,
  editRolesById
} from '@/api/roles-api.js'
export default {
  data () {
    return {
      rules: {
        roleName: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
        roleDesc: [{ required: true, message: '请输入角色描述', trigger: 'blur' }]
      },
      showaddrole: false,
      showeditrole: false,
      // 默认选中的数组
      checkedArr: [],
      roleList: [],
      rightList: [],
      // 编辑角色数据
      editrolesobj: {
        id: '',
        roleName: '',
        roleDesc: ''
      },
      // 添加角色数据
      addrolesobj: {
        roleName: '',
        roleDesc: ''
      },
      roledialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      // 储存角色id
      rid: ''
    }
  },
  methods: {
    // 显示编辑弹框数据
    showedit (row) {
      console.log(row)
      this.editrolesobj.roleName = row.roleName
      this.editrolesobj.roleDesc = row.roleDesc
      this.editrolesobj.id = row.id
      this.showeditrole = true
    },
    //  提交编辑请求
    editroles () {
      this.$refs.editrolesfrom.validate(valid => {
        if (valid) {
          editRolesById(this.editrolesobj)
            .then(res => {
              if (res.data.meta.status === 200) {
                console.log(res.data.meta.status)
                this.$message.success(res.data.meta.msg)
                this.init()
                this.showeditrole = false
              } else {
                this.$message.error(res.data.meta.msg)
              }
            }).catch(err => {
              console.log(err)
            })
        }
      })
    },
    // 删除角色
    delrolesbyid (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRolesById(id)
          .then(res => {
            if (res.data.meta.status === 200) {
              this.$message({
                type: 'success',
                message: res.data.meta.msg
              })
              this.init()
            } else {
              this.$message({
                type: 'error',
                message: res.data.meta.msg
              })
            }
          }).catch(err => {
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 添加角色
    addroles () {
      this.$refs.addrolesfrom.validate(valid => {
        if (valid) {
          addRoles(this.addrolesobj)
            .then(res => {
              console.log(res)
              if (res.data.meta.status === 201) {
                this.$message.success(res.data.meta.msg)
                this.showaddrole = false
                this.init()
                this.addrolesobj.roleName = ''
                this.addrolesobj.roleDesc = ''
              } else {
                this.$message.error(res.data.meta.msg)
              }
            }).catch(err => {
              console.log(err)
            })
        }
      })
    },
    // 用户授权
    giveroles () {
      console.log(this.$refs.mytree.getCheckedNodes())
      let arr = this.$refs.mytree.getCheckedNodes()
      let arr2 = []
      arr.forEach(val => {
        let temp = val.id + ',' + val.pid
        arr2.push(temp)
      })
      let str = arr2.join(',')
      let strarr = str.split(',')
      let set = new Set(strarr)
      let setarr = [...set]
      let rids = setarr.join(',')
      giveRoles(this.rid, rids)
        .then(res => {
          if (res.data.meta.status === 200) {
            this.$message.success(res.data.meta.msg)
            this.roledialogVisible = false
            this.init()
          } else {
            this.$message.error(res.data.meta.msg)
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    // 删除用户权限
    delroles (row, rid) {
      console.log(row, rid)
      delRoles(row.id, rid).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message.success(res.data.meta.msg)
          row.children = res.data.data
        } else {
          this.$message.error(res.data.meta.msg)
        }
      })
    },
    // 弹出授权窗口
    showroles (row) {
      console.log(row)
      // 储存角色id
      this.rid = row.id
      // 获取所有权限
      rolesList('tree')
        .then(res => {
          if (res.data.meta.status === 200) {
            this.rightList = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
      this.rightList = row.children
      this.roledialogVisible = true
      this.checkedArr = []
      row.children.forEach(value => {
        if (value.children && value.children.length > 0) {
          value.children.forEach(value1 => {
            if (value1.children && value1.children.length > 0) {
              value1.children.forEach(value2 => {
                this.checkedArr.push(value2.id)
              })
            }
          })
        }
      })
    },
    // 加载列表数据方法
    init () {
      allocateroles()
        .then(res => {
          console.log(res)
          if (res.data.meta.status === 200) {
            this.roleList = res.data.data
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang='less' scoped>
</style>
