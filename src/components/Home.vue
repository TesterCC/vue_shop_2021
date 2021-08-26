<template>
  <!-- 头部区域 -->
  <el-container class="home-container">
    <el-header>
      <div>
        <img src="../assets/blogo.png" alt="">
        <span>渗透测试后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px' ">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区 -->
        <el-menu
          background-color="#2e333e"
          text-color="#fff"
          active-text-color="#24aeff"
          unique-opened :collapse="isCollapse" :collapse-transition="false">
          <!-- 一级菜单区 -->
          <el-submenu :index="item.id + '' " v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 一级菜单图标动态绑定 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
             <el-menu-item :index="subItem.id + ''" v-for="subItem in item.children" :key="subItem.id" >
              <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>{{ subItem.authName }}</span>
            </template>
             </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>

export default {
  data () {
    return {
      // 左侧菜单数据
      menulist: [],
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao'
      },
      // 侧边栏是否折叠
      isCollapse: false
    }
  },
  // 定义生命周期函数
  created () {
    this.getMenuList()
  },
  methods: {
    logout () {
      // 清空token
      window.sessionStorage.clear()
      // 跳转登录页
      this.$router.push('/login')
    },
    async getMenuList () {
      // 解构赋值
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menulist = res.data
      // console.log(res) // 获取到的菜单栏数据要立即挂载到自己的data中
      console.log(this.menulist)
    },
    // 点击按钮，切换左侧菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #050f1f;
  display: flex;
  justify-content: space-between;  // justify-content 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式。 space-between 项目位于各行之间留有空白的容器内。
  padding-left: 0;
  align-items: center;  // 居中对齐弹性盒的各项
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  // background-color: #2e333e; //active
  background-color: #2e333e;
}

.el-main {
  background-color: rgba(62,69,83,.9);
}

// 取消默认组件border-right效果
.el-menu {
  border-right: None;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
