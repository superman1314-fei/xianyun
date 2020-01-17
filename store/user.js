// state存放数据
// 第一种写法 只能返回对象
// export const state = ({
//   userlnfo: {}
// });
// 第二种写法
// return可以返回对个
export const state =()=>{
    return{
        userlnfo:{}
    } 
};
// 给state赋值
export const mutations = {
  setUserlnfo(state, data) {
    state.userlnfo = data;
  }
};
