<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in form.users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div v-for="(item,index) in infoData" :key="index">
        <div class="insurance-item">
          <el-checkbox
            :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`"
            border
            @change="handelInsurance(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="form.contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="form.captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        //用户列表
        users: [
          {
            username: "",
            id: ""
          }
        ],
        insurances: [], //保险id
        contactName: "", //联系人名字
        contactPhone: "", //联系人电话
        captcha: "", //手机验证码
        invoice: false, //是否需要发票
        seat_xid: this.$route.query.seat_xid, //座位id
        air: this.$route.query.id //航班id
      },
      //   机票的详细信息
      infoData: {}
    };
  },
  mounted() {
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: "/airs/" + id,
      params: id
    }).then(res => {
    
      
      this.infoData = res.data.insurances;
        console.log(this.infoData);
    });

  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.form.users.push({
        username: "",
        id: ""
      });
    },
    //保险数据
    handelInsurance(id) {
      //判断是否有id
      const index = this.form.insurances.indexOf(id);
      //如果有id 就是取消状态
      if (index > -1) {
        this.form.insurances.splice(index, 1);
      } else {
        //没有就是新增的
        this.form.insurances.push(id);
      }
    },
    // 移除乘机人
    handleDeleteUser(index) {
      this.form.users.splice(index, 1);
    },

    // 发送手机验证码
    handleSendCaptcha() {
      if (!this.form.contactPhone) {
        this.$message.error("手机号不能为空");
        return;
      }
      this.$store
        .dispatch("user/sendCaptcha", this.form.contactPhone)
        .then(res => {
          this.$message.success("验证码发送成功：000000");
        });
    },

    // 提交订单
    handleSubmit() {
      const rules = {
        //校验用户
        users: {
          errMessage: "乘机人信息不能为空",
          //校验函数如果是ture 验证通过，是flase就失败

          validator: () => {
            let valid = true;
            this.form.users.forEach(v => {
              if (!v.username || !v.id) {
                valid = false;
              }
            });
            return valid;
          }
        },
        //校验联系人
        contactName: {
          errMessage: "联系人不能为空",
          validator: () => {
            //转化布尔值
            return !!this.form.contactName;
            //  return Boolean(this.form.contactName)
          }
        },
        //校验手机号
        contactPhone: {
          errMessage: "手机号不能为空",
          validator: () => {
            //转化布尔值
            return !!this.form.contactPhone;
          }
        },
        // 校验验证码
        captcha: {
          errMessage: "验证码不能为空",
          validator: () => {
            //转化布尔值
            return !!this.form.captcha;
          }
        }
      };
      //循环rules对象调用validator  Object.keys()会返回一个数组
      let valid = true;
      Object.keys(rules).forEach(v => {
        if (!valid) return;
        const item = rules[v];
        valid = item.validator();
        if (!valid) {
          this.$message.error(item.errMessage);
        }
      });
      if (!valid) return;
      //调用提交接口
    this.$axios({
        url:'/airorders',
        method:"POST",
        data:this.form,
        headers:{
            // 这个需要加上`Bearer`字符串里面要一个空格
            Authorization: `Bearer `+this.$store.state.user.userlnfo.token
        }
    }).then(res=>{
        console.log(res);
        
    })
      console.log(this.form);
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>