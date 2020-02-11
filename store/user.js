// state存放数据
// 第一种写法 只能返回对象
// export const state = ({
//   userlnfo: {}
// });
// 第二种写法
// return可以返回对个
export const state = () => {
  return {
    userlnfo: { user: "" }
  };
};
// 给state赋值
export const mutations = {
  setUserlnfo(state, data) {
    state.userlnfo = data;
  }
};

export const actions = {
  //登录
  login(store, data) {
    return this.$axios({
      method: "POST",
      url: "/accounts/login",
      data
    }).then(res => {
      const { data } = res;
      // console.log(res);

      store.commit("setUserlnfo", data);
    });
  },
  //手机号验证码api
  sendCaptcha(store, data) {
    return this.$axios({
      url: "/captchas",
      method: "POST",
      data: { tel: data }
    });
  },
  //注册功能
  register(store, data) {
    return this.$axios({
      url: "/accounts/register",
      method: "POST",
      data
    }).then(res => {
      const { data } = res;
      // console.log(res);

      store.commit("setUserlnfo", data);
    });
  },
  //飞机搜索
  planeticket(store, data) {
    return this.$axios({
      url: "/airs/city",
      params: { name: data }
    }).then(res => {
      const { data } = res.data;
      const newData = data.map(v => {
        v.value = v.name.replace("市", "");
        return v;
       
      });
     
      return newData
     
    
    });
  }
};
