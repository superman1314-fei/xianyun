<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          placeholder="请搜索出发城市"
          @select="handleDepartSelect"
          class="el-autocomplete"
          v-model="from.departCity"
          @blur="handleDepartBlur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
          @blur="handleDestBlur"
          v-model="from.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          type="date"
          placeholder="请选择日期"
          style="width: 100%;"
          @change="handleDate"
          v-model="from.departDate"
           :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import moment from "moment"; //时间格式
export default {
  data() {
    return {
      
      from: {
        departCity: "", //出发城市
        departCode: "", //出发城市的英文缩写
        destCity: "", //到达的城市
        destCode: "", //到达的城市英文缩写
        departDate: "" //日期
      },
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      currentTab: 0,
      departData: [],
      destData: [],
          pickerOptions: {
          disabledDate(time) {
            return time.getTime()+3600 * 1000 * 24 < Date.now();
          },
          }
    };
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      if (index == 1) {
        this.$alert("目前暂不支持往返", "提醒", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      if (!value) {
        // 如果value是空 就把原来的城市列表清空
        this.departData = [];
        // 调用cb传入空数组，这样下拉就不会出来了
        cb([]);
        return;
      }

      ///
      this.$store.dispatch("user/planeticket", value).then(newData => {
        this.departData = newData;
        cb(newData);
      });
      //   console.log(value);
    },
    //出发城市失焦默认第一个
    
    handleDepartBlur() {
      if (this.departData.length === 0) {
        return;
      }
      this.from.departCity = this.departData[0].value;
      this.from.departCode = this.departData[0].sort;
    },
    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      if (!value) {
        // 如果value是空 就把原来的城市列表清空
        this.destData = [];
        // 调用cb传入空数组，这样下拉就不会出来了
        cb([]);
        return;
      }
      this.$store.dispatch("user/planeticket", value).then(newData => {
        this.destData = newData;
        cb(newData);
      });
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.from.departCity = item.value;
      this.from.departCode = item.sort;
      //    console.log(item);
    },
    //到达城市如果没有值失焦默认第一个
    handleDestBlur() {
      if (this.destData.length === 0) {
        return;
      }
      this.from.destCity = this.destData[0].value;
      this.from.destCode = this.destData[0].sort;
    },
    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.from.destCity = item.value;
      this.from.destCode = item.sort;
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.from.departDate = moment(value).format("YYYY-MM-DD");
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.from;
      this.from.departCity = destCity;
      this.from.departCode = destCode;
      this.from.destCity = departCity;
      this.from.destCode = departCode;
    },

    // 提交表单是触发
    handleSubmit() {
      console.log(this.from);
      if (!this.from.departCity) {
        this.$message.error("请输入出发城市");
        return;
      }
      if (!this.from.destCity) {
        this.$message.error("请输入到达城市");
        return;
      }
      if (!this.from.departDate) {
        this.$message.error("请输入日期");
        return;
      }
      this.$store.commit('air/setHistory',this.from)
      this.$router.push({
        path: "/air/flights",
        query: this.from
      });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>