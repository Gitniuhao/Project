<!-- 顶层组件 -->
<!-- 模板 -->
<template>
  <div id="App">
    <!-- 出口 -->
    <router-view></router-view>
    <TabBar />
  </div>
</template>
<!-- 逻辑 -->
<script>
  import TabBar from './components/tab-bar'
  export default{
    name:'App',
    components:{
      TabBar
    }
  }
</script>
<!-- 样式 -->
<style lang="less">
  #App{
    p{
      color:#ff6700;
      .rem(padding,10)
    }
  }
</style>
