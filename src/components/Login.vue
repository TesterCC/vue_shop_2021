<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <!-- 登录表单区域  获取到 ref的值 loginFormRef 就是我们要获取的表单的实例对象 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
        <!-- username -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- password -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="密码" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          { min: 6, max: 15, message: '输入不合规则', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    resetLoginForm () {
      // console.log(this) // 打印当前组件的实例对象
      this.$refs.loginFormRef.resetFields()
    },
    login () {
      // 返回为promise对象可以改造为异步请求
      this.$refs.loginFormRef.validate(async valid => {
        // console.log(valid) // True or False
        if (!valid) return
        // data 才是服务器返回的属性，解构复制为res
        const { data: res } = await this.$http.post('login', this.loginForm)
        // console.log(res)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // 1. 将登录成功之后的token，保存到客户端的sessionStorage中
        // 1.1 项目中除了登录之外的其它API接口，必须在登录之后才能访问
        // 1.2 token只应在当前网站打开期间生效，所以将token保存在sessionStorage中
        window.sessionStorage.setItem('token', res.data.token)
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
        // console.log(res)
      })
    }
  }
}
</script>

<!-- 支持less语法，scoped 表示样式只在当前组件内生效（单文件组件推荐使用，方式组件间的样式冲突），不用的话表示全局生效 -->
<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}

// 通过类名选择器加样式
.login_box{
  width:450px;
  height: 300px;
  background-color: #FFF;
  border-radius: 3px;
  position: absolute;  // 这样设置后才方便做位移
  left:50%;
  top:50%;   // 是以左上角为原点，故不处于中心位置
  transform: translate(-50%,-50%);  // CSS3特性，在不知道自身宽高的情况下，可以利用它来进行水平垂直居中 //  translate(-50%,-50%) 作用是，往上（x轴）,左（y轴）移动自身长宽的 50%，以使其居于中心位置。
}

.avatar_box{
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #FFF;
  img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.btns{
  display: flex; // 变为弹性盒模型
  justify-content: flex-end; // 尾部对齐
}

.login_form{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;  // box-sizing 属性允许您以特定的方式定义匹配某个区域的特定元素。默认 content-box，假如您需要并排放置两个带边框的框，可通过将 box-sizing 设置为 "border-box"。这可令浏览器呈现出带有指定宽度和高度的框，并把边框和内边距放入框中。 https://www.w3school.com.cn/cssref/pr_box-sizing.asp
}
</style>
