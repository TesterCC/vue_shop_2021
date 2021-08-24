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
      <el-aside width="200px">Aside</el-aside>
      <!-- 右侧内容主体 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    logout () {
      // 清空token
      window.sessionStorage.clear()
      // 跳转登录页
      this.$router.push('/login')
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
  background-color: rgba(62,69,83,.9);
}

.el-main {
  background-color: #2e333e;
}
</style>
