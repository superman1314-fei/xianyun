<template>
    <div>
    <!-- 相当于 router-view -->
    <!-- 头部 -->
    <Header/>


    <nuxt />
        <!-- 页脚 -->
        <Footer/>
  </div>
</template>

<script>
import Header from '@/components/header'
import Footer from '@/components/footer'

export default {
  components:{
    Header,Footer
  }
}
</script>

<style lang='less'>
@import url('../assets/reset.css');

</style>