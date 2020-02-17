<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{orderDetail.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode"; //二维码
export default {
  data() {
    return {
      orderDetail: {},
      timer:''
    };
  },
  mounted() {
    setTimeout(() => {
      this.$axios({
        url: "airorders/" + this.$route.query.id,

        headers: {
          // 这个需要加上`Bearer`字符串里面要一个空格
          Authorization: `Bearer ` + this.$store.state.user.userlnfo.token
        }
      }).then(res => {
        this.orderDetail = res.data;
        const { code_url } = this.orderDetail.payInfo;
        const canvas = document.getElementById("qrcode-stage");
        QRCode.toCanvas(canvas, code_url, {
          width: 200
        });
        this.timer=setInterval(() => {
              this.isPay();
        }, 3000);
      
        console.log(res);
      });
    }, 0);
  },
  destroyed(){
    clearInterval(this.timer)
  },
  methods: {
    isPay() {
      const { id, price, orderNo } = this.orderDetail;
      this.$axios({
        url: "/airorders/checkpay",
        method: "POST",
        data: {
          id,
          nonce_str: price,
          out_trade_no: orderNo
        },
        headers: {
          // 这个需要加上`Bearer`字符串里面要一个空格
          Authorization: `Bearer ` + this.$store.state.user.userlnfo.token
        }
      }).then(res => {
        if (res.data.statusTxt === "支付完成") {
            //停止计时器
            clearInterval(this.timer)
          this.$alert("支付成功，感谢0.01巨款", "提示", {
            confirmButtonText: "确定",
            type: "success"
          });
        }
        console.log(res);
      });
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>