<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <div class="main">
                <OrderForm/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                     <OrderAside :data="$store.state.air.orderDetail
                     "/>     
            </div>
        </el-row>
    </div>
</template>

<script>
import OrderForm from '../../components/air/orderForm'
import OrderAside from '../../components/air/orderAside'//左侧
export default {
    components: {
        OrderForm,OrderAside
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>