<template>
  <div class="Strategy">
    <el-row class="strategy-item">
      <div class="menus-ul">
        <div class="menus-body">
          <div
            class="menu-item"
            @mouseover="mouseOver(index)"
            @mouseleave="mouseLeave"
            v-for="(item,index) in mytype"
            :key="index"
            :class="{active :current===index} "
          >
            <span>{{item.type}}</span>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <div v-for="(item,index) in mytype" :key="index">
         
            <ul>
              <li>{{item.city}}{{item.desc}}</li>
            </ul>
          
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // active: "",
      itme_show: false,
      mytype: "", //主题
      children: [], //城市列表
      current: ""
    };
  },
  methods: {
    mouseOver(index) {
      this.current = index;
      // this.active = "color: #ffa500";
      this.itme_show = true;
    },
    mouseLeave() {
      this.active = "";
      this.itme_show = false;
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      // console.log(res);
      this.mytype = res.data.data;
      console.log(this.mytype);
    });
  }
};
</script>

<style lang='less' scoped>
.strategy-item {
  width: 1000px;
  margin: 0 auto;
  .menus-ul {
    display: flex;
  }
  .menus-body {
    margin: 20px 0px;
    width: 250px;

    border: 1px solid #ccc;
    .menu-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      // height: 40px;
      border-bottom: 1px solid #ccc;
      line-height: 40px;
      padding-left: 20px;
      i {
        font-size: 20px;
        color: #ccc;
        margin-right: 20px;
      }
      &:last-child {
        border-bottom: none;
      }
    }
  }
}
.active {
  color: #ffa500 !important;
}
</style>