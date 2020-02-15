<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->

        <FlightsFilters :data="cacheFlightsData" @getData="getData" />
        <!-- 航班头部布局 -->

        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="total"
        ></el-pagination>-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from "moment";
import FlightsListHead from "../../components/air/flightsListHead"; //头部
import FlightsItem from "../../components/air/flightsItem"; //列表
import FlightsFilters from "../../components/air/flightsFilters"; //过滤

import FlightsAside from "../../components/air/flightsAside"; //过滤
export default {
  data() {
    return {
      //航班信息 （info,flights,options,total）
      flightsData: {
        info: {},
        options: {},
        flights: []
      },
      //备份
      cacheFlightsData: {
        info: {},
        options: {},
        flights: []
      },
      pageIndex: 1, //当前的页数
      pageSize: 5, //当前的页码
      total: 0 //页数
    };
  },

  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
    beforeRouteUpdate(to, from, next) {
        console.log(this.$route);
         next();
       this.pageIndex = 1; 
     this.routeData()
     
  },
  // watch:{
  //   $route(){
  //     this.pageIndex = 1; 
  //      this.routeData()
  //   }
  // },
  mounted() {
    this.routeData()
  },
  computed: {
    dataList() {
      if (!this.flightsData.flights) {
        return [];
      }
      const arr = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      );
      return arr;
    }
  },
  methods: {
    //封装方法
    routeData() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res);
        this.flightsData = res.data;
        //   this.total = res.data.total;
        this.total = this.flightsData.total;
        this.cacheFlightsData = { ...res.data };
      });
    },
    //每页有多少条
    handleSizeChange(index) {
      this.pageSize = index;
    },
    //当前是哪一页
    handleCurrentChange(index) {
      this.pageIndex = index;
    },
    getData(arr) {
      this.flightsData.flights = arr;
      this.total = arr.length;
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>