export const state = () => {
  return {
    history: [],
    orderDetail: {
      seat_infos: {}
    },
    allPrice: 0
  };
};
export const mutations = {
  //把数据存放在history
  setHistory(state, data) {
    //把数据添加到前面
    state.history.unshift(data);
    //数据截取到5条
    if(state.history.length>5){
        state.history.length = 5;
    }
   
  },
  // infoData 机票详细信息存放
  setOrderDetail(state, data) {
    state.orderDetail = data;
  },
  // 机票订单左侧价格
  setAllPrice(state, data) {
    state.allPrice = data;
  }
};
