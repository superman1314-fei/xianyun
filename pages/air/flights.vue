<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
                <!-- 航班头部布局 -->
             
                    <FlightsListHead/>
               
                
                
                <!-- 航班信息 -->
                <FlightsItem v-for="(item,index) in dataList" :key="index" :data='item'/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>

import moment from "moment";
import FlightsListHead from '../../components/air/flightsListHead' //头部
import FlightsItem from '../../components/air/flightsItem' //列表
export default {
    data(){
        return {
            //航班信息 （info,flights,options,total）
            flightsData:{}, 
            dataList:[]
        }
    },
    components:{
        FlightsListHead,FlightsItem
    },
    mounted(){
        this.$axios({
            url:'/airs',
            params:this.$route.query
        }).then(res=>{
            console.log(res);
          this.flightsData=res.data
          this.dataList=res.data.flights
         
           
            
        })
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>